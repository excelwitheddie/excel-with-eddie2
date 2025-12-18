console.log("🔥 quiz.js loaded");

/* =========================================================
   Excel with Eddie – Quiz Engine (Stable Core)
   STEP 1: Full Question Banks Restored
   ========================================================= */

/* -----------------------------
   QUESTION BANK
----------------------------- */
const questionBank = {
  beginner: [
    {
      q: "Which symbol starts every Excel formula?",
      answers: ["#", "=", "$"],
      correct: 1,
      explanation: "All Excel formulas start with ="
    },
    {
      q: "What does SUM do?",
      answers: ["Adds numbers", "Counts cells", "Finds averages"],
      correct: 0,
      explanation: "SUM adds numeric values in a range."
    },
    {
      q: "Which cell reference is valid?",
      answers: ["1A", "A1", "AA0"],
      correct: 1,
      explanation: "Column letter followed by row number."
    },
    {
      q: "What shortcut saves a workbook?",
      answers: ["Ctrl + S", "Ctrl + P", "Ctrl + Z"],
      correct: 0,
      explanation: "Ctrl + S saves your file."
    },
    {
      q: "Which function finds the largest number?",
      answers: ["MAX", "MIN", "TOP"],
      correct: 0,
      explanation: "MAX returns the highest value."
    },
    {
      q: "What does Ctrl + Z do?",
      answers: ["Undo", "Redo", "Save"],
      correct: 0,
      explanation: "Ctrl + Z undoes the last action."
    },
    {
      q: "Which tool formats numbers as currency?",
      answers: ["Format Cells", "Sort", "Find"],
      correct: 0,
      explanation: "Format Cells controls number formatting."
    },
    {
      q: "Which function calculates an average?",
      answers: ["AVG", "AVERAGE", "MEAN"],
      correct: 1,
      explanation: "AVERAGE returns the mean."
    },
    {
      q: "What does COUNT count?",
      answers: ["Text cells", "Numeric cells", "Blank cells"],
      correct: 1,
      explanation: "COUNT counts numeric values only."
    },
    {
      q: "What is Excel mainly used for?",
      answers: ["Word processing", "Spreadsheets", "Email"],
      correct: 1,
      explanation: "Excel is a spreadsheet tool."
    }
  ],

  intermediate: [
    {
      q: "Which function adds values based on one condition?",
      answers: ["SUM", "SUMIF", "SUMIFS"],
      correct: 1,
      explanation: "SUMIF applies a single condition."
    },
    {
      q: "What does a PivotTable do?",
      answers: ["Formats cells", "Summarizes data", "Validates input"],
      correct: 1,
      explanation: "PivotTables summarize and analyze data."
    },
    {
      q: "Which function replaces VLOOKUP?",
      answers: ["INDEX", "MATCH", "XLOOKUP"],
      correct: 2,
      explanation: "XLOOKUP is the modern replacement."
    },
    {
      q: "What does $A$1 mean?",
      answers: ["Currency", "Absolute reference", "Text"],
      correct: 1,
      explanation: "It locks both row and column."
    },
    {
      q: "Which feature highlights values automatically?",
      answers: ["Conditional Formatting", "Filtering", "Validation"],
      correct: 0,
      explanation: "Conditional Formatting applies visual rules."
    },
    {
      q: "Which function counts with criteria?",
      answers: ["COUNT", "COUNTIF", "COUNTA"],
      correct: 1,
      explanation: "COUNTIF counts matching values."
    },
    {
      q: "What does MATCH return?",
      answers: ["Value", "Position", "Sum"],
      correct: 1,
      explanation: "MATCH returns the position."
    },
    {
      q: "Which function combines text?",
      answers: ["TEXTJOIN", "LEFT", "MID"],
      correct: 0,
      explanation: "TEXTJOIN combines text values."
    },
    {
      q: "What does SORT do?",
      answers: ["Filters data", "Orders data", "Removes duplicates"],
      correct: 1,
      explanation: "SORT orders data dynamically."
    },
    {
      q: "Which adds using multiple criteria?",
      answers: ["SUMIF", "SUMIFS", "COUNTIFS"],
      correct: 1,
      explanation: "SUMIFS supports multiple conditions."
    }
  ],

  advanced: [
    {
      q: "Which function returns a filtered dynamic array?",
      answers: ["FILTER", "SORT", "UNIQUE"],
      correct: 0,
      explanation: "FILTER spills rows meeting criteria."
    },
    {
      q: "What does INDEX + MATCH replace?",
      answers: ["SUMIF", "VLOOKUP", "COUNT"],
      correct: 1,
      explanation: "INDEX/MATCH replaces VLOOKUP."
    },
    {
      q: "Which function removes duplicates?",
      answers: ["UNIQUE", "FILTER", "SORT"],
      correct: 0,
      explanation: "UNIQUE returns distinct values."
    },
    {
      q: "What does SUMPRODUCT do?",
      answers: ["Adds ranges", "Multiplies then sums", "Counts values"],
      correct: 1,
      explanation: "SUMPRODUCT multiplies arrays then sums."
    },
    {
      q: "Which returns the last non-blank value?",
      answers: [
        "=LOOKUP(2,1/(A:A<>\"\"),A:A)",
        "=MAX(A:A)",
        "=COUNT(A:A)"
      ],
      correct: 0,
      explanation: "LOOKUP trick finds the last value."
    },
    {
      q: "What does XLOOKUP improve?",
      answers: ["Only speed", "Only syntax", "Flexibility"],
      correct: 2,
      explanation: "XLOOKUP works in any direction."
    },
    {
      q: "Which builds interactive dashboards?",
      answers: ["PivotTables + Slicers", "Goal Seek", "Solver"],
      correct: 0,
      explanation: "PivotTables with slicers drive dashboards."
    },
    {
      q: "What does IFERROR do?",
      answers: ["Stops errors", "Replaces errors", "Ignores blanks"],
      correct: 1,
      explanation: "IFERROR substitutes error results."
    },
    {
      q: "Which spills sorted unique values?",
      answers: ["SORT(UNIQUE())", "FILTER()", "COUNTIFS()"],
      correct: 0,
      explanation: "SORT + UNIQUE spills ordered values."
    },
    {
      q: "What does CHOOSECOLS do?",
      answers: ["Selects columns", "Hides columns", "Renames columns"],
      correct: 0,
      explanation: "CHOOSECOLS returns selected columns."
    }
  ]
};

