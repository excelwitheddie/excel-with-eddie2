const questions = [
  { 
    q: "1. What is the result of the formula: =IF(A1>10, \"High\", \"Low\") when A1 = 12?",
    answers: ["High", "Low", "Error"],
    correct: 0,
    explanation: "Since 12 > 10, the IF function returns 'High'."
  },

  { 
    q: "2. Which formula correctly checks if BOTH A1 > 10 AND B1 < 5?",
    answers: ["=IF(AND(A1>10, B1<5), \"True\", \"False\")", "=IF(OR(A1>10, B1<5), \"True\", \"False\")", "=AND(A1>10; B1<5)"],
    correct: 0,
    explanation: "AND requires both conditions to be true before returning TRUE."
  },

  { 
    q: "3. What does this formula return? =XLOOKUP(\"Apple\", A2:A6, B2:B6)",
    answers: ["The price or value of Apple from column B", "The row number of Apple", "TRUE or FALSE"],
    correct: 0,
    explanation: "XLOOKUP looks up a value in one column and returns the corresponding value from another."
  },

  { 
    q: "4. If C5 contains the formula =A5+B5, what type of reference is A5?",
    answers: ["Relative reference", "Absolute reference", "Mixed reference"],
    correct: 0,
    explanation: "A5 is relative because it adjusts when copied to other cells."
  },

  { 
    q: "5. Which formula counts ONLY cells where A1:A10 contains \"Yes\"?",
    answers: ["=COUNTIF(A1:A10, \"Yes\")", "=COUNT(A1:A10)", "=COUNTA(A1:A10)"],
    correct: 0,
    explanation: "COUNTIF applies a condition before counting."
  },

  { 
    q: "6. What does this formula return? =IF(OR(A1=\"Red\", A1=\"Blue\"), \"Match\", \"No Match\")",
    answers: ["Match", "No Match", "TRUE"],
    correct: 0,
    explanation: "OR returns TRUE if either condition is true."
  },

  { 
    q: "7. INDEX/MATCH is preferred over VLOOKUP because:",
    answers: [
      "It allows lookup to the left",
      "It is faster for small datasets",
      "It automatically creates charts"
    ],
    correct: 0,
    explanation: "INDEX/MATCH can lookup values in ANY direction, unlike VLOOKUP."
  },

  { 
    q: "8. Which formula extracts the first 3 characters from cell B2?",
    answers: ["=LEFT(B2, 3)", "=RIGHT(B2, 3)", "=MID(B2, 3)"],
    correct: 0,
    explanation: "LEFT returns characters from the start of a string."
  },

  { 
    q: "9. What is the result of: =IF(A1=\"Yes\", A2*0.1, 0) when A1=\"No\"?",
    answers: ["0", "A2*0.1", "Error"],
    correct: 0,
    explanation: "Since the condition is false, the IF function returns the 'false' value: 0."
  },

  { 
    q: "10. What does this formula do? =COUNTIFS(A1:A10, \">5\", B1:B10, \"<3\")",
    answers: [
      "Counts rows where A > 5 AND B < 3",
      "Adds values in A and B",
      "Counts all nonblank cells"
    ],
    correct: 0,
    explanation: "COUNTIFS applies multiple conditions before counting."
  }
];

// Shuffle questions
questions.sort(() => Math.random() - 0.5);
