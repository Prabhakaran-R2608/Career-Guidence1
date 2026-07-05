import { Server as HttpServer } from 'http';
import { WebSocketServer, WebSocket } from 'ws';
import { db } from './db';
import { Task } from '../src/types';

interface ClientConnection {
  ws: WebSocket;
  userId: string;
  userName: string;
  roomId: string;
  cursor: { x: number; y: number } | null;
}

const activeClients = new Map<WebSocket, ClientConnection>();

export function setupWebSockets(server: HttpServer) {
  const wss = new WebSocketServer({ noServer: true });

  // Handle upgrade manually
  server.on('upgrade', (request, socket, head) => {
    // If we want to support both Vite HMR and our WebSocket server:
    // Our client connects to `/ws/collaboration` or similar.
    const pathname = new URL(request.url || '', `http://${request.headers.host}`).pathname;
    
    if (pathname === '/ws/collaboration') {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit('connection', ws, request);
      });
    }
  });

  wss.on('connection', (ws) => {
    console.log('Client connected to Collaboration WS');

    ws.on('message', (messageBuffer) => {
      try {
        const messageString = messageBuffer.toString();
        const payload = JSON.parse(messageString);
        const { type, data } = payload;

        switch (type) {
          case 'join_room': {
            const { userId, userName, roomId } = data;
            activeClients.set(ws, {
              ws,
              userId,
              userName,
              roomId,
              cursor: null
            });

            // Broadcast join event and current presence list to room
            broadcastToRoom(roomId, 'presence_sync', getRoomPresence(roomId));
            // Send existing tasks to the joining client
            const roomTasks = db.tasks.filter(t => t.roomId === roomId);
            ws.send(JSON.stringify({ type: 'tasks_sync', data: roomTasks }));
            break;
          }

          case 'cursor_move': {
            const client = activeClients.get(ws);
            if (client) {
              client.cursor = { x: data.x, y: data.y };
              broadcastToRoom(client.roomId, 'presence_sync', getRoomPresence(client.roomId));
            }
            break;
          }

          case 'task_create': {
            const client = activeClients.get(ws);
            if (client) {
              const newTask: Task = {
                id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                title: data.title || 'Untitled Task',
                description: data.description || '',
                status: data.status || 'todo',
                priority: data.priority || 'medium',
                assignee: data.assignee || client.userName,
                dueDate: data.dueDate || new Date().toISOString().split('T')[0],
                category: data.category || 'General',
                roomId: client.roomId
              };

              db.tasks.push(newTask);
              db.save();

              broadcastToRoom(client.roomId, 'task_created', newTask);
            }
            break;
          }

          case 'task_update': {
            const client = activeClients.get(ws);
            if (client) {
              const taskIndex = db.tasks.findIndex(t => t.id === data.id);
              if (taskIndex !== -1) {
                db.tasks[taskIndex] = {
                  ...db.tasks[taskIndex],
                  ...data
                };
                db.save();
                broadcastToRoom(client.roomId, 'task_updated', db.tasks[taskIndex]);
              }
            }
            break;
          }

          case 'task_delete': {
            const client = activeClients.get(ws);
            if (client) {
              const taskIndex = db.tasks.findIndex(t => t.id === data.id);
              if (taskIndex !== -1) {
                db.tasks.splice(taskIndex, 1);
                db.save();
                broadcastToRoom(client.roomId, 'task_deleted', { id: data.id });
              }
            }
            break;
          }

          case 'workspace_chat': {
            const client = activeClients.get(ws);
            if (client) {
              const chatMsg = {
                id: `chat-${Date.now()}`,
                userId: client.userId,
                senderName: client.userName,
                message: data.message,
                timestamp: new Date().toLocaleTimeString()
              };
              broadcastToRoom(client.roomId, 'chat_received', chatMsg);
            }
            break;
          }
        }
      } catch (err) {
        console.error('Error handling WS message:', err);
      }
    });

    ws.on('close', () => {
      const client = activeClients.get(ws);
      if (client) {
        const { roomId } = client;
        activeClients.delete(ws);
        broadcastToRoom(roomId, 'presence_sync', getRoomPresence(roomId));
      }
      console.log('Client disconnected from Collaboration WS');
    });
  });
}

function getRoomPresence(roomId: string) {
  const presence: { userId: string; userName: string; cursor: { x: number; y: number } | null }[] = [];
  for (const client of activeClients.values()) {
    if (client.roomId === roomId) {
      presence.push({
        userId: client.userId,
        userName: client.userName,
        cursor: client.cursor
      });
    }
  }
  return presence;
}

function broadcastToRoom(roomId: string, type: string, data: any) {
  const msg = JSON.stringify({ type, data });
  for (const client of activeClients.values()) {
    if (client.roomId === roomId && client.ws.readyState === WebSocket.OPEN) {
      client.ws.send(msg);
    }
  }
}