/* -----------------------------
   QUIZ STATE
----------------------------- */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let difficulty = "";

/* -----------------------------
   START QUIZ
----------------------------- */
function startQuiz(level) {
  difficulty = level;
  currentIndex = 0;
  score = 0;

  currentSet = [...questionBank[level]]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* -----------------------------
   SHOW QUESTION
----------------------------- */
function showQuestion() {
  const q = currentSet[currentIndex];
  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers
      .map(
        (a, i) =>
          `<button class="answer-btn" onclick="submitAnswer(${i})">${a}</button>`
      )
      .join("")}
    <p id="explanation" class="explanation"></p>
  `;

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length}`;
}

/* -----------------------------
   ANSWER
----------------------------- */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  if (choice === q.correct) {
    score++;
    explanation.style.color = "#16a085";
    explanation.textContent = "Correct! " + q.explanation;
  } else {
    explanation.style.color = "#b00020";
    explanation.textContent = "Incorrect. " + q.explanation;
  }

  document.querySelectorAll(".answer-btn").forEach(b => (b.disabled = true));

  setTimeout(() => {
    currentIndex++;
    currentIndex < currentSet.length ? showQuestion() : showResults();
  }, 900);
}

/* -----------------------------
   RESULTS
----------------------------- */
function showResults() {
  document.getElementById("quizContainer").innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${currentSet.length}</h2>
      <h3>${score < 4 ? "Beginner" : score < 8 ? "Intermediate" : "Advanced"}</h3>
      <button class="quiz-btn" onclick="location.reload()">Try Again</button>
    </div>
  `;
}

/* -----------------------------
   GLOBAL EXPORTS
----------------------------- */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
