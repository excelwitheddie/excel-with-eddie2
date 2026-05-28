console.log("🔥 quiz.js loaded");

/* =========================================================
   Excel with Eddie – Quiz Engine (PRODUCTION STABLE)
   ========================================================= */

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxmQfZlU0KoANoGpvUt-R5nRUH3D095rf_qnpR_v6rjwYv5rTE3vSSN37X6Aas4Gq5G/exec";

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
      explanation: "MAX returns the largest number."
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
      explanation: "SUMIF applies one condition."
    },
    {
      q: "What does a PivotTable do?",
      answers: ["Formats data", "Summarizes data", "Protects sheets"],
      correct: 1,
      explanation: "PivotTables summarize data."
    },
    {
      q: "Which function replaced VLOOKUP?",
      answers: ["INDEX", "MATCH", "XLOOKUP"],
      correct: 2,
      explanation: "XLOOKUP is the modern replacement."
    },
    {
      q: "What does $A$1 mean?",
      answers: ["Currency", "Absolute reference", "Text"],
      correct: 1,
      explanation: "$ locks both row and column."
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
      explanation: "COUNTIF counts matching cells."
    },
    {
      q: "What does MATCH return?",
      answers: ["A value", "A position", "A sum"],
      correct: 1,
      explanation: "MATCH returns a position."
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
      explanation: "FILTER returns rows meeting criteria."
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
      explanation: "Classic LOOKUP trick."
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
      explanation: "PivotTables with slicers."
    },
    {
      q: "What does IFERROR do?",
      answers: ["Stops errors", "Replaces errors", "Ignores blanks"],
      correct: 1,
      explanation: "IFERROR replaces error results."
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
  ],
   const wizardQuestions = [

{
  question: "You need to return the last matching value for CustomerID in column A, with results in column D. Which formula is the most direct modern approach?",
  options: [
    '=LOOKUP(2,1/(A:A=F2),D:D)',
    '=XLOOKUP(F2,A:A,D:D,,0,-1)',
    '=INDEX(D:D,MATCH(F2,A:A,0))',
    '=FILTER(D:D,A:A=F2)'
  ],
  answer: 1
},

{
  question: "Which formula returns only the unique values that appear exactly once in A2:A100?",
  options: [
    '=UNIQUE(A2:A100)',
    '=UNIQUE(A2:A100,,TRUE)',
    '=FILTER(A2:A100,COUNTIF(A2:A100,A2:A100)=1)',
    '=SORT(UNIQUE(A2:A100))'
  ],
  answer: 1
},

{
  question: "In Power Query, which step is most likely to cause refresh failure when a source column is renamed?",
  options: [
    "Filtered Rows",
    "Changed Type",
    "Removed Blank Rows",
    "Sorted Rows"
  ],
  answer: 1
},

{
  question: "What does this formula return: =TAKE(SORTBY(A2:D20,D2:D20,-1),3)?",
  options: [
    "The first 3 columns sorted by column D ascending",
    "The top 3 rows after sorting A2:D20 by D2:D20 descending",
    "The last 3 rows after filtering column D",
    "The top 3 values from D2:D20 only"
  ],
  answer: 1
},

{
  question: "Which function is most appropriate when you need to apply a LAMBDA to each row of a 2D array and return one result per row?",
  options: [
    "MAP",
    "REDUCE",
    "BYROW",
    "SCAN"
  ],
  answer: 2
},

{
  question: "Which formula best creates a case-sensitive count of how many times F2 appears in A2:A100?",
  options: [
    '=COUNTIF(A2:A100,F2)',
    '=SUM(--EXACT(A2:A100,F2))',
    '=COUNTIFS(A2:A100,F2)',
    '=SUMPRODUCT(A2:A100=F2)'
  ],
  answer: 1
},

{
  question: "Why can INDIRECT() cause serious performance and auditing problems in professional workbooks?",
  options: [
    "It cannot reference named ranges",
    "It is volatile and hides references as text, making dependency tracing harder",
    "It only works with closed workbooks",
    "It disables formula calculation"
  ],
  answer: 1
},

{
  question: "Which formula dynamically returns columns 1, 3, and 5 from A1:F100?",
  options: [
    '=CHOOSECOLS(A1:F100,1,3,5)',
    '=TAKE(A1:F100,,5)',
    '=INDEX(A1:F100,,{1,3,5})',
    '=FILTER(A1:F100,{1,0,1,0,1,0})'
  ],
  answer: 0
},

{
  question: "You have a spilled formula in A2. Which reference correctly points to the entire spilled range?",
  options: [
    "A2*",
    "A2#",
    "#A2",
    "SPILL(A2)"
  ],
  answer: 1
},

{
  question: "What is the main difference between REDUCE and SCAN?",
  options: [
    "REDUCE returns one final accumulated result; SCAN returns intermediate accumulated results",
    "REDUCE works only with numbers; SCAN works only with text",
    "REDUCE spills vertically; SCAN spills horizontally",
    "REDUCE requires Power Query; SCAN requires VBA"
  ],
  answer: 0
}

];
};

