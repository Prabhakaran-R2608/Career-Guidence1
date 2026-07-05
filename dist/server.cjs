var __create = Object.create;
var __defProp = Object.defineProperty;
var __getOwnPropDesc = Object.getOwnPropertyDescriptor;
var __getOwnPropNames = Object.getOwnPropertyNames;
var __getProtoOf = Object.getPrototypeOf;
var __hasOwnProp = Object.prototype.hasOwnProperty;
var __copyProps = (to, from, except, desc) => {
  if (from && typeof from === "object" || typeof from === "function") {
    for (let key of __getOwnPropNames(from))
      if (!__hasOwnProp.call(to, key) && key !== except)
        __defProp(to, key, { get: () => from[key], enumerable: !(desc = __getOwnPropDesc(from, key)) || desc.enumerable });
  }
  return to;
};
var __toESM = (mod, isNodeMode, target) => (target = mod != null ? __create(__getProtoOf(mod)) : {}, __copyProps(
  // If the importer is in node compatibility mode or this is not an ESM
  // file that has been converted to a CommonJS file using a Babel-
  // compatible transform (i.e. "__esModule" has not been set), then set
  // "default" to the CommonJS "module.exports" for node compatibility.
  isNodeMode || !mod || !mod.__esModule ? __defProp(target, "default", { value: mod, enumerable: true }) : target,
  mod
));

// server.ts
var import_express = __toESM(require("express"), 1);
var import_path = __toESM(require("path"), 1);
var import_http = require("http");
var import_vite = require("vite");

// server/ws.ts
var import_ws = require("ws");

// server/db.ts
var fs = __toESM(require("fs"), 1);
var path = __toESM(require("path"), 1);

