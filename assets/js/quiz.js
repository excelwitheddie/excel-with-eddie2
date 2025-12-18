console.log("🔥 quiz.js loaded");

/* ============================
   CONFIG
============================ */
const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ============================
   QUESTION BANK
============================ */
const questionBank = {
  beginner: [
    {
      q: "What does the SUM function do?",
      answers: ["Adds numbers", "Counts text", "Sorts data"],
      correct: 0
    }
  ],
  intermediate: [
    {
      q: "What does VLOOKUP require?",
      answers: ["Leftmost column", "Sorted data", "Exact match"],
      correct: 0
    }
  ],
  advanced: [
    {
      q: "What replaces VLOOKUP?",
      answers: ["SUMIF", "XLOOKUP", "COUNT"],
      correct: 1
    }
  ]
};

/* ============================
   STATE
============================ */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let difficulty = "";

/* ============================
   START QUIZ
============================ */
function startQuiz(level) {
  difficulty = level;
  currentSet = [...questionBank[level]];
  currentIndex = 0;
  score = 0;

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* ============================
   SHOW QUESTION
============================ */
function showQuestion() {
  const q = currentSet[currentIndex];
  document.getElementById("quizContainer").innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers
      .map(
        (a, i) =>
          `<button class="quiz-btn" onclick="submitAnswer(${i})">${a}</button>`
      )
      .join("")}
  `;

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length} (${difficulty})`;
}

/* ============================
   ANSWER
============================ */
function submitAnswer(choice) {
  if (choice === currentSet[currentIndex].correct) score++;

  currentIndex++;
  currentIndex < currentSet.length ? showQuestion() : showResults();
}

/* ============================
   RESULTS
============================ */
function showResults() {
  document.getElementById("quizContainer").innerHTML = `
    <h2>Your Score: ${score} / ${currentSet.length}</h2>
    <p>${difficulty}</p>
    <a href="/book" class="quiz-btn">Book a Session</a>
  `;
}

/* ============================
   EXPORTS
============================ */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
