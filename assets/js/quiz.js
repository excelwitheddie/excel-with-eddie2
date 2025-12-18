/* =========================================================
   Excel with Eddie — WORKING Quiz Script
   Difficulty • Progress • Charts • Google Sheets
   ========================================================= */
console.log("🔥 quiz.js loaded");

/* -----------------------------
   GOOGLE SHEETS
----------------------------- */
const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* -----------------------------
   QUESTION BANK (MINIMAL, SAFE)
   You can expand this later
----------------------------- */
const questionBank = {
  beginner: [
    {
      q: "What symbol starts a formula in Excel?",
      answers: ["#", "$", "="],
      correct: 2,
      explanation: "All Excel formulas start with the equals sign (=)."
    },
    {
      q: "Which function adds numbers?",
      answers: ["SUM", "COUNT", "AVERAGE"],
      correct: 0,
      explanation: "SUM adds numeric values in a range."
    }
  ],

  intermediate: [
    {
      q: "Which function replaces VLOOKUP?",
      answers: ["XLOOKUP", "MATCH", "OFFSET"],
      correct: 0,
      explanation: "XLOOKUP is the modern replacement for VLOOKUP."
    },
    {
      q: "What does a PivotTable do?",
      answers: ["Summarizes data", "Formats text", "Protects sheets"],
      correct: 0,
      explanation: "PivotTables summarize and analyze large datasets."
    }
  ],

  advanced: [
    {
      q: "Which function returns unique values?",
      answers: ["FILTER", "UNIQUE", "SORT"],
      correct: 1,
      explanation: "UNIQUE spills distinct values from a range."
    },
    {
      q: "What does SUMIFS allow?",
      answers: [
        "Multiple criteria summing",
        "Text concatenation",
        "Error handling"
      ],
      correct: 0,
      explanation: "SUMIFS sums values using multiple conditions."
    }
  ]
};

/* -----------------------------
   STATE
----------------------------- */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let difficulty = "";

/* -----------------------------
   HELPERS
----------------------------- */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* -----------------------------
   START QUIZ
----------------------------- */
function startQuiz(level) {
  if (!questionBank[level]) {
    console.error("Invalid difficulty:", level);
    return;
  }

  difficulty = level;
  currentIndex = 0;
  score = 0;

  currentSet = shuffle(questionBank[level]).slice(0, 10);

  document.querySelector(".quiz-start-buttons").style.display = "none";
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

  updateProgress();
}

/* -----------------------------
   PROGRESS
----------------------------- */
function updateProgress() {
  const pct = (currentIndex / currentSet.length) * 100;
  document.getElementById("progressBar").style.width = pct + "%";
  document.getElementById(
    "questionCounter"
  ).textContent = `Question ${currentIndex + 1} of ${
    currentSet.length
  } (${capitalize(difficulty)})`;
}

/* -----------------------------
   ANSWER
----------------------------- */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  const correct = choice === q.correct;
  if (correct) score++;

  explanation.textContent =
    (correct ? "Correct! " : "Incorrect. ") + q.explanation;
  explanation.style.color = correct ? "#16a085" : "#b00020";

  document
    .querySelectorAll(".answer-btn")
    .forEach(b => (b.disabled = true));

  setTimeout(nextQuestion, 800);
}

/* -----------------------------
   NEXT / RESULTS
----------------------------- */
function nextQuestion() {
  currentIndex++;
  currentIndex < currentSet.length ? showQuestion() : showResults();
}

function showResults() {
  const total = currentSet.length;
  const level =
    score / total < 0.4
      ? "📘 Beginner"
      : score / total < 0.75
      ? "📗 Intermediate"
      : "📕 Advanced";

  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  document.getElementById("quizContainer").innerHTML = `
    <h2>Your Score: ${score} / ${total}</h2>
    <h3>${level}</h3>
    <p>Difficulty: ${capitalize(difficulty)}</p>
    <a href="/book" class="quiz-btn">Book a Session</a>
    <br><br>
    <button class="quiz-btn" onclick="location.reload()">Try Again</button>
  `;

  logResults(score, total, level);
}

/* -----------------------------
   GOOGLE SHEETS
----------------------------- */
function logResults(score, total, level) {
  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      score,
      totalQuestions: total,
      level,
      difficulty,
      page: window.location.pathname
    })
  });
}

/* -----------------------------
   GLOBAL EXPORTS
----------------------------- */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