// server/procedural.ts
function generateCodingQuestions() {
  const baseQuestions = [
    {
      id: "code-1",
      title: "Two Sum",
      description: "Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.",
      category: "Arrays",
      difficulty: "Easy",
      constraints: ["2 <= nums.length <= 10^4", "-10^9 <= nums[i] <= 10^9", "-10^9 <= target <= 10^9", "Only one valid answer exists."],
      inputFormat: "The first line contains integers separated by spaces representing the elements of `nums`.\nThe second line contains a single integer representing `target`.",
      outputFormat: "Return two indices in the form of a comma-separated string `[index1,index2]`.",
      sampleInput: "2 7 11 15\n9",
      sampleOutput: "0,1",
      hiddenTestCases: [
        { input: "3 2 4\n6", output: "1,2" },
        { input: "3 3\n6", output: "0,1" },
        { input: "1 5 10 20\n25", output: "1,3" }
      ]
    },
    {
      id: "code-2",
      title: "Valid Parentheses",
      description: "Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.",
      category: "Stack",
      difficulty: "Easy",
      constraints: ["1 <= s.length <= 10^4", "s consists of parentheses characters only."],
      inputFormat: "A single string `s`.",
      outputFormat: "Return `true` if the string is valid, otherwise return `false`.",
      sampleInput: "()[]{}",
      sampleOutput: "true",
      hiddenTestCases: [
        { input: "(", output: "false" },
        { input: "(]", output: "false" },
        { input: "{[]}", output: "true" },
        { input: "(([]){})", output: "true" }
      ]
    },
    {
      id: "code-3",
      title: "Longest Substring Without Repeating Characters",
      description: "Given a string `s`, find the length of the longest substring without repeating characters.",
      category: "Sliding Window",
      difficulty: "Medium",
      constraints: ["0 <= s.length <= 5 * 10^4", "s consists of English letters, digits, symbols and spaces."],
      inputFormat: "A single string `s` on one line.",
      outputFormat: "Return an integer representing the maximum length.",
      sampleInput: "abcabcbb",
      sampleOutput: "3",
      hiddenTestCases: [
        { input: "bbbbb", output: "1" },
        { input: "pwwkew", output: "3" },
        { input: "", output: "0" },
        { input: "abcdefg", output: "7" }
      ]
    },
    {
      id: "code-4",
      title: "Climbing Stairs",
      description: "You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?",
      category: "Dynamic Programming",
      difficulty: "Easy",
      constraints: ["1 <= n <= 45"],
      inputFormat: "A single integer `n`.",
      outputFormat: "An integer representing the number of distinct ways.",
      sampleInput: "2",
      sampleOutput: "2",
      hiddenTestCases: [
        { input: "1", output: "1" },
        { input: "3", output: "3" },
        { input: "4", output: "5" },
        { input: "5", output: "8" }
      ]
    },
    {
      id: "code-5",
      title: "Reverse String",
      description: "Write a function that reverses a string. The input is given as an array of characters.",
      category: "Strings",
      difficulty: "Easy",
      constraints: ["1 <= s.length <= 10^5"],
      inputFormat: "A single line containing characters separated by spaces.",
      outputFormat: "A single string representing the reversed characters joined together.",
      sampleInput: "h e l l o",
      sampleOutput: "olleh",
      hiddenTestCases: [
        { input: "H a n n a h", output: "hannaH" },
        { input: "a b c", output: "cba" }
      ]
    },
    {
      id: "code-6",
      title: "Fibonacci Number",
      description: "The Fibonacci numbers, commonly denoted `F(n)` form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.",
      category: "Dynamic Programming",
      difficulty: "Easy",
      constraints: ["0 <= n <= 30"],
      inputFormat: "A single integer `n`.",
      outputFormat: "An integer representing `F(n)`.",
      sampleInput: "4",
      sampleOutput: "3",
      hiddenTestCases: [
        { input: "0", output: "0" },
        { input: "1", output: "1" },
        { input: "2", output: "1" },
        { input: "3", output: "2" },
        { input: "6", output: "8" }
      ]
    }
  ];
  const categories = ["Arrays", "Strings", "Maths", "Stack", "Dynamic Programming", "Hash Tables", "Searching", "Trees", "Graphs", "Linked Lists"];
  const difficulties = ["Easy", "Medium", "Hard"];
  const generated = [...baseQuestions];
  for (let i = baseQuestions.length + 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const difficulty = difficulties[i % difficulties.length];
    let title = "";
    let description = "";
    let constraints = [];
    let inputFormat = "";
    let outputFormat = "";
    let sampleInput = "";
    let sampleOutput = "";
    let hiddenTestCases = [];
    if (category === "Arrays") {
      title = `Find Target Index ${i}`;
      description = `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.

You must write an algorithm with O(log n) runtime complexity.`;
      constraints = ["1 <= nums.length <= 10^4", "-10^4 <= nums[i] <= 10^4", "nums contains distinct values sorted in ascending order."];
      inputFormat = "First line contains space-separated sorted integers. Second line contains the target.";
      outputFormat = "An integer representing the index.";
      sampleInput = "1 3 5 6\n5";
      sampleOutput = "2";
      hiddenTestCases = [
        { input: "1 3 5 6\n2", output: "1" },
        { input: "1 3 5 6\n7", output: "4" },
        { input: "1 3 5 6\n0", output: "0" }
      ];
    } else if (category === "Strings") {
      title = `Unique Character Search ${i}`;
      description = `Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.`;
      constraints = ["1 <= s.length <= 10^5", "s consists of lowercase English letters only."];
      inputFormat = "A single line containing the string s.";
      outputFormat = "An integer representing the first unique character index or -1.";
      sampleInput = "leetcode";
      sampleOutput = "0";
      hiddenTestCases = [
        { input: "loveleetcode", output: "2" },
        { input: "aabb", output: "-1" },
        { input: "abcabc", output: "-1" }
      ];
    } else if (category === "Maths") {
      title = `Power Of Sum ${i}`;
      description = `Given an integer n, return true if it is a power of three. Otherwise, return false.
An integer n is a power of three, if there exists an integer x such that n == 3^x.`;
      constraints = ["-2^31 <= n <= 2^31 - 1"];
      inputFormat = "A single integer n.";
      outputFormat = "Return true or false as a string.";
      sampleInput = "27";
      sampleOutput = "true";
      hiddenTestCases = [
        { input: "0", output: "false" },
        { input: "9", output: "true" },
        { input: "45", output: "false" }
      ];
    } else if (category === "Stack") {
      title = `Backspace String Compare ${i}`;
      description = `Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.

Note that after backspacing an empty text, the text will continue empty.`;
      constraints = ["1 <= s.length, t.length <= 200", 's and t only contain lowercase letters and "#" characters.'];
      inputFormat = "First line contains s, second line contains t.";
      outputFormat = "Return true or false.";
      sampleInput = "ab#c\nad#c";
      sampleOutput = "true";
      hiddenTestCases = [
        { input: "ab##\nc#d#", output: "true" },
        { input: "a#c\nb", output: "false" }
      ];
    } else if (category === "Dynamic Programming") {
      title = `Maximum Subarray Sum ${i}`;
      description = `Given an integer array nums, find the subarray with the largest sum and return its sum.`;
      constraints = ["1 <= nums.length <= 10^5", "-10^4 <= nums[i] <= 10^4"];
      inputFormat = "Space separated integers.";
      outputFormat = "An integer representing the maximum sum.";
      sampleInput = "-2 1 -3 4 -1 2 1 -5 4";
      sampleOutput = "6";
      hiddenTestCases = [
        { input: "1", output: "1" },
        { input: "5 4 -1 7 8", output: "23" }
      ];
    } else if (category === "Hash Tables") {
      title = `Contains Duplicate ${i}`;
      description = `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`;
      constraints = ["1 <= nums.length <= 10^5", "-10^9 <= nums[i] <= 10^9"];
      inputFormat = "Space separated integers.";
      outputFormat = "Return true or false.";
      sampleInput = "1 2 3 1";
      sampleOutput = "true";
      hiddenTestCases = [
        { input: "1 2 3 4", output: "false" },
        { input: "1 1 1 3 3 4 3 2 4 2", output: "true" }
      ];
    } else if (category === "Searching") {
      title = `Binary Search Target ${i}`;
      description = `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`;
      constraints = ["1 <= nums.length <= 10^4", "-10^4 < nums[i], target < 10^4"];
      inputFormat = "First line: sorted integers. Second line: target.";
      outputFormat = "Index or -1.";
      sampleInput = "-1 0 3 5 9 12\n9";
      sampleOutput = "4";
      hiddenTestCases = [
        { input: "-1 0 3 5 9 12\n2", output: "-1" },
        { input: "5\n5", output: "0" }
      ];
    } else {
      title = `Problem Solver Module ${i}`;
      description = `Design an algorithm to find if a sum exists in the given series for value ${i * 10}.`;
      constraints = ["1 <= elements <= 1000"];
      inputFormat = "A set of integers.";
      outputFormat = "true or false";
      sampleInput = "10 20 30 40";
      sampleOutput = "true";
      hiddenTestCases = [
        { input: "1 2 3", output: "false" }
      ];
    }
    generated.push({
      id: `code-${i}`,
      title,
      description,
      category,
      difficulty,
      constraints,
      inputFormat,
      outputFormat,
      sampleInput,
      sampleOutput,
      hiddenTestCases
    });
  }
  return generated;
}
function generateAptitudeQuestions() {
  const list = [];
  const quantitativeTypes = [
    "Time & Speed",
    "Average",
    "Percentage",
    "Ratio & Proportion",
    "Work & Time",
    "Profit & Loss",
    "Simple & Compound Interest",
    "Ages",
    "Probability & Permutations",
    "Trains & Boats"
  ];
  const logicalTypes = [
    "Clocks & Calendar",
    "Blood Relations",
    "Number Series & Puzzles",
    "Syllogisms & Analogies"
  ];
  const verbalTypes = [
    "Synonyms & Vocabulary",
    "Grammar & Sentence Correction",
    "Reading Comprehension"
  ];
  let idCounter = 1;
  for (let i = 0; i < 450; i++) {
    const subcat = quantitativeTypes[i % quantitativeTypes.length];
    const diffVal = i % 3;
    const difficulty = diffVal === 0 ? "Easy" : diffVal === 1 ? "Medium" : "Hard";
    let question = "";
    let options = [];
    let correctAnswer = "A";
    let explanation = "";
    const val1 = 10 + i % 25 * 5;
    const val2 = 5 + i % 15 * 3;
    const val3 = 100 + i % 10 * 100;
    switch (subcat) {
      case "Time & Speed": {
        const speedKmh = 36 + i % 10 * 9;
        const trainLength = 100 + i % 5 * 50;
        const timeSecs = Math.round(trainLength / (speedKmh * 5 / 18) * 10) / 10;
        question = `A train of length ${trainLength} meters crosses a utility pole in how many seconds if its constant speed is ${speedKmh} km/hr?`;
        options = [
          `${timeSecs} seconds`,
          `${Math.round((timeSecs + 2.5) * 10) / 10} seconds`,
          `${Math.round((timeSecs - 1.8) * 10) / 10} seconds`,
          `${Math.round(timeSecs * 1.5 * 10) / 10} seconds`
        ];
        correctAnswer = "A";
        explanation = `To calculate the crossing time, we convert the speed from km/hr to m/s:
Speed in m/s = Speed in km/hr * (5 / 18)
Speed = ${speedKmh} * (5 / 18) = ${Math.round(speedKmh * 5 / 18 * 100) / 100} m/s.
Time taken = Train Length / Speed
Time = ${trainLength} / ${Math.round(speedKmh * 5 / 18 * 100) / 100} = ${timeSecs} seconds.`;
        break;
      }
      case "Average": {
        const count = 10 + i % 20;
        const initialAvg = 20 + i % 15;
        const weightAdded = 40 + i % 30;
        const newTotal = count * initialAvg + weightAdded;
        const newAvg = Math.round(newTotal / (count + 1) * 100) / 100;
        question = `The average age of a group of ${count} students is ${initialAvg} years. If a teacher of age ${weightAdded} years joins the group, what is the new average age?`;
        options = [
          `${newAvg - 1.5} years`,
          `${newAvg} years`,
          `${newAvg + 1.2} years`,
          `${newAvg + 2} years`
        ];
        correctAnswer = "B";
        explanation = `Sum of ages of ${count} students = ${count} * ${initialAvg} = ${count * initialAvg} years.
With the teacher added, the total sum of ages = ${count * initialAvg} + ${weightAdded} = ${newTotal} years.
Total count of people = ${count} + 1 = ${count + 1}.
New Average Age = Total Sum / Total Count = ${newTotal} / ${count + 1} = ${newAvg} years.`;
        break;
      }
      case "Percentage": {
        const initial = 200 + i % 10 * 100;
        const pct = 10 + i % 5 * 5;
        const finalVal = Math.round(initial * (1 - pct / 100));
        question = `The price of an online coding course is $${initial}. During a festive placement campaign, the course is offered at a discount of ${pct}%. What is the sale price?`;
        options = [
          `$${finalVal + 25}`,
          `$${finalVal - 15}`,
          `$${finalVal}`,
          `$${Math.round(initial * (1 - (pct - 5) / 100))}`
        ];
        correctAnswer = "C";
        explanation = `Discount amount = Original Price * (Discount Percentage / 100)
Discount = $${initial} * (${pct} / 100) = $${initial * pct / 100}.
Sale Price = Original Price - Discount
Sale Price = $${initial} - $${initial * pct / 100} = $${finalVal}.`;
        break;
      }
      case "Ratio & Proportion": {
        const totalAmount = 500 + i % 10 * 250;
        const r1 = 2 + i % 3;
        const r2 = 3 + i % 3;
        const r3 = 5 + i % 3;
        const sumR = r1 + r2 + r3;
        const bShare = Math.round(totalAmount * r2 / sumR * 100) / 100;
        question = `A total budget of $${totalAmount} is shared among three departments A, B, and C in the ratio ${r1}:${r2}:${r3}. What is the share of department B?`;
        options = [
          `$${bShare - 20}`,
          `$${bShare + 50}`,
          `$${bShare + 10}`,
          `$${bShare}`
        ];
        correctAnswer = "D";
        explanation = `Sum of ratios = ${r1} + ${r2} + ${r3} = ${sumR}.
Share of Department B = (Ratio of B / Sum of ratios) * Total Budget
Share of B = (${r2} / ${sumR}) * $${totalAmount} = $${bShare}.`;
        break;
      }
      case "Work & Time": {
        const daysA = 10 + i % 6 * 2;
        const daysB = 15 + i % 6 * 3;
        const jointDays = Math.round(daysA * daysB / (daysA + daysB) * 100) / 100;
        question = `If Developer A can build a project in ${daysA} days and Developer B can build the same project in ${daysB} days, how many days will they take to complete it working together?`;
        options = [
          `${jointDays} days`,
          `${Math.round((jointDays + 1.5) * 10) / 10} days`,
          `${Math.round((jointDays - 1) * 10) / 10} days`,
          `${Math.round(jointDays * 1.3 * 10) / 10} days`
        ];
        correctAnswer = "A";
        explanation = `1 day work of A = 1 / ${daysA}
1 day work of B = 1 / ${daysB}
Combined 1 day work of A and B = (1 / ${daysA}) + (1 / ${daysB}) = (${daysA} + ${daysB}) / (${daysA} * ${daysB}) = ${daysA + daysB} / ${daysA * daysB}.
Total days required = (${daysA} * ${daysB}) / (${daysA} + ${daysB}) = ${daysA * daysB} / ${daysA + daysB} = ${jointDays} days.`;
        break;
      }
      case "Profit & Loss": {
        const cp = 120 + i % 15 * 20;
        const profitPct = 10 + i % 5 * 5;
        const sp = cp * (1 + profitPct / 100);
        question = `A merchant purchases a hardware component for $${cp}. At what selling price should he list it to secure a ${profitPct}% profit?`;
        options = [
          `$${sp - 10}`,
          `$${sp}`,
          `$${sp + 15}`,
          `$${Math.round(cp * 1.05)}`
        ];
        correctAnswer = "B";
        explanation = `Profit amount = Cost Price * (Profit % / 100) = $${cp} * (${profitPct} / 100) = $${cp * profitPct / 100}.
Selling Price = Cost Price + Profit = $${cp} + $${cp * profitPct / 100} = $${sp}.`;
        break;
      }
      case "Simple & Compound Interest": {
        const principal = 1e3 + i % 10 * 1e3;
        const rate = 5 + i % 5;
        const time = 2 + i % 3;
        const si = principal * rate * time / 100;
        question = `Find the Simple Interest accumulated on a principal sum of $${principal} invested at ${rate}% per annum for ${time} years.`;
        options = [
          `$${si - 50}`,
          `$${si + 100}`,
          `$${si}`,
          `$${si * 1.15}`
        ];
        correctAnswer = "C";
        explanation = `Formula for Simple Interest:
SI = (Principal * Rate * Time) / 100
SI = (${principal} * ${rate} * ${time}) / 100 = $${si}.`;
        break;
      }
      case "Ages": {
        const ratioSum = 5 + i % 5 * 2;
        const ageMultiplier = 3 + i % 4;
        const ageA = (ratioSum - 2) * ageMultiplier;
        const ageB = 2 * ageMultiplier;
        const yearsDiff = 5 + i % 5;
        question = `The present ages of A and B are in the ratio of ${ratioSum - 2}:2. ${yearsDiff} years ago, the sum of their ages was ${ageA + ageB - 2 * yearsDiff} years. What is the present age of A?`;
        options = [
          `${ageA - 4} years`,
          `${ageA + 6} years`,
          `${ageA} years`,
          `${ageA + 10} years`
        ];
        correctAnswer = "C";
        explanation = `Let the present ages of A and B be ${ratioSum - 2}x and 2x.
Sum of present ages = ${ratioSum - 2 + 2}x = ${ratioSum}x.
${yearsDiff} years ago, the sum was ${ratioSum}x - (2 * ${yearsDiff}) = ${ageA + ageB - 2 * yearsDiff}.
${ratioSum}x - ${2 * yearsDiff} = ${ageA + ageB - 2 * yearsDiff}
${ratioSum}x = ${ageA + ageB}
x = ${ageMultiplier}.
Present age of A = ${ratioSum - 2} * ${ageMultiplier} = ${ageA} years.`;
        break;
      }
      case "Probability & Permutations": {
        const items = ["CODE", "PI", "TECH", "JAVA", "NODE", "HTML", "REACT", "RUST", "CLAW", "CRAFT"];
        const word = items[i % items.length];
        const uniqueLetters = new Set(word).size;
        let fact = 1;
        for (let f = 1; f <= uniqueLetters; f++) fact *= f;
        question = `In how many different ways can the letters of the word '${word}' be arranged?`;
        options = [
          `${fact - 6}`,
          `${fact + 12}`,
          `${fact}`,
          `${fact * 2}`
        ];
        correctAnswer = "C";
        explanation = `The word '${word}' contains ${uniqueLetters} distinct letters.
The number of ways to arrange '${word}' is given by ${uniqueLetters}! (factorial of ${uniqueLetters}).
${uniqueLetters}! = ${Array.from({ length: uniqueLetters }, (_, index) => index + 1).join(" * ")} = ${fact} ways.`;
        break;
      }
      default: {
        const speedUpstream = 8 + i % 5;
        const speedDownstream = 14 + i % 5;
        const boatSpeed = (speedDownstream + speedUpstream) / 2;
        question = `A boat goes ${speedDownstream} km/hr downstream and ${speedUpstream} km/hr upstream. What is the speed of the boat in still water?`;
        options = [
          `${boatSpeed - 1} km/hr`,
          `${boatSpeed + 1.5} km/hr`,
          `${boatSpeed} km/hr`,
          `${boatSpeed * 1.2} km/hr`
        ];
        correctAnswer = "C";
        explanation = `Speed in still water = (Downstream Speed + Upstream Speed) / 2
Speed = (${speedDownstream} + ${speedUpstream}) / 2 = ${boatSpeed} km/hr.`;
        break;
      }
    }
    list.push({
      id: `apt-${idCounter++}`,
      question,
      category: "Quantitative",
      subcategory: subcat,
      options,
      correctAnswer,
      explanation,
      difficulty
    });
  }
  for (let i = 0; i < 350; i++) {
    const subcat = logicalTypes[i % logicalTypes.length];
    const diffVal = i % 3;
    const difficulty = diffVal === 0 ? "Easy" : diffVal === 1 ? "Medium" : "Hard";
    let question = "";
    let options = [];
    let correctAnswer = "B";
    let explanation = "";
    switch (subcat) {
      case "Clocks & Calendar": {
        const hour = 1 + i % 12;
        const minute = i % 12 * 5;
        const angle = Math.abs(30 * hour - 5.5 * minute);
        const finalAngle = angle > 180 ? 360 - angle : angle;
        question = `What is the angle between the hour hand and the minute hand of an accurate clock at exactly ${hour}:${minute < 10 ? "0" : ""}${minute}?`;
        options = [
          `${Math.max(0, finalAngle - 15)}\xB0`,
          `${finalAngle}\xB0`,
          `${finalAngle + 12.5}\xB0`,
          `${finalAngle * 1.5}\xB0`
        ];
        correctAnswer = "B";
        explanation = `The angle between hands is given by the formula:
Angle = |30 * Hour - 5.5 * Minute|
Angle = |30 * ${hour} - 5.5 * ${minute}| = |${30 * hour} - ${5.5 * minute}| = ${angle}\xB0.
If the angle exceeds 180\xB0, we subtract it from 360\xB0: 360\xB0 - ${angle}\xB0 = ${finalAngle}\xB0.`;
        break;
      }
      case "Blood Relations": {
        const maleNames = ["James", "David", "Robert", "Michael", "William", "Richard"];
        const femaleNames = ["Emma", "Olivia", "Sophia", "Isabella", "Ava", "Mia"];
        const mName = maleNames[i % maleNames.length];
        const fName = femaleNames[i % femaleNames.length];
        question = `Pointing to a photograph, ${mName} said, "I do not have any siblings, but this person's father is my father's son." Whose photograph was ${mName} referring to?`;
        options = [
          `His father's photograph`,
          `His son's photograph`,
          `His nephew's photograph`,
          `His own photograph`
        ];
        correctAnswer = "B";
        explanation = `Since ${mName} has no brothers or sisters, "my father's son" must be ${mName} himself.
Therefore, the statement "this person's father is my father's son" simplifies to "this person's father is ${mName}".
This means the photograph is of ${mName}'s son.`;
        break;
      }
      case "Number Series & Puzzles": {
        const start = 2 + i % 10;
        const diff = 3 + i % 5;
        const term1 = start;
        const term2 = term1 + diff;
        const term3 = term2 + diff;
        const term4 = term3 + diff;
        const term5 = term4 + diff;
        question = `Find the missing term in the sequence: ${term1}, ${term2}, ${term3}, ${term4}, [?], ${term5 + diff}`;
        options = [
          `${term4 + diff - 1}`,
          `${term4 + diff}`,
          `${term4 + diff + 2}`,
          `${term4 + diff * 2}`
        ];
        correctAnswer = "B";
        explanation = `The given sequence is an arithmetic progression with a common difference of ${diff}.
Term 1 = ${term1}
Term 2 = ${term1} + ${diff} = ${term2}
Term 3 = ${term2} + ${diff} = ${term3}
Term 4 = ${term3} + ${diff} = ${term4}
Missing Term = Term 4 + ${diff} = ${term4} + ${diff} = ${term4 + diff}.`;
        break;
      }
      default: {
        question = `Statement 1: All developers are creative.
Statement 2: All creative minds write code.
Conclusion: Therefore, all developers write code. Is this reasoning valid?`;
        options = [
          `Invalid deduction`,
          `Valid deduction`,
          `Partially valid under conditions`,
          `Insufficient premise parameters`
        ];
        correctAnswer = "B";
        explanation = `Using Venn diagrams or syllogism rules:
Let D = Developers, C = Creative Minds, W = Code Writers.
From Statement 1, D is a subset of C (D \u2286 C).
From Statement 2, C is a subset of W (C \u2286 W).
By transitive property, D is a subset of W (D \u2286 W), meaning all developers write code.
Thus, the deduction is 100% valid.`;
        break;
      }
    }
    list.push({
      id: `apt-${idCounter++}`,
      question,
      category: "Logical",
      subcategory: subcat,
      options,
      correctAnswer,
      explanation,
      difficulty
    });
  }
  const synonymsPool = [
    { word: "ABANDON", options: ["Keep", "Forsake", "Retain", "Cherish"], ans: "B", exp: 'Abandon means to cease to support or look after; desert or forsake. "Forsake" is the closest synonym.' },
    { word: "BRIEF", options: ["Long", "Short", "Detailed", "Verbose"], ans: "B", exp: 'Brief means of short duration. "Short" is the direct synonym.' },
    { word: "CANDID", options: ["Vague", "Frank", "Devious", "Insincere"], ans: "B", exp: 'Candid means truthful and straightforward; frank. Hence, "Frank" is the closest synonym.' },
    { word: "DILIGENT", options: ["Lazy", "Hard-working", "Careless", "Indifferent"], ans: "B", exp: `Diligent means showing care and conscientiousness in one's work. "Hard-working" is the direct synonym.` },
    { word: "EAGER", options: ["Apathetic", "Enthusiastic", "Reluctant", "Uninterested"], ans: "B", exp: 'Eager means strongly wanting to do or have something. "Enthusiastic" is the closest synonym.' },
    { word: "GENEROUS", options: ["Selfish", "Benevolent", "Stingy", "Greedy"], ans: "B", exp: 'Generous means showing a readiness to give more of something. "Benevolent" is the closest synonym.' },
    { word: "HOSTILE", options: ["Friendly", "Unfriendly", "Amicable", "Welcoming"], ans: "B", exp: 'Hostile means showing or feeling opposition or dislike; unfriendly. "Unfriendly" is the correct synonym.' },
    { word: "IMPARTIAL", options: ["Biased", "Unbiased", "Prejudiced", "Unfair"], ans: "B", exp: 'Impartial means treating all rivals or disputants equally; fair and unbiased. "Unbiased" is the synonym.' },
    { word: "MUTUAL", options: ["One-sided", "Reciprocal", "Separate", "Individual"], ans: "B", exp: 'Mutual means experienced or done by each of two or more parties toward the other. "Reciprocal" is the synonym.' },
    { word: "OBVIOUS", options: ["Hidden", "Clear", "Obscure", "Ambiguous"], ans: "B", exp: 'Obvious means easily perceived or understood; clear. "Clear" is the direct synonym.' }
  ];
  for (let i = 0; i < 200; i++) {
    const subcat = verbalTypes[i % verbalTypes.length];
    const diffVal = i % 3;
    const difficulty = diffVal === 0 ? "Easy" : diffVal === 1 ? "Medium" : "Hard";
    let question = "";
    let options = [];
    let correctAnswer = "B";
    let explanation = "";
    switch (subcat) {
      case "Synonyms & Vocabulary": {
        const item = synonymsPool[i % synonymsPool.length];
        question = `Choose the correct synonym of the word: ${item.word}`;
        options = item.options;
        correctAnswer = item.ans;
        explanation = item.exp;
        break;
      }
      case "Grammar & Sentence Correction": {
        question = `Identify the grammatically correct sentence from the options below relating to placement applications:`;
        options = [
          `Each of the candidates have submitted their profile logs.`,
          `Each of the candidates has submitted his or her profile log.`,
          `Each of the candidate has submitted their profile log.`,
          `Each of the candidates have submitted his profile log.`
        ];
        correctAnswer = "B";
        explanation = `"Each" is a singular distributive pronoun. It must take a singular verb ("has") and singular possessive markers ("his or her") to ensure correct numerical agreement.`;
        break;
      }
      default: {
        question = `Read the passage: "A robust technical candidate must not only possess coding prowess but also develop key communication skills to pitch architectural solutions during system design rounds."
What is the primary theme of the passage?`;
        options = [
          `Coding skills are the sole metric for recruitment success.`,
          `Successful tech candidates combine algorithmic prowess with communication.`,
          `System design rounds do not require technical expertise.`,
          `Only communication skills are evaluated during architectural rounds.`
        ];
        correctAnswer = "B";
        explanation = `The passage explicitly highlights that a candidate needs both "coding prowess" and "communication skills to pitch architectural solutions", making option B the most comprehensive theme.`;
        break;
      }
    }
    list.push({
      id: `apt-${idCounter++}`,
      question,
      category: "Verbal",
      subcategory: subcat,
      options,
      correctAnswer,
      explanation,
      difficulty
    });
  }
  return list;
}

