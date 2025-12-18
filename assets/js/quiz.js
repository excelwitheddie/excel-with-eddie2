console.log("🔥 quiz.js loaded");

/* -------------------------
   QUESTION BANK
------------------------- */
const questionBank = {
  beginner: [
    {
      q: "What does SUM do?",
      answers: ["Adds numbers", "Counts cells", "Sorts data"],
      correct: 0
    }
  ],
  intermediate: [
    {
      q: "Which function replaces VLOOKUP?",
      answers: ["HLOOKUP", "XLOOKUP", "MATCH"],
      correct: 1
    }
  ],
  advanced: [
    {
      q: "INDEX + MATCH is used to?",
      answers: ["Format cells", "Lookup values", "Create charts"],
      correct: 1
    }
  ]
};

let currentSet = [];
let currentIndex = 0;

/* -------------------------
   DOM READY
------------------------- */
document.addEventListener("DOMContentLoaded", () => {
  console.log("✅ DOM ready");

  document.querySelectorAll(".quiz-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const level = btn.dataset.level;
      console.log("🟢 Button clicked:", level);
      startQuiz(level);
    });
  });
});

/* -------------------------
   START QUIZ
------------------------- */
function startQuiz(level) {
  currentSet = questionBank[level];
  currentIndex = 0;

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* -------------------------
   SHOW QUESTION
------------------------- */
function showQuestion() {
  const q = currentSet[currentIndex];
  if (!q) return;

  document.getElementById("quizContainer").innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers
      .map(
        (a, i) =>
          `<button class="quiz-btn answer-btn" data-i="${i}">${a}</button>`
      )
      .join("")}
  `;

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length}`;

  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.addEventListener("click", () => {
      submitAnswer(Number(btn.dataset.i));
    });
  });
}

/* -------------------------
   ANSWER
------------------------- */
function submitAnswer(choice) {
  currentIndex++;
  if (currentIndex < currentSet.length) {
    showQuestion();
  } else {
    document.getElementById("quizContainer").innerHTML =
      "<h2>Quiz complete 🎉</h2>";
  }
}
