console.log("🔥 quiz.js loaded");

/* =========================================================
   Excel with Eddie — WORKING Quiz Script
   ========================================================= */

/* ------------------ GOOGLE SHEETS ------------------ */
const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ------------------ QUESTION BANK ------------------ */
const questionBank = {
  beginner: [
    {
      q: "What symbol starts every Excel formula?",
      answers: ["#", "=", "$"],
      correct: 1,
      explanation: "All Excel formulas begin with ="
    },
    {
      q: "Which function adds numbers?",
      answers: ["SUM", "COUNT", "AVERAGE"],
      correct: 0,
      explanation: "SUM adds numeric values."
    }
  ],

  intermediate: [
    {
      q: "Which function replaced VLOOKUP?",
      answers: ["HLOOKUP", "XLOOKUP", "MATCH"],
      correct: 1,
      explanation: "XLOOKUP is the modern replacement."
    },
    {
      q: "What does COUNTIF do?",
      answers: [
        "Counts numbers only",
        "Counts cells that meet a condition",
        "Adds values"
      ],
      correct: 1,
      explanation: "COUNTIF counts cells that meet criteria."
    }
  ],

  advanced: [
    {
      q: "Which formula returns a dynamic filtered list?",
      answers: ["FILTER", "SORT", "UNIQUE"],
      correct: 0,
      explanation: "FILTER returns rows matching criteria."
    },
    {
      q: "What does INDEX + MATCH replace?",
      answers: ["SUMIF", "VLOOKUP", "COUNTIFS"],
      correct: 1,
      explanation: "INDEX/MATCH replaces VLOOKUP with flexibility."
    }
  ]
};

/* ------------------ STATE ------------------ */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let currentDifficulty = "";

/* ------------------ UTIL ------------------ */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ------------------ START QUIZ ------------------ */
function startQuiz(difficulty) {
  console.log("▶ Starting quiz:", difficulty);

  currentDifficulty = difficulty;
  currentIndex = 0;
  score = 0;

  currentSet = [...questionBank[difficulty]];
  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* ------------------ SHOW QUESTION ------------------ */
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
    <p id="explanation"></p>
  `;

  updateProgress();
}

/* ------------------ PROGRESS ------------------ */
function updateProgress() {
  document.getElementById("progressBar").style.width =
    ((currentIndex + 1) / currentSet.length) * 100 + "%";

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length} (${capitalize(
      currentDifficulty
    )})`;
}

/* ------------------ ANSWER ------------------ */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  if (choice === q.correct) {
    score++;
    explanation.textContent = "✅ Correct! " + q.explanation;
  } else {
    explanation.textContent = "❌ Incorrect. " + q.explanation;
  }

  document.querySelectorAll(".answer-btn").forEach(btn => btn.disabled = true);

  setTimeout(nextQuestion, 900);
}

/* ------------------ NEXT ------------------ */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentSet.length) {
    showQuestion();
  } else {
    showResults();
  }
}

/* ------------------ RESULTS ------------------ */
function showResults() {
  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  document.getElementById("quizContainer").innerHTML = `
    <h2>Your Score: ${score} / ${currentSet.length}</h2>
    <h3>${calculateLevel()}</h3>
    <button class="quiz-btn" onclick="location.reload()">Try Again</button>
  `;

  sendResults();
}

/* ------------------ LEVEL ------------------ */
function calculateLevel() {
  const pct = (score / currentSet.length) * 100;
  if (pct < 40) return "📘 Beginner";
  if (pct < 75) return "📗 Intermediate";
  return "📕 Advanced";
}

/* ------------------ SHEETS ------------------ */
function sendResults() {
  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      score,
      totalQuestions: currentSet.length,
      difficulty: currentDifficulty,
      level: calculateLevel(),
      page: window.location.pathname
    })
  });
}

/* ------------------ GLOBAL ------------------ */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
