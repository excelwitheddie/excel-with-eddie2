console.log("🔥 quiz.js loaded");

/* =========================================================
   Excel with Eddie – Quiz Engine (STABLE)
   Full Questions Restored
   ========================================================= */

/* =========================
   QUESTION BANK
========================= */
const questionBank = {
  beginner: [
    {
      q: "Which symbol starts every Excel formula?",
      answers: ["#", "=", "$"],
      correct: 1,
      explanation: "All Excel formulas start with an equals sign (=)."
    },
    {
      q: "What does the SUM function do?",
      answers: ["Adds numbers", "Counts cells", "Finds averages"],
      correct: 0,
      explanation: "SUM adds numeric values in a range."
    },
    {
      q: "Which of these is a valid cell reference?",
      answers: ["1A", "A1", "AA0"],
      correct: 1,
      explanation: "Excel cell references use column letters followed by row numbers."
    },
    {
      q: "Which shortcut saves a workbook?",
      answers: ["Ctrl + S", "Ctrl + P", "Ctrl + Z"],
      correct: 0,
      explanation: "Ctrl + S saves your workbook."
    },
    {
      q: "Which function returns the largest value?",
      answers: ["MAX", "MIN", "TOP"],
      correct: 0,
      explanation: "MAX returns the largest number in a range."
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
      explanation: "AVERAGE returns the mean of values."
    },
    {
      q: "What does COUNT count?",
      answers: ["Text cells", "Numeric cells", "Blank cells"],
      correct: 1,
      explanation: "COUNT only counts numeric values."
    },
    {
      q: "Excel is primarily used for:",
      answers: ["Email", "Spreadsheets", "Presentations"],
      correct: 1,
      explanation: "Excel is a spreadsheet application."
    }
  ],

  intermediate: [
    {
      q: "Which function adds values based on one condition?",
      answers: ["SUM", "SUMIF", "SUMIFS"],
      correct: 1,
      explanation: "SUMIF adds values using a single condition."
    },
    {
      q: "What does a PivotTable do?",
      answers: ["Formats data", "Summarizes data", "Protects sheets"],
      correct: 1,
      explanation: "PivotTables summarize and analyze data."
    },
    {
      q: "Which function replaced VLOOKUP?",
      answers: ["INDEX", "MATCH", "XLOOKUP"],
      correct: 2,
      explanation: "XLOOKUP is the modern replacement for VLOOKUP."
    },
    {
      q: "What does $A$1 mean?",
      answers: ["Currency", "Absolute reference", "Text"],
      correct: 1,
      explanation: "$ locks both the row and column."
    },
    {
      q: "Which feature highlights values visually?",
      answers: ["Conditional Formatting", "Filtering", "Validation"],
      correct: 0,
      explanation: "Conditional Formatting applies visual rules."
    },
    {
      q: "Which function counts cells that meet a condition?",
      answers: ["COUNT", "COUNTIF", "COUNTA"],
      correct: 1,
      explanation: "COUNTIF counts cells matching criteria."
    },
    {
      q: "What does MATCH return?",
      answers: ["A value", "A position", "A sum"],
      correct: 1,
      explanation: "MATCH returns the position of a value."
    },
    {
      q: "Which function combines text?",
      answers: ["TEXTJOIN", "LEFT", "MID"],
      correct: 0,
      explanation: "TEXTJOIN combines text values."
    },
    {
      q: "What does SORT do?",
      answers: ["Filters data", "Orders data", "Deletes data"],
      correct: 1,
      explanation: "SORT orders data dynamically."
    },
    {
      q: "Which function adds using multiple criteria?",
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
      explanation: "FILTER returns rows that meet criteria."
    },
    {
      q: "INDEX + MATCH replaces which function?",
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
      explanation: "SUMPRODUCT multiplies arrays then sums them."
    },
    {
      q: "Which returns the last non-blank value?",
      answers: [
        "=LOOKUP(2,1/(A:A<>\"\"),A:A)",
        "=MAX(A:A)",
        "=COUNT(A:A)"
      ],
      correct: 0,
      explanation: "This LOOKUP trick finds the last value."
    },
    {
      q: "What makes XLOOKUP better?",
      answers: ["Speed only", "Flexibility", "Shorter syntax"],
      correct: 1,
      explanation: "XLOOKUP works in any direction."
    },
    {
      q: "What builds interactive dashboards?",
      answers: ["PivotTables + Slicers", "Solver", "Goal Seek"],
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

/* =========================
   QUIZ STATE
========================= */
let currentSet = [];
let currentIndex = 0;
let score = 0;

/* =========================
   START QUIZ
========================= */
function startQuiz(level) {
  currentIndex = 0;
  score = 0;

  currentSet = [...questionBank[level]]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* =========================
   SHOW QUESTION
========================= */
function showQuestion() {
  const q = currentSet[currentIndex];
  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers
      .map((a, i) =>
        `<button class="quiz-btn answer-btn" onclick="submitAnswer(${i})">${a}</button>`
      )
      .join("")}
    <p id="explanation" class="explanation"></p>
  `;

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length}`;
}

/* =========================
   SUBMIT ANSWER
========================= */
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

  document.querySelectorAll(".answer-btn").forEach(b => b.disabled = true);

  setTimeout(() => {
    currentIndex++;
    currentIndex < currentSet.length ? showQuestion() : showResults();
  }, 900);
}

/* =========================
   RESULTS
========================= */
function showResults() {
  document.getElementById("quizContainer").innerHTML = `
    <div class="quiz-results">
      <h2>Your Score: ${score} / ${currentSet.length}</h2>
      <h3>
        ${score < 4 ? "Beginner" : score < 8 ? "Intermediate" : "Advanced"}
      </h3>
      <button class="quiz-btn" onclick="location.reload()">Try Again</button>
    </div>
  `;
}

/* =========================
   GLOBAL EXPORTS
========================= */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