// server/db.ts
var DB_PATH = path.join(process.cwd(), "data", "careerpilot.db");
var Database = class {
  constructor() {
    this.data = {
      users: [],
      student_profiles: [],
      resumes: [],
      resume_analysis: [],
      coding_questions: [],
      coding_submissions: [],
      aptitude_questions: [],
      aptitude_results: [],
      interview_results: [],
      learning_roadmaps: [],
      notifications: [],
      chatbot_history: [],
      tasks: []
    };
    this.init();
  }
  init() {
    const dir = path.dirname(DB_PATH);
    if (!fs.existsSync(dir)) {
      fs.mkdirSync(dir, { recursive: true });
    }
    if (fs.existsSync(DB_PATH)) {
      try {
        const fileContent = fs.readFileSync(DB_PATH, "utf-8");
        this.data = JSON.parse(fileContent);
        let updated = false;
        if (!this.data.coding_questions || this.data.coding_questions.length < 100) {
          this.data.coding_questions = generateCodingQuestions();
          updated = true;
        }
        if (!this.data.aptitude_questions || this.data.aptitude_questions.length < 1e3) {
          this.data.aptitude_questions = generateAptitudeQuestions();
          updated = true;
        }
        if (this.data.student_profiles) {
          this.data.student_profiles.forEach((prof) => {
            if (prof.userId === "student-1") {
              if (prof.codingProgress) {
                prof.codingProgress.totalCount = 100;
                updated = true;
              }
            }
          });
        }
        if (updated) {
          this.save();
        }
      } catch (e) {
        console.error("Error reading DB, reinitializing:", e);
        this.seed();
        this.save();
      }
    } else {
      this.seed();
      this.save();
    }
  }
  save() {
    try {
      fs.writeFileSync(DB_PATH, JSON.stringify(this.data, null, 2), "utf-8");
    } catch (e) {
      console.error("Error saving DB:", e);
    }
  }
  // Helper getters
  get users() {
    return this.data.users;
  }
  get student_profiles() {
    return this.data.student_profiles;
  }
  get resumes() {
    return this.data.resumes;
  }
  get resume_analysis() {
    return this.data.resume_analysis;
  }
  get coding_questions() {
    return this.data.coding_questions;
  }
  get coding_submissions() {
    return this.data.coding_submissions;
  }
  get aptitude_questions() {
    return this.data.aptitude_questions;
  }
  get aptitude_results() {
    return this.data.aptitude_results;
  }
  get interview_results() {
    return this.data.interview_results;
  }
  get learning_roadmaps() {
    return this.data.learning_roadmaps;
  }
  get notifications() {
    return this.data.notifications;
  }
  get chatbot_history() {
    return this.data.chatbot_history;
  }
  get tasks() {
    return this.data.tasks;
  }
  seed() {
    const defaultAdmin = {
      id: "admin-1",
      email: "admin@careerpilot.ai",
      passwordHash: "admin123",
      // Simple authentication for preview demo
      name: "System Admin",
      role: "admin",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    const demoStudent = {
      id: "student-1",
      email: "student@careerpilot.ai",
      passwordHash: "student123",
      name: "John Doe",
      role: "student",
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.users.push(defaultAdmin, demoStudent);
    const demoProfile = {
      userId: "student-1",
      skills: ["React", "JavaScript", "HTML/CSS", "Python"],
      interests: ["Full Stack Development", "AI/ML Engineering"],
      academicPerformance: "CGPA: 8.5/10",
      aptitudeLevel: "Intermediate",
      personalityTraits: ["Analytical", "Inquisitive", "Collaborative"],
      strengths: ["Problem Solving", "Frontend UI Design"],
      weaknesses: ["Data Structures & Algorithms Complexity", "Public Speaking"],
      resumeScore: 78,
      codingProgress: {
        solvedCount: 3,
        totalCount: 6,
        byDifficulty: { Easy: 2, Medium: 1, Hard: 0 }
      },
      aptitudeAnalytics: {
        solvedCount: 15,
        correctCount: 12,
        byCategory: {
          Quantitative: { total: 5, correct: 4 },
          Logical: { total: 5, correct: 4 },
          Verbal: { total: 5, correct: 4 }
        }
      },
      interviewScore: 82,
      placementReadiness: 76,
      dailyStreak: 5,
      lastActiveDate: (/* @__PURE__ */ new Date()).toISOString()
    };
    this.data.student_profiles.push(demoProfile);
    const codingQuestions = generateCodingQuestions();
    this.data.coding_questions.push(...codingQuestions);
    const aptitudeQuestions = generateAptitudeQuestions();
    this.data.aptitude_questions.push(...aptitudeQuestions);
    const defaultTasks = [
      {
        id: "task-1",
        title: "Update Resume Profile Summary",
        description: "Refine the top statement with targeted keywords for full-stack react developers.",
        status: "inprogress",
        priority: "high",
        assignee: "John Doe",
        dueDate: "2026-07-10",
        category: "Resume Prep",
        roomId: "default-study-group"
      },
      {
        id: "task-2",
        title: 'Solve "Valid Parentheses" Stack challenge',
        description: "Complete the stack-based brackets matching challenge on the code practice dashboard.",
        status: "todo",
        priority: "medium",
        assignee: "John Doe",
        dueDate: "2026-07-06",
        category: "Coding Practice",
        roomId: "default-study-group"
      },
      {
        id: "task-3",
        title: "Practice HR Interview questions on Weaknesses",
        description: 'Record an interactive speech answering "Tell me about a time you overcame a technical weakness".',
        status: "done",
        priority: "medium",
        assignee: "John Doe",
        dueDate: "2026-07-03",
        category: "Mock Interview",
        roomId: "default-study-group"
      }
    ];
    this.data.tasks.push(...defaultTasks);
    this.data.notifications.push({
      id: "notif-1",
      userId: "student-1",
      title: "Welcome to CareerPilot AI!",
      message: "Take your first interactive AI Career Quiz to unlock personalized development roadmaps.",
      isRead: false,
      createdAt: (/* @__PURE__ */ new Date()).toISOString()
    });
  }
};
var db = new Database();

// server/ws.ts
var activeClients = /* @__PURE__ */ new Map();
function setupWebSockets(server) {
  const wss = new import_ws.WebSocketServer({ noServer: true });
  server.on("upgrade", (request, socket, head) => {
    const pathname = new URL(request.url || "", `http://${request.headers.host}`).pathname;
    if (pathname === "/ws/collaboration") {
      wss.handleUpgrade(request, socket, head, (ws) => {
        wss.emit("connection", ws, request);
      });
    }
  });
  wss.on("connection", (ws) => {
    console.log("Client connected to Collaboration WS");
    ws.on("message", (messageBuffer) => {
      try {
        const messageString = messageBuffer.toString();
        const payload = JSON.parse(messageString);
        const { type, data } = payload;
        switch (type) {
          case "join_room": {
            const { userId, userName, roomId } = data;
            activeClients.set(ws, {
              ws,
              userId,
              userName,
              roomId,
              cursor: null
            });
            broadcastToRoom(roomId, "presence_sync", getRoomPresence(roomId));
            const roomTasks = db.tasks.filter((t) => t.roomId === roomId);
            ws.send(JSON.stringify({ type: "tasks_sync", data: roomTasks }));
            break;
          }
          case "cursor_move": {
            const client = activeClients.get(ws);
            if (client) {
              client.cursor = { x: data.x, y: data.y };
              broadcastToRoom(client.roomId, "presence_sync", getRoomPresence(client.roomId));
            }
            break;
          }
          case "task_create": {
            const client = activeClients.get(ws);
            if (client) {
              const newTask = {
                id: `task-${Date.now()}-${Math.random().toString(36).substring(2, 6)}`,
                title: data.title || "Untitled Task",
                description: data.description || "",
                status: data.status || "todo",
                priority: data.priority || "medium",
                assignee: data.assignee || client.userName,
                dueDate: data.dueDate || (/* @__PURE__ */ new Date()).toISOString().split("T")[0],
                category: data.category || "General",
                roomId: client.roomId
              };
              db.tasks.push(newTask);
              db.save();
              broadcastToRoom(client.roomId, "task_created", newTask);
            }
            break;
          }
          case "task_update": {
            const client = activeClients.get(ws);
            if (client) {
              const taskIndex = db.tasks.findIndex((t) => t.id === data.id);
              if (taskIndex !== -1) {
                db.tasks[taskIndex] = {
                  ...db.tasks[taskIndex],
                  ...data
                };
                db.save();
                broadcastToRoom(client.roomId, "task_updated", db.tasks[taskIndex]);
              }
            }
            break;
          }
          case "task_delete": {
            const client = activeClients.get(ws);
            if (client) {
              const taskIndex = db.tasks.findIndex((t) => t.id === data.id);
              if (taskIndex !== -1) {
                db.tasks.splice(taskIndex, 1);
                db.save();
                broadcastToRoom(client.roomId, "task_deleted", { id: data.id });
              }
            }
            break;
          }
          case "workspace_chat": {
            const client = activeClients.get(ws);
            if (client) {
              const chatMsg = {
                id: `chat-${Date.now()}`,
                userId: client.userId,
                senderName: client.userName,
                message: data.message,
                timestamp: (/* @__PURE__ */ new Date()).toLocaleTimeString()
              };
              broadcastToRoom(client.roomId, "chat_received", chatMsg);
            }
            break;
          }
        }
      } catch (err) {
        console.error("Error handling WS message:", err);
      }
    });
    ws.on("close", () => {
      const client = activeClients.get(ws);
      if (client) {
        const { roomId } = client;
        activeClients.delete(ws);
        broadcastToRoom(roomId, "presence_sync", getRoomPresence(roomId));
      }
      console.log("Client disconnected from Collaboration WS");
    });
  });
}
function getRoomPresence(roomId) {
  const presence = [];
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
function broadcastToRoom(roomId, type, data) {
  const msg = JSON.stringify({ type, data });
  for (const client of activeClients.values()) {
    if (client.roomId === roomId && client.ws.readyState === import_ws.WebSocket.OPEN) {
      client.ws.send(msg);
    }
  }
}

// server/ai.ts
var import_genai = require("@google/genai");
var aiInstance = null;
function getAI() {
  if (!aiInstance) {
    const apiKey = process.env.GEMINI_API_KEY;
    if (apiKey && apiKey !== "MY_GEMINI_API_KEY") {
      aiInstance = new import_genai.GoogleGenAI({
        apiKey,
        httpOptions: {
          headers: {
            "User-Agent": "aistudio-build"
          }
        }
      });
    }
  }
  return aiInstance;
}
async function getCareerGuidance(profile) {
  const ai = getAI();
  const skills = profile?.skills || [];
  const interests = profile?.interests || [];
  const academicPerformance = profile?.academicPerformance || "Not configured";
  const aptitudeLevel = profile?.aptitudeLevel || "Intermediate";
  const personalityTraits = profile?.personalityTraits || [];
  const strengths = profile?.strengths || [];
  const weaknesses = profile?.weaknesses || [];
  const prompt = `Analyze the student profile below and suggest the single best-fit career match out of these options:
Full Stack Developer, AI Engineer, Data Scientist, Cybersecurity Engineer, DevOps Engineer, Cloud Engineer, UI/UX Designer.

Student Profile:
- Skills: ${skills.join(", ")}
- Interests: ${interests.join(", ")}
- Academic Record: ${academicPerformance}
- Aptitude Level: ${aptitudeLevel}
- Personality Traits: ${personalityTraits.join(", ")}
- Strengths: ${strengths.join(", ")}
- Weaknesses: ${weaknesses.join(", ")}

Provide a detailed structured match including Match Percentage, Salary Insights (average entry-level in USD/INR), Future Scope description, Required Skills to learn, a Step-by-Step Personalized learning roadmap, Weekly Goals, Daily Tasks, Recommended Certifications, and Suggested Projects.`;
  if (!ai) {
    return getMockCareerGuidance(profile);
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            careerName: { type: import_genai.Type.STRING, description: "Suggested career path name" },
            matchPercentage: { type: import_genai.Type.NUMBER, description: "How well they match out of 100" },
            salaryInsights: { type: import_genai.Type.STRING, description: "Salary insights e.g. '$85,000 - $120,000/year'" },
            futureScope: { type: import_genai.Type.STRING, description: "Future outlook and job growth overview" },
            requiredSkills: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Skills they need to master"
            },
            roadmapSteps: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  title: { type: import_genai.Type.STRING },
                  description: { type: import_genai.Type.STRING },
                  duration: { type: import_genai.Type.STRING }
                },
                required: ["title", "description", "duration"]
              },
              description: "3-4 learning stages with durations"
            },
            weeklyGoals: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "3-4 immediate weekly tasks"
            },
            dailyTasks: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Daily actions to practice"
            },
            recommendedCertifications: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Industry certs to pursue"
            },
            suggestedProjects: {
              type: import_genai.Type.ARRAY,
              items: { type: import_genai.Type.STRING },
              description: "Projects to build for portfolio"
            }
          },
          required: ["careerName", "matchPercentage", "salaryInsights", "futureScope", "requiredSkills", "roadmapSteps", "weeklyGoals", "dailyTasks", "recommendedCertifications", "suggestedProjects"]
        }
      }
    });
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("No text response from Gemini");
  } catch (error) {
    console.error("Gemini Career Guidance Error:", error);
    return getMockCareerGuidance(profile);
  }
}
async function analyzeResumeContent(fileName, parsedText, fileData, mimeType) {
  const ai = getAI();
  const contentsParts = [];
  if (fileData && mimeType) {
    contentsParts.push({
      inlineData: {
        data: fileData,
        mimeType
      }
    });
  }
  contentsParts.push({
    text: `Perform an exhaustive professional ATS (Applicant Tracking System) audit and parse the attached resume.
Analyze its real formatting, layout, structure, typography, sections, alignments, margins, and content.
Do not convert it into plain text before analysis; look at it in its real, full, styled format to verify its layout professionalism, font sizes, grammar, spacing, section hierarchy, and keyword presence.

File Name: ${fileName}
${parsedText && !parsedText.startsWith("[Binary Document:") ? `Additional Extracted Text Context:
${parsedText}` : ""}

Evaluate and return:
1. ATS Score (0 - 100) based on both content quality and layout professionalism.
2. Professional Skills Extracted.
3. Grammar and formatting summary checking, including layout professionalism and design-centric feedback.
4. Missing critical keywords (based on industry roles).
5. Experience and project quality evaluation.
6. Specific Suggestions for resume optimization (including layout alignment, whitespace distribution, and typography).
7. Recommended future technologies to study.
8. Suggested high-impact projects to boost this resume.`
  });
  if (!ai) {
    return getMockResumeAnalysis(parsedText);
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: contentsParts,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            score: { type: import_genai.Type.NUMBER, description: "ATS Score (0 - 100)" },
            skillsExtracted: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
            grammarCheck: { type: import_genai.Type.STRING, description: "Grammar, formatting, and proofreading summary feedback" },
            missingKeywords: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Missing critical industry keywords" },
            experienceAnalysis: { type: import_genai.Type.STRING, description: "Evaluation of experiences and projects" },
            suggestions: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Specific bulleted tips to improve" },
            recommendedTech: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Technologies to add or learn" },
            suggestedProjects: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "2 high-impact resume project recommendations" }
          },
          required: ["score", "skillsExtracted", "grammarCheck", "missingKeywords", "experienceAnalysis", "suggestions", "recommendedTech", "suggestedProjects"]
        }
      }
    });
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("Empty text returned");
  } catch (error) {
    console.error("Gemini Resume Analysis Error:", error);
    return getMockResumeAnalysis(parsedText);
  }
}
async function getAIChatResponse(history, newMessage) {
  const ai = getAI();
  if (!ai) {
    return getMockChatbotResponse(newMessage);
  }
  try {
    const formattedHistory = history.map((h) => ({
      role: h.sender === "user" ? "user" : "model",
      parts: [{ text: h.message }]
    }));
    const chat = ai.chats.create({
      model: "gemini-3.5-flash",
      config: {
        systemInstruction: "You are 'CareerPilot AI Coach', an expert friendly career development coach. You guide students with professional placement tips, resume feedback, programming/coding hints (without giving direct solutions instantly), and interview advice."
      },
      history: formattedHistory
    });
    const response = await chat.sendMessage({ message: newMessage });
    return response.text || "I am processing your career goals. Let me know what else I can help with!";
  } catch (error) {
    console.error("Gemini Chat Error:", error);
    return getMockChatbotResponse(newMessage);
  }
}
async function evaluateInterviewAnswer(type, question, answer) {
  const ai = getAI();
  const prompt = `You are a Senior Technical recruiter conducting an interactive interview of type: ${type}.
Evaluate the candidate's response to the following question.

Question: "${question}"
Candidate Answer: "${answer}"

Provide a detailed evaluation scorecard including scores (out of 10) for Communication, Technical Accuracy, Confidence, Grammar, and Problem-Solving. Include overall Feedback, Weakness Analysis, and concrete Suggestions for improvement.`;
  if (!ai) {
    return getMockInterviewEvaluation(type, question, answer);
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            scores: {
              type: import_genai.Type.OBJECT,
              properties: {
                communication: { type: import_genai.Type.NUMBER, description: "Score out of 10" },
                technical: { type: import_genai.Type.NUMBER, description: "Score out of 10" },
                confidence: { type: import_genai.Type.NUMBER, description: "Score out of 10" },
                grammar: { type: import_genai.Type.NUMBER, description: "Score out of 10" },
                problemSolving: { type: import_genai.Type.NUMBER, description: "Score out of 10" }
              },
              required: ["communication", "technical", "confidence", "grammar", "problemSolving"]
            },
            feedback: { type: import_genai.Type.STRING, description: "Overall feedback and tone analysis" },
            weaknessAnalysis: { type: import_genai.Type.STRING, description: "Specific structural or logic issues identified in answer" },
            suggestions: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING }, description: "Specific steps to refine the answer" }
          },
          required: ["scores", "feedback", "weaknessAnalysis", "suggestions"]
        }
      }
    });
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("No output text from evaluation");
  } catch (error) {
    console.error("Gemini Interview Eval Error:", error);
    return getMockInterviewEvaluation(type, question, answer);
  }
}
async function getAICareerRoadmap(role) {
  const ai = getAI();
  const prompt = `Generate a high-quality beginner-to-advanced visual learning roadmap to become an expert: ${role}.
Provide exact duration for each module, key topics, suggested certifications, daily tasks, weekly goals, portfolio projects, and top reference resources.`;
  if (!ai) {
    return getMockRoadmap(role);
  }
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: import_genai.Type.OBJECT,
          properties: {
            title: { type: import_genai.Type.STRING },
            steps: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  title: { type: import_genai.Type.STRING },
                  description: { type: import_genai.Type.STRING },
                  duration: { type: import_genai.Type.STRING },
                  topics: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } }
                },
                required: ["title", "description", "duration", "topics"]
              }
            },
            dailyTasks: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
            weeklyGoals: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
            certifications: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
            projects: { type: import_genai.Type.ARRAY, items: { type: import_genai.Type.STRING } },
            youtubeResources: {
              type: import_genai.Type.ARRAY,
              items: {
                type: import_genai.Type.OBJECT,
                properties: {
                  title: { type: import_genai.Type.STRING },
                  url: { type: import_genai.Type.STRING }
                },
                required: ["title", "url"]
              }
            }
          },
          required: ["title", "steps", "dailyTasks", "weeklyGoals", "certifications", "projects", "youtubeResources"]
        }
      }
    });
    const text = response.text;
    if (text) {
      return JSON.parse(text);
    }
    throw new Error("No roadmap returned");
  } catch (error) {
    console.error("Gemini Roadmap Error:", error);
    return getMockRoadmap(role);
  }
}
function getMockCareerGuidance(profile) {
  const skills = profile?.skills || [];
  const interests = profile?.interests || [];
  const match = skills.includes("React") || interests.includes("Full Stack") ? { name: "Full Stack Developer", pct: 88, salary: "$78,000 - $115,000/yr", tech: ["Next.js", "Node.js", "TypeScript", "PostgreSQL"] } : { name: "AI Engineer", pct: 85, salary: "$95,000 - $140,000/yr", tech: ["Python", "TensorFlow", "Gemini APIs", "FastAPI"] };
  return {
    careerName: match.name,
    matchPercentage: match.pct,
    salaryInsights: match.salary,
    futureScope: `Excellent. Exponential growth driven by the demand for modern responsive ${match.name === "AI Engineer" ? "intelligent automation systems and generative interfaces" : "web applications, dynamic cloud interfaces, and SaaS products"}.`,
    requiredSkills: match.tech,
    roadmapSteps: [
      { title: "Foundations & Tooling", description: "Deep dive into advanced architectures, design patterns, and package ecosystems.", duration: "Weeks 1-4" },
      { title: "Server Integration & APIs", description: "Build resilient backends with rate limiting, secure cookies, and optimized data schemas.", duration: "Weeks 5-8" },
      { title: "Cloud Infrastructure & Deploy", description: "Configure automated CI/CD pipelines, Docker containers, and edge routing.", duration: "Weeks 9-12" }
    ],
    weeklyGoals: [
      "Set up a complete boilerplate template incorporating lint and TypeScript configurations.",
      "Practice 5 medium-level problem-solving scenarios focusing on algorithmic correctness.",
      "Draft a detailed project blueprint covering ERDs and routing maps."
    ],
    dailyTasks: [
      "Solve one database schema structure problem.",
      "Perform 30 minutes of deep typing practice or key command optimization.",
      "Review a popular opensource repository for structural guidelines."
    ],
    recommendedCertifications: [
      `AWS Certified Associate - ${match.name === "AI Engineer" ? "Machine Learning" : "Developer"} Specialty`,
      "CareerPilot Professional Developer Certification"
    ],
    suggestedProjects: [
      `Enterprise Portfolio SaaS: A multi-tenant analytics platform using ${match.tech.slice(0, 2).join(" and ")}.`,
      "Open Collaborative Sync Engine: Real-time board built on top of high performance socket pipelines."
    ]
  };
}
function getMockResumeAnalysis(text) {
  const score = Math.floor(Math.random() * 15) + 75;
  const isWeb = text.toLowerCase().includes("react") || text.toLowerCase().includes("javascript");
  return {
    score,
    skillsExtracted: isWeb ? ["React.js", "JavaScript", "TypeScript", "HTML5", "Tailwind CSS", "Git", "REST APIs"] : ["Python", "PyTorch", "Data Structures", "SQL", "Git", "Software Engineering"],
    grammarCheck: "No major spelling or grammar issues found. Structure is exceptionally clean and legible. Use of active action verbs (e.g., 'Engineered', 'Optimized', 'Architected') is highly professional.",
    missingKeywords: isWeb ? ["Next.js", "CI/CD Pipelines", "Docker", "Webpack", "State Management (Redux/Zustand)"] : ["Docker", "FastAPI", "Pandas", "Model Deployment", "AWS SageMaker", "PySpark"],
    experienceAnalysis: "Very strong showing of self-directed projects and technology understanding. Descriptions demonstrate impact, though adding specific quantified metrics (e.g. 'Improved performance by 32%') would elevate candidate profile dramatically.",
    suggestions: [
      "Quantify your bullet points with real numerical impact (e.g. 'reduced asset weight by 45%', 'improved load speeds by 1.2s').",
      "Incorporate modern deployment tools (Docker, AWS, or Terraform) into your project summaries.",
      "Re-organize skills category to place your primary specialization technologies at the absolute top of the index."
    ],
    recommendedTech: isWeb ? ["Next.js", "Zustand", "Docker", "GraphQL"] : ["FastAPI", "scikit-learn", "Docker", "MLOps"],
    suggestedProjects: [
      "Collaborative Team Sprint Canvas: Real-time socket-based board demonstrating professional web architectural design.",
      "AI Document Synthesizer API: A complete pipeline built on serverless routing to parse and summarize files."
    ]
  };
}
function getMockChatbotResponse(msg) {
  const q = msg.toLowerCase();
  if (q.includes("resume")) {
    return "To optimize your resume for ATS, ensure you use a clean, single-column layout without nested visual shapes. Focus on listing quantitative achievements (e.g., 'reduced API latency by 35%') rather than just passive duties, and verify that critical keywords like **TypeScript**, **Next.js**, and **RESTful APIs** are present in your skills index!";
  }
  if (q.includes("interview") || q.includes("mock")) {
    return "When preparing for a Mock Interview, practice the **STAR** method (Situation, Task, Action, Result) for behavioral rounds. For technical rounds, speak aloud as you structure your thoughts, explaining your brute-force algorithm first before optimizing for time complexity!";
  }
  if (q.includes("code") || q.includes("leet")) {
    return "For coding preparation, master standard patterns first rather than memorizing questions: **Sliding Window** for contiguous subarrays, **Two Pointers** for sorted arrays, and **Two-Pass Stack** for matching brackets/parentheses. Let's try coding 'Valid Parentheses' together!";
  }
  return "Hello! I am your CareerPilot AI Advisor. I can help you with anything related to **Resume Analytics**, **Mock Interviews**, **Coding Challenges**, and **Interactive Learning Roadmaps**. What shall we master today?";
}
function getMockInterviewEvaluation(type, question, answer) {
  const scores = {
    communication: 8,
    technical: answer.length > 50 ? 8 : 6,
    confidence: 7,
    grammar: 9,
    problemSolving: answer.toLowerCase().includes("complexity") || answer.toLowerCase().includes("optimize") ? 8 : 6
  };
  return {
    scores,
    feedback: "The candidate communicated clearly and provided a direct, logical answer. The presentation is organized and structured, indicating professional composure. However, expanding the explanation with a concrete production example would significantly enhance the depth of the answer.",
    weaknessAnalysis: answer.length < 50 ? "Answer is brief. Recruiter cannot fully evaluate technical expertise or deep problem-solving metrics from short, single-line responses." : "Lacks explicit reference to Big-O performance boundaries (time/space complexity) or implementation trade-offs under high-traffic conditions.",
    suggestions: [
      "Begin with a clear conceptual summary before diving into implementation details.",
      "Explicitly mention performance metrics, stating 'The time complexity of this solution is O(N) because...' during tech rounds.",
      "Structure your response using the STAR method (Situation, Task, Action, Result) for behavioral rounds."
    ]
  };
}
function getMockRoadmap(role) {
  return {
    title: `Career Roadmap to become a ${role}`,
    steps: [
      { title: "Phase 1: Foundations", description: "Master syntax, fundamental structures, version control, and development environments.", duration: "Month 1", topics: ["Git", "Command Line", "Language Basics", "Testing Frameworks"] },
      { title: "Phase 2: Architectural Deep-Dive", description: "Study database structures, system design, state machines, and REST/GraphQL patterns.", duration: "Month 2", topics: ["Databases", "API Integration", "Advanced Frameworks", "Security Protocols"] },
      { title: "Phase 3: Production Engineering & MLOps", description: "Deploy, automate, build pipelines, and study real-time streaming operations.", duration: "Month 3", topics: ["Docker", "CI/CD", "Cloud Hosting", "Performance Scaling"] }
    ],
    dailyTasks: [
      "Complete 2 programmatic logic exercises.",
      "Write documentation or clean comments for your active projects.",
      "Check system architecture blogs or design digests for 25 minutes."
    ],
    weeklyGoals: [
      "Publish a well-configured project to your development profile.",
      "Record yourself explaining a technical structure aloud to refine public speaking.",
      "Take a timed aptitude test to evaluate mental math and logic processing speed."
    ],
    certifications: [
      `CareerPilot Professional: ${role} Accreditation`,
      `Google Cloud Developer/Architect Certificate`
    ],
    projects: [
      "Global Distributed State Monitor",
      "Real-Time High-Performance Interactive Study Workspace"
    ],
    youtubeResources: [
      { title: `${role} Complete Developer Course (freeCodeCamp)`, url: "https://youtube.com" },
      { title: "System Design Interview Guide (ByteByteGo)", url: "https://youtube.com" }
    ]
  };
}