/* =========================
   QUIZ STATE
========================= */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let currentDifficulty = "";

/* =========================
   START QUIZ
========================= */
function startQuiz(level) {
  if (!questionBank[level]) return;

  currentDifficulty = level;
  currentIndex = 0;
  score = 0;

  currentSet = [...questionBank[level]]
    .sort(() => Math.random() - 0.5)
    .slice(0, 10);

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  updateProgress();
  showQuestion();
}

/* =========================
   PROGRESS
========================= */
function updateProgress() {
  const percent = (currentIndex / currentSet.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length}`;
}

/* =========================
   SHOW QUESTION
========================= */
function showQuestion() {
  const q = currentSet[currentIndex];
  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers.map(
      (a, i) =>
        `<button class="quiz-btn answer-btn" onclick="submitAnswer(${i})">${a}</button>`
    ).join("")}
    <p id="explanation" class="explanation"></p>
  `;

  updateProgress();
}

/* =========================
   SUBMIT ANSWER
========================= */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  const correct = choice === q.correct;
  if (correct) score++;

  explanation.textContent =
    (correct ? "Correct! " : "Incorrect. ") + q.explanation;
  explanation.style.color = correct ? "#16a085" : "#b00020";

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
  const total = currentSet.length;

  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  document.getElementById("quizContainer").innerHTML = `
    <div class="quiz-results">
      <h2>Your Score: ${score} / ${total}</h2>
      <h3>${calculateLevel(score, total)}</h3>
      <div id="quizChart" class="quiz-chart"></div>
      <button class="quiz-btn" onclick="location.reload()">Try Again</button>
    </div>
  `;

  sendResultsToGoogleSheets({
    score,
    totalQuestions: total,
    level: calculateLevel(score, total),
    difficulty: currentDifficulty,
    page: window.location.pathname
  });

  drawResultsChart(score, total);
}

/* =========================
   LEVEL
========================= */
function calculateLevel(score, total) {
  const pct = (score / total) * 100;
  if (pct < 40) return "📘 Beginner";
  if (pct < 75) return "📗 Intermediate";
  return "📕 Advanced";
}

/* =========================
   GOOGLE SHEETS
========================= */
function sendResultsToGoogleSheets(data) {
  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
    mode: "no-cors"
  });
}

/* =========================
   GOOGLE CHARTS
========================= */
google.charts.load("current", { packages: ["corechart"] });

function drawResultsChart(correct, total) {
  google.charts.setOnLoadCallback(() => {
    const data = google.visualization.arrayToDataTable([
      ["Result", "Count"],
      ["Correct", correct],
      ["Incorrect", total - correct]
    ]);

    const chart = new google.visualization.PieChart(
      document.getElementById("quizChart")
    );

    chart.draw(data, {
      pieHole: 0.45,
      legend: { position: "bottom" }
    });
  });
}

/* =========================
   GLOBAL EXPORTS
========================= */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
