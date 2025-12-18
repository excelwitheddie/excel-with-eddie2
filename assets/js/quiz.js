console.log("🔥 quiz.js loaded");

/* -----------------------------
   QUESTION BANK (MINIMAL)
----------------------------- */
const questionBank = {
  beginner: [
    {
      q: "What does the SUM function do?",
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
      q: "What does INDEX + MATCH do?",
      answers: [
        "Formats cells",
        "Looks up values flexibly",
        "Creates charts"
      ],
      correct: 1
    }
  ]
};

/* -----------------------------
   STATE
----------------------------- */
let currentSet = [];
let currentIndex = 0;

/* -----------------------------
   START QUIZ
----------------------------- */
window.startQuiz = function(level) {
  console.log("🟢 startQuiz fired:", level);

  currentSet = questionBank[level];
  currentIndex = 0;

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
};

/* -----------------------------
   SHOW QUESTION
----------------------------- */
function showQuestion() {
  const q = currentSet[currentIndex];
  if (!q) return;

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
    `Question ${currentIndex + 1} of ${currentSet.length}`;
}

/* -----------------------------
   ANSWER
----------------------------- */
window.submitAnswer = function(choice) {
  currentIndex++;
  if (currentIndex < currentSet.length) {
    showQuestion();
  } else {
    document.getElementById("quizContainer").innerHTML =
      "<h2>Quiz complete 🎉</h2>";
  }
};
