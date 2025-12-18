console.log("🔥 quiz.js loaded");

/* ===============================
   CONFIG
================================ */
const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ===============================
   QUESTION BANK
================================ */
const questionBank = {
  beginner: [
    { q: "What does SUM do?", answers: ["Adds numbers", "Counts cells", "Formats text"], correct: 0 },
    { q: "Which symbol starts a formula?", answers: ["#", "=", "$"], correct: 1 },
    { q: "Which function counts numbers?", answers: ["COUNT", "COUNTA", "COUNTBLANK"], correct: 0 },
    { q: "Valid cell reference?", answers: ["1A", "A1", "AA0"], correct: 1 },
    { q: "Shortcut to save?", answers: ["Ctrl+S", "Ctrl+P", "Ctrl+Z"], correct: 0 },
    { q: "Which chart is built-in?", answers: ["Bar", "Flowchart", "Network"], correct: 0 },
    { q: "What does MAX return?", answers: ["Largest value", "Smallest value", "Average"], correct: 0 },
    { q: "What does Ctrl+Z do?", answers: ["Undo", "Redo", "Save"], correct: 0 },
    { q: "AVERAGE does what?", answers: ["Mean", "Median", "Mode"], correct: 0 },
    { q: "Which formats currency?", answers: ["Format Cells", "Sort", "Filter"], correct: 0 }
  ],

  intermediate: [
    { q: "What does SUMIF do?", answers: ["Adds with condition", "Counts text", "Sorts data"], correct: 0 },
    { q: "COUNTIF does what?", answers: ["Counts with condition", "Adds values", "Finds max"], correct: 0 },
    { q: "PivotTables are used to?", answers: ["Summarize data", "Format cells", "Lock sheets"], correct: 0 },
    { q: "VLOOKUP requires?", answers: ["Lookup column on left", "Sorted data", "Named ranges"], correct: 0 },
    { q: "Modern replacement for VLOOKUP?", answers: ["HLOOKUP", "INDEX", "XLOOKUP"], correct: 2 },
    { q: "$A$1 means?", answers: ["Absolute reference", "Currency", "Error"], correct: 0 },
    { q: "MATCH returns?", answers: ["Position", "Value", "Sum"], correct: 0 },
    { q: "TEXTJOIN does what?", answers: ["Combines text", "Splits text", "Formats dates"], correct: 0 },
    { q: "SUMIFS is for?", answers: ["Multiple conditions", "One condition", "Text"], correct: 0 },
    { q: "Conditional Formatting?", answers: ["Visual rules", "Data protection", "Sorting"], correct: 0 }
  ],

  advanced: [
    { q: "=IF(A1>10,B1,0) does what?", answers: ["Conditional return", "Lookup", "Sum"], correct: 0 },
    { q: "INDEX/MATCH combo?", answers: ["Flexible lookup", "Formatting", "Counting"], correct: 0 },
    { q: "XLOOKUP can?", answers: ["Look any direction", "Only left", "Only right"], correct: 0 },
    { q: "AND(A1>5,A1<10) checks?", answers: ["Multiple conditions", "Text", "Errors"], correct: 0 },
    { q: "SUMPRODUCT does?", answers: ["Row math + sum", "Sorts data", "Filters rows"], correct: 0 },
    { q: "IFERROR is used to?", answers: ["Catch errors", "Format cells", "Sort data"], correct: 0 },
    { q: "FILTER returns?", answers: ["Dynamic subset", "Static list", "Counts"], correct: 0 },
    { q: "UNIQUE does?", answers: ["Removes duplicates", "Counts rows", "Sorts"], correct: 0 },
    { q: "Last non-blank formula?", answers: ["LOOKUP trick", "MAX", "SUM"], correct: 0 },
    { q: "Dashboards use?", answers: ["PivotTables + slicers", "Spell check", "Goal seek"], correct: 0 }
  ]
};

/* ===============================
   STATE
================================ */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let difficulty = "";

/* ===============================
   INIT
================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll("[data-difficulty]").forEach(btn => {
    btn.addEventListener("click", () => {
      startQuiz(btn.dataset.difficulty);
    });
  });
});

/* ===============================
   CORE FUNCTIONS
================================ */
function startQuiz(level) {
  difficulty = level;
  score = 0;
  currentIndex = 0;

  currentSet = shuffle([...questionBank[level]]).slice(0, 10);

  document.getElementById("progressWrapper").hidden = false;
  document.getElementById("questionCounter").hidden = false;

  showQuestion();
}

function showQuestion() {
  const q = currentSet[currentIndex];
  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers.map((a,i)=>`<button class="answer-btn" data-i="${i}">${a}</button>`).join("")}
    <p id="feedback"></p>
    <div class="quiz-nav"></div>
  `;

  updateProgress();

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => handleAnswer(+btn.dataset.i));
  });
}

function handleAnswer(choice) {
  const q = currentSet[currentIndex];
  const feedback = document.getElementById("feedback");
  const nav = document.querySelector(".quiz-nav");

  if (choice === q.correct) {
    score++;
    feedback.textContent = "Correct!";
    feedback.style.color = "#009a63";
  } else {
    feedback.textContent = "Incorrect.";
    feedback.style.color = "#b00020";
  }

  nav.innerHTML = `
    <button class="quiz-btn" id="nextBtn">Next</button>
    <button class="quiz-btn" id="quitBtn" style="background:#b00020;">Quit</button>
  `;

  document.getElementById("nextBtn").onclick = nextQuestion;
  document.getElementById("quitBtn").onclick = showResults;
}

function nextQuestion() {
  currentIndex++;
  currentIndex < currentSet.length ? showQuestion() : showResults();
}

function showResults() {
  const container = document.getElementById("quizContainer");
  const total = currentSet.length;

  sendResults();

container.innerHTML = `
  <div class="quiz-results">
    <h2>Your Score: ${score} / ${total}</h2>

    <p class="quiz-difficulty">
      <strong>${difficulty.charAt(0).toUpperCase() + difficulty.slice(1)}</strong>
    </p>

    <div id="quizChart" class="quiz-chart"></div>

    <a href="/book" class="quiz-btn quiz-cta">Book a Session</a>
  </div>
`;

  drawChart(score, total);
}

/* ===============================
   HELPERS
================================ */
function shuffle(arr) {
  return arr.sort(() => Math.random() - 0.5);
}

function calculateLevel(score, total) {
  const pct = (score / total) * 100;
  if (pct < 40) return "📘 Beginner";
  if (pct < 75) return "📗 Intermediate";
  return "📕 Advanced";
}

function updateProgress() {
  document.getElementById("progressBar").style.width =
    ((currentIndex) / currentSet.length) * 100 + "%";

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length} (${difficulty})`;
}

/* ===============================
   GOOGLE SHEETS
================================ */
function sendResults() {
  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      score,
      totalQuestions: currentSet.length,
      level: calculateLevel(score, currentSet.length),
      difficulty,
      page: location.pathname
    })
  });
}

/* ===============================
   GOOGLE CHARTS
================================ */
google.charts.load("current", { packages: ["corechart"] });

function drawChart(correct, total) {
  google.charts.setOnLoadCallback(() => {
    const data = google.visualization.arrayToDataTable([
      ["Result", "Count"],
      ["Correct", correct],
      ["Incorrect", total - correct]
    ]);

   new google.visualization.PieChart(
     document.getElementById("quizChart")
   ).draw(data, {
     pieHole: 0.45,
     legend: { position: "bottom", alignment: "center" },
     chartArea: { width: "90%", height: "80%" }
   });

}
