import { CodingQuestion, AptitudeQuestion } from '../src/types';

// ==========================================
// 100 CODING QUESTIONS GENERATOR
// ==========================================
export function generateCodingQuestions(): CodingQuestion[] {
  const baseQuestions: CodingQuestion[] = [
    {
      id: 'code-1',
      title: 'Two Sum',
      description: 'Given an array of integers `nums` and an integer `target`, return indices of the two numbers such that they add up to `target`.\n\nYou may assume that each input would have exactly one solution, and you may not use the same element twice.',
      category: 'Arrays',
      difficulty: 'Easy',
      constraints: ['2 <= nums.length <= 10^4', '-10^9 <= nums[i] <= 10^9', '-10^9 <= target <= 10^9', 'Only one valid answer exists.'],
      inputFormat: 'The first line contains integers separated by spaces representing the elements of `nums`.\nThe second line contains a single integer representing `target`.',
      outputFormat: 'Return two indices in the form of a comma-separated string `[index1,index2]`.',
      sampleInput: '2 7 11 15\n9',
      sampleOutput: '0,1',
      hiddenTestCases: [
        { input: '3 2 4\n6', output: '1,2' },
        { input: '3 3\n6', output: '0,1' },
        { input: '1 5 10 20\n25', output: '1,3' }
      ]
    },
    {
      id: 'code-2',
      title: 'Valid Parentheses',
      description: 'Given a string `s` containing just the characters `(`, `)`, `{`, `}`, `[` and `]`, determine if the input string is valid.\n\nAn input string is valid if:\n1. Open brackets must be closed by the same type of brackets.\n2. Open brackets must be closed in the correct order.\n3. Every close bracket has a corresponding open bracket of the same type.',
      category: 'Stack',
      difficulty: 'Easy',
      constraints: ['1 <= s.length <= 10^4', 's consists of parentheses characters only.'],
      inputFormat: 'A single string `s`.',
      outputFormat: 'Return `true` if the string is valid, otherwise return `false`.',
      sampleInput: '()[]{}',
      sampleOutput: 'true',
      hiddenTestCases: [
        { input: '(', output: 'false' },
        { input: '(]', output: 'false' },
        { input: '{[]}', output: 'true' },
        { input: '(([]){})', output: 'true' }
      ]
    },
    {
      id: 'code-3',
      title: 'Longest Substring Without Repeating Characters',
      description: 'Given a string `s`, find the length of the longest substring without repeating characters.',
      category: 'Sliding Window',
      difficulty: 'Medium',
      constraints: ['0 <= s.length <= 5 * 10^4', 's consists of English letters, digits, symbols and spaces.'],
      inputFormat: 'A single string `s` on one line.',
      outputFormat: 'Return an integer representing the maximum length.',
      sampleInput: 'abcabcbb',
      sampleOutput: '3',
      hiddenTestCases: [
        { input: 'bbbbb', output: '1' },
        { input: 'pwwkew', output: '3' },
        { input: '', output: '0' },
        { input: 'abcdefg', output: '7' }
      ]
    },
    {
      id: 'code-4',
      title: 'Climbing Stairs',
      description: 'You are climbing a staircase. It takes `n` steps to reach the top.\n\nEach time you can either climb 1 or 2 steps. In how many distinct ways can you climb to the top?',
      category: 'Dynamic Programming',
      difficulty: 'Easy',
      constraints: ['1 <= n <= 45'],
      inputFormat: 'A single integer `n`.',
      outputFormat: 'An integer representing the number of distinct ways.',
      sampleInput: '2',
      sampleOutput: '2',
      hiddenTestCases: [
        { input: '1', output: '1' },
        { input: '3', output: '3' },
        { input: '4', output: '5' },
        { input: '5', output: '8' }
      ]
    },
    {
      id: 'code-5',
      title: 'Reverse String',
      description: 'Write a function that reverses a string. The input is given as an array of characters.',
      category: 'Strings',
      difficulty: 'Easy',
      constraints: ['1 <= s.length <= 10^5'],
      inputFormat: 'A single line containing characters separated by spaces.',
      outputFormat: 'A single string representing the reversed characters joined together.',
      sampleInput: 'h e l l o',
      sampleOutput: 'olleh',
      hiddenTestCases: [
        { input: 'H a n n a h', output: 'hannaH' },
        { input: 'a b c', output: 'cba' }
      ]
    },
    {
      id: 'code-6',
      title: 'Fibonacci Number',
      description: 'The Fibonacci numbers, commonly denoted `F(n)` form a sequence, called the Fibonacci sequence, such that each number is the sum of the two preceding ones, starting from 0 and 1.',
      category: 'Dynamic Programming',
      difficulty: 'Easy',
      constraints: ['0 <= n <= 30'],
      inputFormat: 'A single integer `n`.',
      outputFormat: 'An integer representing `F(n)`.',
      sampleInput: '4',
      sampleOutput: '3',
      hiddenTestCases: [
        { input: '0', output: '0' },
        { input: '1', output: '1' },
        { input: '2', output: '1' },
        { input: '3', output: '2' },
        { input: '6', output: '8' }
      ]
    }
  ];

  const categories = ['Arrays', 'Strings', 'Maths', 'Stack', 'Dynamic Programming', 'Hash Tables', 'Searching', 'Trees', 'Graphs', 'Linked Lists'];
  const difficulties: ('Easy' | 'Medium' | 'Hard')[] = ['Easy', 'Medium', 'Hard'];

  const generated: CodingQuestion[] = [...baseQuestions];

  // Generate remaining up to 100 questions
  for (let i = baseQuestions.length + 1; i <= 100; i++) {
    const category = categories[i % categories.length];
    const difficulty = difficulties[i % difficulties.length];
    
    let title = '';
    let description = '';
    let constraints: string[] = [];
    let inputFormat = '';
    let outputFormat = '';
    let sampleInput = '';
    let sampleOutput = '';
    let hiddenTestCases: { input: string; output: string }[] = [];

    if (category === 'Arrays') {
      title = `Find Target Index ${i}`;
      description = `Given a sorted array of distinct integers and a target value, return the index if the target is found. If not, return the index where it would be if it were inserted in order.\n\nYou must write an algorithm with O(log n) runtime complexity.`;
      constraints = ['1 <= nums.length <= 10^4', '-10^4 <= nums[i] <= 10^4', 'nums contains distinct values sorted in ascending order.'];
      inputFormat = 'First line contains space-separated sorted integers. Second line contains the target.';
      outputFormat = 'An integer representing the index.';
      sampleInput = '1 3 5 6\n5';
      sampleOutput = '2';
      hiddenTestCases = [
        { input: '1 3 5 6\n2', output: '1' },
        { input: '1 3 5 6\n7', output: '4' },
        { input: '1 3 5 6\n0', output: '0' }
      ];
    } else if (category === 'Strings') {
      title = `Unique Character Search ${i}`;
      description = `Given a string s, find the first non-repeating character in it and return its index. If it does not exist, return -1.`;
      constraints = ['1 <= s.length <= 10^5', 's consists of lowercase English letters only.'];
      inputFormat = 'A single line containing the string s.';
      outputFormat = 'An integer representing the first unique character index or -1.';
      sampleInput = 'leetcode';
      sampleOutput = '0';
      hiddenTestCases = [
        { input: 'loveleetcode', output: '2' },
        { input: 'aabb', output: '-1' },
        { input: 'abcabc', output: '-1' }
      ];
    } else if (category === 'Maths') {
      title = `Power Of Sum ${i}`;
      description = `Given an integer n, return true if it is a power of three. Otherwise, return false.\nAn integer n is a power of three, if there exists an integer x such that n == 3^x.`;
      constraints = ['-2^31 <= n <= 2^31 - 1'];
      inputFormat = 'A single integer n.';
      outputFormat = 'Return true or false as a string.';
      sampleInput = '27';
      sampleOutput = 'true';
      hiddenTestCases = [
        { input: '0', output: 'false' },
        { input: '9', output: 'true' },
        { input: '45', output: 'false' }
      ];
    } else if (category === 'Stack') {
      title = `Backspace String Compare ${i}`;
      description = `Given two strings s and t, return true if they are equal when both are typed into empty text editors. '#' means a backspace character.\n\nNote that after backspacing an empty text, the text will continue empty.`;
      constraints = ['1 <= s.length, t.length <= 200', 's and t only contain lowercase letters and "#" characters.'];
      inputFormat = 'First line contains s, second line contains t.';
      outputFormat = 'Return true or false.';
      sampleInput = 'ab#c\nad#c';
      sampleOutput = 'true';
      hiddenTestCases = [
        { input: 'ab##\nc#d#', output: 'true' },
        { input: 'a#c\nb', output: 'false' }
      ];
    } else if (category === 'Dynamic Programming') {
      title = `Maximum Subarray Sum ${i}`;
      description = `Given an integer array nums, find the subarray with the largest sum and return its sum.`;
      constraints = ['1 <= nums.length <= 10^5', '-10^4 <= nums[i] <= 10^4'];
      inputFormat = 'Space separated integers.';
      outputFormat = 'An integer representing the maximum sum.';
      sampleInput = '-2 1 -3 4 -1 2 1 -5 4';
      sampleOutput = '6';
      hiddenTestCases = [
        { input: '1', output: '1' },
        { input: '5 4 -1 7 8', output: '23' }
      ];
    } else if (category === 'Hash Tables') {
      title = `Contains Duplicate ${i}`;
      description = `Given an integer array nums, return true if any value appears at least twice in the array, and return false if every element is distinct.`;
      constraints = ['1 <= nums.length <= 10^5', '-10^9 <= nums[i] <= 10^9'];
      inputFormat = 'Space separated integers.';
      outputFormat = 'Return true or false.';
      sampleInput = '1 2 3 1';
      sampleOutput = 'true';
      hiddenTestCases = [
        { input: '1 2 3 4', output: 'false' },
        { input: '1 1 1 3 3 4 3 2 4 2', output: 'true' }
      ];
    } else if (category === 'Searching') {
      title = `Binary Search Target ${i}`;
      description = `Given an array of integers nums which is sorted in ascending order, and an integer target, write a function to search target in nums. If target exists, then return its index. Otherwise, return -1.`;
      constraints = ['1 <= nums.length <= 10^4', '-10^4 < nums[i], target < 10^4'];
      inputFormat = 'First line: sorted integers. Second line: target.';
      outputFormat = 'Index or -1.';
      sampleInput = '-1 0 3 5 9 12\n9';
      sampleOutput = '4';
      hiddenTestCases = [
        { input: '-1 0 3 5 9 12\n2', output: '-1' },
        { input: '5\n5', output: '0' }
      ];
    } else {
      title = `Problem Solver Module ${i}`;
      description = `Design an algorithm to find if a sum exists in the given series for value ${i * 10}.`;
      constraints = ['1 <= elements <= 1000'];
      inputFormat = 'A set of integers.';
      outputFormat = 'true or false';
      sampleInput = '10 20 30 40';
      sampleOutput = 'true';
      hiddenTestCases = [
        { input: '1 2 3', output: 'false' }
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

// ==========================================
// 1000 APTITUDE QUESTIONS GENERATOR
// ==========================================
export function generateAptitudeQuestions(): AptitudeQuestion[] {
  const list: AptitudeQuestion[] = [];

  // Define categories and types
  const quantitativeTypes = [
    'Time & Speed',
    'Average',
    'Percentage',
    'Ratio & Proportion',
    'Work & Time',
    'Profit & Loss',
    'Simple & Compound Interest',
    'Ages',
    'Probability & Permutations',
    'Trains & Boats'
  ];

  const logicalTypes = [
    'Clocks & Calendar',
    'Blood Relations',
    'Number Series & Puzzles',
    'Syllogisms & Analogies'
  ];

  const verbalTypes = [
    'Synonyms & Vocabulary',
    'Grammar & Sentence Correction',
    'Reading Comprehension'
  ];

  // We want to generate exactly 1000 questions
  // Quantitative: 450 questions
  // Logical: 350 questions
  // Verbal: 200 questions

  let idCounter = 1;

  // 1. GENERATE QUANTITATIVE (450 questions)
  for (let i = 0; i < 450; i++) {
    const subcat = quantitativeTypes[i % quantitativeTypes.length];
    const diffVal = i % 3;
    const difficulty = diffVal === 0 ? 'Easy' : diffVal === 1 ? 'Medium' : 'Hard';

    let question = '';
    let options: string[] = [];
    let correctAnswer = 'A';
    let explanation = '';

    // Parameters
    const val1 = 10 + (i % 25) * 5; // e.g., 10 to 130
    const val2 = 5 + (i % 15) * 3;  // e.g., 5 to 47
    const val3 = 100 + (i % 10) * 100; // e.g., 100 to 1000

    switch (subcat) {
      case 'Time & Speed': {
        const speedKmh = 36 + (i % 10) * 9; // 36 to 117 km/hr
        const trainLength = 100 + (i % 5) * 50; // 100 to 300 m
        const timeSecs = Math.round((trainLength / (speedKmh * 5 / 18)) * 10) / 10;
        question = `A train of length ${trainLength} meters crosses a utility pole in how many seconds if its constant speed is ${speedKmh} km/hr?`;
        options = [
          `${timeSecs} seconds`,
          `${Math.round((timeSecs + 2.5) * 10) / 10} seconds`,
          `${Math.round((timeSecs - 1.8) * 10) / 10} seconds`,
          `${Math.round((timeSecs * 1.5) * 10) / 10} seconds`
        ];
        correctAnswer = 'A';
        explanation = `To calculate the crossing time, we convert the speed from km/hr to m/s:\nSpeed in m/s = Speed in km/hr * (5 / 18)\nSpeed = ${speedKmh} * (5 / 18) = ${Math.round((speedKmh * 5 / 18) * 100) / 100} m/s.\nTime taken = Train Length / Speed\nTime = ${trainLength} / ${Math.round((speedKmh * 5 / 18) * 100) / 100} = ${timeSecs} seconds.`;
        break;
      }
      case 'Average': {
        const count = 10 + (i % 20); // 10 to 29
        const initialAvg = 20 + (i % 15); // 20 to 34
        const weightAdded = 40 + (i % 30); // 40 to 69
        const newTotal = (count * initialAvg) + weightAdded;
        const newAvg = Math.round((newTotal / (count + 1)) * 100) / 100;
        question = `The average age of a group of ${count} students is ${initialAvg} years. If a teacher of age ${weightAdded} years joins the group, what is the new average age?`;
        options = [
          `${newAvg - 1.5} years`,
          `${newAvg} years`,
          `${newAvg + 1.2} years`,
          `${newAvg + 2.0} years`
        ];
        correctAnswer = 'B';
        explanation = `Sum of ages of ${count} students = ${count} * ${initialAvg} = ${count * initialAvg} years.\nWith the teacher added, the total sum of ages = ${count * initialAvg} + ${weightAdded} = ${newTotal} years.\nTotal count of people = ${count} + 1 = ${count + 1}.\nNew Average Age = Total Sum / Total Count = ${newTotal} / ${count + 1} = ${newAvg} years.`;
        break;
      }
      case 'Percentage': {
        const initial = 200 + (i % 10) * 100; // 200 to 1100
        const pct = 10 + (i % 5) * 5; // 10% to 30%
        const finalVal = Math.round(initial * (1 - pct / 100));
        question = `The price of an online coding course is $${initial}. During a festive placement campaign, the course is offered at a discount of ${pct}%. What is the sale price?`;
        options = [
          `$${finalVal + 25}`,
          `$${finalVal - 15}`,
          `$${finalVal}`,
          `$${Math.round(initial * (1 - (pct - 5) / 100))}`
        ];
        correctAnswer = 'C';
        explanation = `Discount amount = Original Price * (Discount Percentage / 100)\nDiscount = $${initial} * (${pct} / 100) = $${initial * pct / 100}.\nSale Price = Original Price - Discount\nSale Price = $${initial} - $${initial * pct / 100} = $${finalVal}.`;
        break;
      }
      case 'Ratio & Proportion': {
        const totalAmount = 500 + (i % 10) * 250; // 500 to 2750
        const r1 = 2 + (i % 3);
        const r2 = 3 + (i % 3);
        const r3 = 5 + (i % 3);
        const sumR = r1 + r2 + r3;
        const bShare = Math.round((totalAmount * r2 / sumR) * 100) / 100;
        question = `A total budget of $${totalAmount} is shared among three departments A, B, and C in the ratio ${r1}:${r2}:${r3}. What is the share of department B?`;
        options = [
          `$${bShare - 20}`,
          `$${bShare + 50}`,
          `$${bShare + 10}`,
          `$${bShare}`
        ];
        correctAnswer = 'D';
        explanation = `Sum of ratios = ${r1} + ${r2} + ${r3} = ${sumR}.\nShare of Department B = (Ratio of B / Sum of ratios) * Total Budget\nShare of B = (${r2} / ${sumR}) * $${totalAmount} = $${bShare}.`;
        break;
      }
      case 'Work & Time': {
        const daysA = 10 + (i % 6) * 2; // 10 to 20
        const daysB = 15 + (i % 6) * 3; // 15 to 30
        const jointDays = Math.round(((daysA * daysB) / (daysA + daysB)) * 100) / 100;
        question = `If Developer A can build a project in ${daysA} days and Developer B can build the same project in ${daysB} days, how many days will they take to complete it working together?`;
        options = [
          `${jointDays} days`,
          `${Math.round((jointDays + 1.5) * 10) / 10} days`,
          `${Math.round((jointDays - 1) * 10) / 10} days`,
          `${Math.round(jointDays * 1.3 * 10) / 10} days`
        ];
        correctAnswer = 'A';
        explanation = `1 day work of A = 1 / ${daysA}\n1 day work of B = 1 / ${daysB}\nCombined 1 day work of A and B = (1 / ${daysA}) + (1 / ${daysB}) = (${daysA} + ${daysB}) / (${daysA} * ${daysB}) = ${daysA + daysB} / ${daysA * daysB}.\nTotal days required = (${daysA} * ${daysB}) / (${daysA} + ${daysB}) = ${daysA * daysB} / ${daysA + daysB} = ${jointDays} days.`;
        break;
      }
      case 'Profit & Loss': {
        const cp = 120 + (i % 15) * 20; // 120 to 400
        const profitPct = 10 + (i % 5) * 5; // 10% to 30%
        const sp = cp * (1 + profitPct / 100);
        question = `A merchant purchases a hardware component for $${cp}. At what selling price should he list it to secure a ${profitPct}% profit?`;
        options = [
          `$${sp - 10}`,
          `$${sp}`,
          `$${sp + 15}`,
          `$${Math.round(cp * 1.05)}`
        ];
        correctAnswer = 'B';
        explanation = `Profit amount = Cost Price * (Profit % / 100) = $${cp} * (${profitPct} / 100) = $${cp * profitPct / 100}.\nSelling Price = Cost Price + Profit = $${cp} + $${cp * profitPct / 100} = $${sp}.`;
        break;
      }
      case 'Simple & Compound Interest': {
        const principal = 1000 + (i % 10) * 1000; // 1000 to 10000
        const rate = 5 + (i % 5); // 5% to 9%
        const time = 2 + (i % 3); // 2 to 4 years
        const si = (principal * rate * time) / 100;
        question = `Find the Simple Interest accumulated on a principal sum of $${principal} invested at ${rate}% per annum for ${time} years.`;
        options = [
          `$${si - 50}`,
          `$${si + 100}`,
          `$${si}`,
          `$${si * 1.15}`
        ];
        correctAnswer = 'C';
        explanation = `Formula for Simple Interest:\nSI = (Principal * Rate * Time) / 100\nSI = (${principal} * ${rate} * ${time}) / 100 = $${si}.`;
        break;
      }
      case 'Ages': {
        const ratioSum = 5 + (i % 5) * 2; // 5 to 13
        const ageMultiplier = 3 + (i % 4); // 3 to 6
        const ageA = (ratioSum - 2) * ageMultiplier;
        const ageB = 2 * ageMultiplier;
        const yearsDiff = 5 + (i % 5);
        question = `The present ages of A and B are in the ratio of ${ratioSum - 2}:2. ${yearsDiff} years ago, the sum of their ages was ${ageA + ageB - (2 * yearsDiff)} years. What is the present age of A?`;
        options = [
          `${ageA - 4} years`,
          `${ageA + 6} years`,
          `${ageA} years`,
          `${ageA + 10} years`
        ];
        correctAnswer = 'C';
        explanation = `Let the present ages of A and B be ${ratioSum - 2}x and 2x.\nSum of present ages = ${(ratioSum - 2) + 2}x = ${ratioSum}x.\n${yearsDiff} years ago, the sum was ${ratioSum}x - (2 * ${yearsDiff}) = ${ageA + ageB - (2 * yearsDiff)}.\n${ratioSum}x - ${2 * yearsDiff} = ${ageA + ageB - (2 * yearsDiff)}\n${ratioSum}x = ${ageA + ageB}\nx = ${ageMultiplier}.\nPresent age of A = ${ratioSum - 2} * ${ageMultiplier} = ${ageA} years.`;
        break;
      }
      case 'Probability & Permutations': {
        const items = ['CODE', 'PI', 'TECH', 'JAVA', 'NODE', 'HTML', 'REACT', 'RUST', 'CLAW', 'CRAFT'];
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
        correctAnswer = 'C';
        explanation = `The word '${word}' contains ${uniqueLetters} distinct letters.\nThe number of ways to arrange '${word}' is given by ${uniqueLetters}! (factorial of ${uniqueLetters}).\n${uniqueLetters}! = ${Array.from({length: uniqueLetters}, (_, index) => index + 1).join(' * ')} = ${fact} ways.`;
        break;
      }
      default: {
        const speedUpstream = 8 + (i % 5); // 8 to 12
        const speedDownstream = 14 + (i % 5); // 14 to 18
        const boatSpeed = (speedDownstream + speedUpstream) / 2;
        question = `A boat goes ${speedDownstream} km/hr downstream and ${speedUpstream} km/hr upstream. What is the speed of the boat in still water?`;
        options = [
          `${boatSpeed - 1} km/hr`,
          `${boatSpeed + 1.5} km/hr`,
          `${boatSpeed} km/hr`,
          `${boatSpeed * 1.2} km/hr`
        ];
        correctAnswer = 'C';
        explanation = `Speed in still water = (Downstream Speed + Upstream Speed) / 2\nSpeed = (${speedDownstream} + ${speedUpstream}) / 2 = ${boatSpeed} km/hr.`;
        break;
      }
    }

    list.push({
      id: `apt-${idCounter++}`,
      question,
      category: 'Quantitative',
      subcategory: subcat,
      options,
      correctAnswer,
      explanation,
      difficulty
    });
  }

  // 2. GENERATE LOGICAL (350 questions)
  for (let i = 0; i < 350; i++) {
    const subcat = logicalTypes[i % logicalTypes.length];
    const diffVal = i % 3;
    const difficulty = diffVal === 0 ? 'Easy' : diffVal === 1 ? 'Medium' : 'Hard';

    let question = '';
    let options: string[] = [];
    let correctAnswer = 'B';
    let explanation = '';

    switch (subcat) {
      case 'Clocks & Calendar': {
        const hour = 1 + (i % 12);
        const minute = (i % 12) * 5; // 0, 5, 10, ... 55
        const angle = Math.abs(30 * hour - 5.5 * minute);
        const finalAngle = angle > 180 ? 360 - angle : angle;
        question = `What is the angle between the hour hand and the minute hand of an accurate clock at exactly ${hour}:${minute < 10 ? '0' : ''}${minute}?`;
        options = [
          `${Math.max(0, finalAngle - 15)}°`,
          `${finalAngle}°`,
          `${finalAngle + 12.5}°`,
          `${finalAngle * 1.5}°`
        ];
        correctAnswer = 'B';
        explanation = `The angle between hands is given by the formula:\nAngle = |30 * Hour - 5.5 * Minute|\nAngle = |30 * ${hour} - 5.5 * ${minute}| = |${30 * hour} - ${5.5 * minute}| = ${angle}°.\nIf the angle exceeds 180°, we subtract it from 360°: 360° - ${angle}° = ${finalAngle}°.`;
        break;
      }
      case 'Blood Relations': {
        const maleNames = ['James', 'David', 'Robert', 'Michael', 'William', 'Richard'];
        const femaleNames = ['Emma', 'Olivia', 'Sophia', 'Isabella', 'Ava', 'Mia'];
        const mName = maleNames[i % maleNames.length];
        const fName = femaleNames[i % femaleNames.length];
        question = `Pointing to a photograph, ${mName} said, "I do not have any siblings, but this person's father is my father's son." Whose photograph was ${mName} referring to?`;
        options = [
          `His father's photograph`,
          `His son's photograph`,
          `His nephew's photograph`,
          `His own photograph`
        ];
        correctAnswer = 'B';
        explanation = `Since ${mName} has no brothers or sisters, "my father's son" must be ${mName} himself.\nTherefore, the statement "this person's father is my father's son" simplifies to "this person's father is ${mName}".\nThis means the photograph is of ${mName}'s son.`;
        break;
      }
      case 'Number Series & Puzzles': {
        const start = 2 + (i % 10);
        const diff = 3 + (i % 5);
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
        correctAnswer = 'B';
        explanation = `The given sequence is an arithmetic progression with a common difference of ${diff}.\nTerm 1 = ${term1}\nTerm 2 = ${term1} + ${diff} = ${term2}\nTerm 3 = ${term2} + ${diff} = ${term3}\nTerm 4 = ${term3} + ${diff} = ${term4}\nMissing Term = Term 4 + ${diff} = ${term4} + ${diff} = ${term4 + diff}.`;
        break;
      }
      default: {
        question = `Statement 1: All developers are creative.\nStatement 2: All creative minds write code.\nConclusion: Therefore, all developers write code. Is this reasoning valid?`;
        options = [
          `Invalid deduction`,
          `Valid deduction`,
          `Partially valid under conditions`,
          `Insufficient premise parameters`
        ];
        correctAnswer = 'B';
        explanation = `Using Venn diagrams or syllogism rules:\nLet D = Developers, C = Creative Minds, W = Code Writers.\nFrom Statement 1, D is a subset of C (D ⊆ C).\nFrom Statement 2, C is a subset of W (C ⊆ W).\nBy transitive property, D is a subset of W (D ⊆ W), meaning all developers write code.\nThus, the deduction is 100% valid.`;
        break;
      }
    }

    list.push({
      id: `apt-${idCounter++}`,
      question,
      category: 'Logical',
      subcategory: subcat,
      options,
      correctAnswer,
      explanation,
      difficulty
    });
  }

  // 3. GENERATE VERBAL (200 questions)
  const synonymsPool = [
    { word: 'ABANDON', options: ['Keep', 'Forsake', 'Retain', 'Cherish'], ans: 'B', exp: 'Abandon means to cease to support or look after; desert or forsake. "Forsake" is the closest synonym.' },
    { word: 'BRIEF', options: ['Long', 'Short', 'Detailed', 'Verbose'], ans: 'B', exp: 'Brief means of short duration. "Short" is the direct synonym.' },
    { word: 'CANDID', options: ['Vague', 'Frank', 'Devious', 'Insincere'], ans: 'B', exp: 'Candid means truthful and straightforward; frank. Hence, "Frank" is the closest synonym.' },
    { word: 'DILIGENT', options: ['Lazy', 'Hard-working', 'Careless', 'Indifferent'], ans: 'B', exp: 'Diligent means showing care and conscientiousness in one\'s work. "Hard-working" is the direct synonym.' },
    { word: 'EAGER', options: ['Apathetic', 'Enthusiastic', 'Reluctant', 'Uninterested'], ans: 'B', exp: 'Eager means strongly wanting to do or have something. "Enthusiastic" is the closest synonym.' },
    { word: 'GENEROUS', options: ['Selfish', 'Benevolent', 'Stingy', 'Greedy'], ans: 'B', exp: 'Generous means showing a readiness to give more of something. "Benevolent" is the closest synonym.' },
    { word: 'HOSTILE', options: ['Friendly', 'Unfriendly', 'Amicable', 'Welcoming'], ans: 'B', exp: 'Hostile means showing or feeling opposition or dislike; unfriendly. "Unfriendly" is the correct synonym.' },
    { word: 'IMPARTIAL', options: ['Biased', 'Unbiased', 'Prejudiced', 'Unfair'], ans: 'B', exp: 'Impartial means treating all rivals or disputants equally; fair and unbiased. "Unbiased" is the synonym.' },
    { word: 'MUTUAL', options: ['One-sided', 'Reciprocal', 'Separate', 'Individual'], ans: 'B', exp: 'Mutual means experienced or done by each of two or more parties toward the other. "Reciprocal" is the synonym.' },
    { word: 'OBVIOUS', options: ['Hidden', 'Clear', 'Obscure', 'Ambiguous'], ans: 'B', exp: 'Obvious means easily perceived or understood; clear. "Clear" is the direct synonym.' }
  ];

  for (let i = 0; i < 200; i++) {
    const subcat = verbalTypes[i % verbalTypes.length];
    const diffVal = i % 3;
    const difficulty = diffVal === 0 ? 'Easy' : diffVal === 1 ? 'Medium' : 'Hard';

    let question = '';
    let options: string[] = [];
    let correctAnswer = 'B';
    let explanation = '';

    switch (subcat) {
      case 'Synonyms & Vocabulary': {
        const item = synonymsPool[i % synonymsPool.length];
        question = `Choose the correct synonym of the word: ${item.word}`;
        options = item.options;
        correctAnswer = item.ans;
        explanation = item.exp;
        break;
      }
      case 'Grammar & Sentence Correction': {
        question = `Identify the grammatically correct sentence from the options below relating to placement applications:`;
        options = [
          `Each of the candidates have submitted their profile logs.`,
          `Each of the candidates has submitted his or her profile log.`,
          `Each of the candidate has submitted their profile log.`,
          `Each of the candidates have submitted his profile log.`
        ];
        correctAnswer = 'B';
        explanation = `"Each" is a singular distributive pronoun. It must take a singular verb ("has") and singular possessive markers ("his or her") to ensure correct numerical agreement.`;
        break;
      }
      default: {
        question = `Read the passage: "A robust technical candidate must not only possess coding prowess but also develop key communication skills to pitch architectural solutions during system design rounds."\nWhat is the primary theme of the passage?`;
        options = [
          `Coding skills are the sole metric for recruitment success.`,
          `Successful tech candidates combine algorithmic prowess with communication.`,
          `System design rounds do not require technical expertise.`,
          `Only communication skills are evaluated during architectural rounds.`
        ];
        correctAnswer = 'B';
        explanation = `The passage explicitly highlights that a candidate needs both "coding prowess" and "communication skills to pitch architectural solutions", making option B the most comprehensive theme.`;
        break;
      }
    }

    list.push({
      id: `apt-${idCounter++}`,
      question,
      category: 'Verbal',
      subcategory: subcat,
      options,
      correctAnswer,
      explanation,
      difficulty
    });
  }

  return list;
}
