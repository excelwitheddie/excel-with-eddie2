console.log("🔥 quiz.js loaded");

/* ===============================
   QUESTION BANK (MINIMAL)
================================ */
const questionBank = {
  beginner: [
    {
      q: "What does the SUM function do?",
      answers: ["Adds numbers", "Counts cells", "Sorts data"],
      correct: 0,
      explanation: "SUM adds numbers together."
    }
  ],
  intermediate: [
    {
      q: "Which function replaces VLOOKUP?",
      answers: ["HLOOKUP", "XLOOKUP", "MATCH"],
      correct: 1,
      explanation: "XLOOKUP is the modern replacement."
    }
  ],
  advanced: [
    {
      q: "What does =UNIQUE(A1:A10) return?",
      answers: ["Sorted values", "Distinct values", "Counts"],
      correct: 1,
      explanation: "UNIQUE returns distinct values."
    }
  ]
};

let currentIndex = 0;
let currentSet = [];
let score = 0;

/* ===============================
   START QUIZ
================================ */
function startQuiz(difficulty) {
  console.log("Starting quiz:", difficulty);

  currentIndex = 0;
  score = 0;
  currentSet = questionBank[difficulty];

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

function showQuestion() {
  const q = currentSet[currentIndex];
  document.getElementById("quizContainer").innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers.map((a,i)=>`
      <button class="quiz-btn" onclick="answer(${i})">${a}</button>
    `).join("")}
  `;
}

function answer(choice) {
  alert(choice === currentSet[0].correct ? "Correct!" : "Incorrect");
}

/* ===============================
   BUTTON BINDING (THE KEY FIX)
================================ */
document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-start-buttons .quiz-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      startQuiz(btn.dataset.difficulty);
    });
  });

  console.log("✅ Quiz buttons bound");
});