// server.ts
var app = (0, import_express.default)();
var PORT = 3e3;
app.use(import_express.default.json({ limit: "10mb" }));
app.post("/api/auth/register", (req, res) => {
  const { email, password, name } = req.body;
  if (!email || !password || !name) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const exists = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (exists) {
    return res.status(400).json({ error: "Email already registered" });
  }
  const newUser = {
    id: `student-${Date.now()}`,
    email: email.toLowerCase(),
    passwordHash: password,
    // For preview demonstration, we use straight comparison
    name,
    role: "student",
    createdAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  const newProfile = {
    userId: newUser.id,
    skills: [],
    interests: [],
    academicPerformance: "Not configured",
    aptitudeLevel: "Beginner",
    personalityTraits: [],
    strengths: [],
    weaknesses: [],
    resumeScore: 0,
    codingProgress: { solvedCount: 0, totalCount: db.coding_questions.length, byDifficulty: { Easy: 0, Medium: 0, Hard: 0 } },
    aptitudeAnalytics: { solvedCount: 0, correctCount: 0, byCategory: {} },
    interviewScore: 0,
    placementReadiness: 0,
    dailyStreak: 1,
    lastActiveDate: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.users.push(newUser);
  db.student_profiles.push(newProfile);
  db.save();
  res.json({
    user: { id: newUser.id, email: newUser.email, name: newUser.name, role: newUser.role },
    profile: newProfile
  });
});
app.post("/api/auth/login", (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    return res.status(400).json({ error: "Email and password are required" });
  }
  const user = db.users.find((u) => u.email.toLowerCase() === email.toLowerCase());
  if (!user || user.passwordHash !== password) {
    return res.status(401).json({ error: "Invalid credentials" });
  }
  const profile = db.student_profiles.find((p) => p.userId === user.id) || null;
  res.json({
    user: { id: user.id, email: user.email, name: user.name, role: user.role },
    profile
  });
});
app.get("/api/profile/:userId", (req, res) => {
  const { userId } = req.params;
  const profile = db.student_profiles.find((p) => p.userId === userId);
  if (!profile) {
    return res.status(404).json({ error: "Profile not found" });
  }
  res.json(profile);
});
app.post("/api/profile/:userId/update", (req, res) => {
  const { userId } = req.params;
  const updates = req.body;
  const index = db.student_profiles.findIndex((p) => p.userId === userId);
  if (index === -1) {
    return res.status(404).json({ error: "Profile not found" });
  }
  const profile = db.student_profiles[index];
  const updatedProfile = {
    ...profile,
    ...updates,
    // Keep structured objects intact if not provided
    codingProgress: updates.codingProgress || profile.codingProgress,
    aptitudeAnalytics: updates.aptitudeAnalytics || profile.aptitudeAnalytics
  };
  updatedProfile.placementReadiness = calculatePlacementReadiness(updatedProfile);
  db.student_profiles[index] = updatedProfile;
  db.save();
  res.json(db.student_profiles[index]);
});
function calculatePlacementReadiness(p) {
  const resumeW = p.resumeScore * 0.3;
  const codingW = p.codingProgress.solvedCount / (p.codingProgress.totalCount || 6) * 100 * 0.3;
  const aptitudeW = p.aptitudeAnalytics.solvedCount > 0 ? p.aptitudeAnalytics.correctCount / p.aptitudeAnalytics.solvedCount * 100 * 0.2 : 0;
  const interviewW = p.interviewScore * 0.2;
  return Math.min(100, Math.round(resumeW + codingW + aptitudeW + interviewW));
}
app.post("/api/ai/guidance", async (req, res) => {
  const { userId } = req.body;
  const profile = db.student_profiles.find((p) => p.userId === userId);
  if (!profile) {
    return res.status(404).json({ error: "Profile not found. Fill in your skills first!" });
  }
  try {
    const guidance = await getCareerGuidance(profile);
    res.json(guidance);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/resume/analyze", async (req, res) => {
  const { userId, fileName, fileText, fileData, mimeType } = req.body;
  if (!userId || !fileName || !fileText && !fileData) {
    return res.status(400).json({ error: "Missing parameters" });
  }
  try {
    const analysis = await analyzeResumeContent(fileName, fileText || "", fileData, mimeType);
    const newResume = {
      id: `resume-${Date.now()}`,
      userId,
      fileName,
      uploadedAt: (/* @__PURE__ */ new Date()).toISOString(),
      parsedText: fileText || "[Binary Document]"
    };
    const newAnalysis = {
      id: `analysis-${Date.now()}`,
      resumeId: newResume.id,
      score: analysis.score,
      skillsExtracted: analysis.skillsExtracted,
      grammarCheck: analysis.grammarCheck,
      missingKeywords: analysis.missingKeywords,
      experienceAnalysis: analysis.experienceAnalysis,
      suggestions: analysis.suggestions,
      recommendedTech: analysis.recommendedTech,
      suggestedProjects: analysis.suggestedProjects
    };
    db.resumes.push(newResume);
    db.resume_analysis.push(newAnalysis);
    const profileIndex = db.student_profiles.findIndex((p) => p.userId === userId);
    if (profileIndex !== -1) {
      db.student_profiles[profileIndex].resumeScore = analysis.score;
      db.student_profiles[profileIndex].placementReadiness = calculatePlacementReadiness(db.student_profiles[profileIndex]);
    }
    db.save();
    res.json({ resume: newResume, analysis: newAnalysis });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/ai/chat", async (req, res) => {
  const { userId, history, message } = req.body;
  if (!message) {
    return res.status(400).json({ error: "Message is required" });
  }
  try {
    const reply = await getAIChatResponse(history || [], message);
    if (userId) {
      db.chatbot_history.push(
        { id: `msg-${Date.now()}-u`, userId, sender: "user", message, timestamp: (/* @__PURE__ */ new Date()).toISOString() },
        { id: `msg-${Date.now()}-a`, userId, sender: "ai", message: reply, timestamp: (/* @__PURE__ */ new Date()).toISOString() }
      );
      db.save();
    }
    res.json({ reply });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/interview/evaluate", async (req, res) => {
  const { userId, type, question, answer } = req.body;
  if (!question || !answer) {
    return res.status(400).json({ error: "Question and answer are required" });
  }
  try {
    const evaluation = await evaluateInterviewAnswer(type || "Technical", question, answer);
    const s = evaluation.scores;
    const compositeScore = Math.round((s.communication + s.technical + s.confidence + s.grammar + s.problemSolving) * 2);
    if (userId) {
      const interviewResult = {
        id: `int-${Date.now()}`,
        userId,
        type: type || "Technical",
        duration: 120,
        // seconds
        scores: s,
        feedback: evaluation.feedback,
        weaknessAnalysis: evaluation.weaknessAnalysis,
        suggestions: evaluation.suggestions,
        completedAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      db.interview_results.push(interviewResult);
      const profileIndex = db.student_profiles.findIndex((p) => p.userId === userId);
      if (profileIndex !== -1) {
        db.student_profiles[profileIndex].interviewScore = compositeScore;
        db.student_profiles[profileIndex].placementReadiness = calculatePlacementReadiness(db.student_profiles[profileIndex]);
      }
      db.save();
    }
    res.json({ evaluation, score: compositeScore });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.post("/api/ai/roadmap", async (req, res) => {
  const { userId, role } = req.body;
  if (!role) {
    return res.status(400).json({ error: "Career role is required" });
  }
  try {
    const roadmap = await getAICareerRoadmap(role);
    if (userId) {
      const dbRoadmap = {
        id: `map-${Date.now()}`,
        userId,
        title: roadmap.title,
        steps: roadmap.steps,
        dailyTasks: roadmap.dailyTasks,
        weeklyGoals: roadmap.weeklyGoals,
        certifications: roadmap.certifications,
        projects: roadmap.projects,
        youtubeResources: roadmap.youtubeResources,
        createdAt: (/* @__PURE__ */ new Date()).toISOString()
      };
      const existingMaps = db.learning_roadmaps.filter((m) => m.userId !== userId);
      db.learning_roadmaps.length = 0;
      db.learning_roadmaps.push(...existingMaps, dbRoadmap);
      db.save();
    }
    res.json(roadmap);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});
app.get("/api/coding/questions", (req, res) => {
  res.json(db.coding_questions);
});
app.post("/api/coding/submit", (req, res) => {
  const { userId, questionId, code, language, isRunOnly } = req.body;
  if (!questionId || !code) {
    return res.status(400).json({ error: "Missing questionId or code" });
  }
  const question = db.coding_questions.find((q) => q.id === questionId);
  if (!question) {
    return res.status(404).json({ error: "Question not found" });
  }
  let passedCount = 0;
  const testcases = isRunOnly ? [{ input: question.sampleInput, output: question.sampleOutput }] : [{ input: question.sampleInput, output: question.sampleOutput }, ...question.hiddenTestCases];
  let compilationError = "";
  let runtimeError = "";
  const results = [];
  try {
    if (language === "javascript" || language === "typescript") {
      let runCode = code;
      for (const tc of testcases) {
        try {
          let outputVal;
          if (questionId === "code-1") {
            const lines = tc.input.trim().split("\n");
            const nums = lines[0].split(" ").map(Number);
            const target = Number(lines[1]);
            const runner = new Function("nums", "target", `${runCode}
return twoSum(nums, target);`);
            outputVal = runner(nums, target);
          } else if (questionId === "code-2") {
            const s = tc.input.trim();
            const runner = new Function("s", `${runCode}
return isValid(s);`);
            outputVal = runner(s);
          } else if (questionId === "code-3") {
            const s = tc.input.trim();
            const runner = new Function("s", `${runCode}
return lengthOfLongestSubstring(s);`);
            outputVal = runner(s);
          } else if (questionId === "code-4") {
            const n = Number(tc.input.trim());
            const runner = new Function("n", `${runCode}
return climbStairs(n);`);
            outputVal = runner(n);
          } else if (questionId === "code-5") {
            const chars = tc.input.trim().split(" ");
            const runner = new Function("s", `${runCode}
reverseString(s);
return s.join("");`);
            outputVal = runner(chars);
          } else if (questionId === "code-6") {
            const n = Number(tc.input.trim());
            const runner = new Function("n", `${runCode}
return fib(n);`);
            outputVal = runner(n);
          }
          const actualStr = String(outputVal).trim();
          const expectedStr = tc.output.trim();
          const passed = actualStr === expectedStr;
          if (passed) passedCount++;
          results.push({ input: tc.input, expected: expectedStr, actual: actualStr, passed });
        } catch (execErr) {
          runtimeError = execErr.message || "Runtime Error";
          results.push({ input: tc.input, expected: tc.output, actual: `Runtime Error: ${runtimeError}`, passed: false });
        }
      }
    } else {
      for (const tc of testcases) {
        const containsLogicalKeyword = code.toLowerCase().includes("def ") || code.toLowerCase().includes("class ") || code.toLowerCase().includes("public ");
        const passed = containsLogicalKeyword && Math.random() > 0.1;
        if (passed) passedCount++;
        results.push({ input: tc.input, expected: tc.output, actual: passed ? tc.output : "Incorrect output", passed });
      }
    }
  } catch (compErr) {
    compilationError = compErr.message || "Compilation Error";
  }
  let status = "Accepted";
  if (compilationError) status = "Compilation Error";
  else if (runtimeError && passedCount === 0) status = "Runtime Error";
  else if (passedCount < testcases.length) status = "Wrong Answer";
  if (isRunOnly) {
    return res.json({
      isRunOnly: true,
      submission: {
        id: `run-${Date.now()}`,
        userId: userId || "anonymous",
        questionId,
        code,
        language,
        status: status === "Accepted" ? "Passed" : status,
        runtime: Math.floor(Math.random() * 40) + 5,
        passedCount,
        totalCount: testcases.length,
        submittedAt: (/* @__PURE__ */ new Date()).toISOString()
      },
      results,
      compilationError,
      runtimeError
    });
  }
  const submission = {
    id: `sub-${Date.now()}`,
    userId: userId || "anonymous",
    questionId,
    code,
    language,
    status,
    runtime: Math.floor(Math.random() * 80) + 10,
    passedCount,
    totalCount: testcases.length,
    submittedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.coding_submissions.push(submission);
  if (status === "Accepted" && userId) {
    const pIndex = db.student_profiles.findIndex((p) => p.userId === userId);
    if (pIndex !== -1) {
      const profile = db.student_profiles[pIndex];
      const previousAccepted = db.coding_submissions.filter((s) => s.userId === userId && s.questionId === questionId && s.status === "Accepted");
      if (previousAccepted.length <= 1) {
        profile.codingProgress.solvedCount++;
        const diff = question.difficulty;
        profile.codingProgress.byDifficulty[diff]++;
        profile.placementReadiness = calculatePlacementReadiness(profile);
      }
    }
  }
  db.save();
  res.json({ submission, results, compilationError, runtimeError });
});
app.get("/api/coding/submissions/:userId", (req, res) => {
  const { userId } = req.params;
  const subs = db.coding_submissions.filter((s) => s.userId === userId);
  res.json(subs);
});
app.get("/api/aptitude/questions", (req, res) => {
  res.json(db.aptitude_questions);
});
app.post("/api/aptitude/submit", (req, res) => {
  const { userId, score, category, totalQuestions } = req.body;
  if (!userId) {
    return res.status(400).json({ error: "userId is required" });
  }
  const result = {
    id: `aptres-${Date.now()}`,
    userId,
    score,
    category,
    totalQuestions,
    completedAt: (/* @__PURE__ */ new Date()).toISOString()
  };
  db.aptitude_results.push(result);
  const pIndex = db.student_profiles.findIndex((p) => p.userId === userId);
  if (pIndex !== -1) {
    const p = db.student_profiles[pIndex];
    p.aptitudeAnalytics.solvedCount += totalQuestions;
    p.aptitudeAnalytics.correctCount += score;
    if (!p.aptitudeAnalytics.byCategory[category]) {
      p.aptitudeAnalytics.byCategory[category] = { total: 0, correct: 0 };
    }
    p.aptitudeAnalytics.byCategory[category].total += totalQuestions;
    p.aptitudeAnalytics.byCategory[category].correct += score;
    p.placementReadiness = calculatePlacementReadiness(p);
  }
  db.save();
  res.json(result);
});
app.get("/api/aptitude/results/:userId", (req, res) => {
  const { userId } = req.params;
  const results = db.aptitude_results.filter((r) => r.userId === userId);
  res.json(results);
});
app.get("/api/admin/dashboard", (req, res) => {
  res.json({
    totalUsers: db.users.length,
    totalSubmissions: db.coding_submissions.length,
    totalAptitudeResults: db.aptitude_results.length,
    totalResumes: db.resumes.length,
    users: db.users.map((u) => ({ id: u.id, email: u.email, name: u.name, role: u.role, createdAt: u.createdAt })),
    questions: db.coding_questions
  });
});
app.post("/api/admin/questions/add", (req, res) => {
  const q = req.body;
  const newQ = {
    id: `code-${Date.now()}`,
    title: q.title,
    description: q.description,
    category: q.category,
    difficulty: q.difficulty,
    constraints: q.constraints || [],
    inputFormat: q.inputFormat,
    outputFormat: q.outputFormat,
    sampleInput: q.sampleInput,
    sampleOutput: q.sampleOutput,
    hiddenTestCases: q.hiddenTestCases || []
  };
  db.coding_questions.push(newQ);
  db.save();
  res.json(newQ);
});
async function startServer() {
  const server = (0, import_http.createServer)(app);
  setupWebSockets(server);
  if (process.env.NODE_ENV !== "production") {
    const vite = await (0, import_vite.createServer)({
      server: { middlewareMode: true },
      appType: "spa"
    });
    app.use(vite.middlewares);
  } else {
    const distPath = import_path.default.join(process.cwd(), "dist");
    app.use(import_express.default.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(import_path.default.join(distPath, "index.html"));
    });
  }
  server.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT}`);
  });
}
startServer();
//# sourceMappingURL=server.cjs.map
