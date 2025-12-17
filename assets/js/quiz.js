/* =========================================================
   Excel with Eddie – Quiz Script (STABLE)
========================================================= */

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ---------------------------------------------------------
   QUESTION BANK (MINIMAL TEST VERSION)
--------------------------------------------------------- */
const questionBank = {
  beginner: [
    {
      q: "What symbol starts every Excel formula?",
      answers: ["#", "=", "$"],
      correct: 1,
      explanation: "All Excel formulas start with ="
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
      q: "What does FILTER return?",
      answers: ["A value", "A spilled array", "A pivot table"],
      correct: 1,
      explanation: "FILTER returns a dynamic array."
    }
  ]
};

/* ---------------------------------------------------------
   STATE
--------------------------------------------------------- */
let currentIndex = 0;
let score = 0;
let currentSet = [];
let currentDifficulty = "";

/* ---------------------------------------------------------
   UTILITIES
--------------------------------------------------------- */
function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ---------------------------------------------------------
   START QUIZ (GLOBAL)
--------------------------------------------------------- */
function startQuiz(difficulty) {
  console.log("Starting quiz:", difficulty);

  currentDifficulty = difficulty;
  currentIndex = 0;
  score = 0;

  if (!questionBank[difficulty]) {
    alert("Question bank missing for: " + difficulty);
    return;
  }

  currentSet = questionBank[difficulty];

  document.getElementById("difficultySelect").style.display = "none";
  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* ---------------------------------------------------------
   SHOW QUESTION
--------------------------------------------------------- */
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
    `Question ${currentIndex + 1} of ${currentSet.length} (${capitalize(currentDifficulty)})`;
}

/* ---------------------------------------------------------
   ANSWER
--------------------------------------------------------- */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  if (choice === q.correct) {
    score++;
    explanation.style.color = "green";
    explanation.textContent = "Correct! " + q.explanation;
  } else {
    explanation.style.color = "red";
    explanation.textContent = "Incorrect. " + q.explanation;
  }

  setTimeout(() => {
    currentIndex++;
    currentIndex < currentSet.length ? showQuestion() : showResults();
  }, 800);
}

/* ---------------------------------------------------------
   RESULTS
--------------------------------------------------------- */
function showResults() {
  document.getElementById("quizContainer").innerHTML = `
    <h2>Score: ${score} / ${currentSet.length}</h2>
    <p>Difficulty: ${capitalize(currentDifficulty)}</p>
    <button class="quiz-btn" onclick="location.reload()">Try Again</button>
  `;
}

/* ---------------------------------------------------------
   GLOBAL EXPORTS (CRITICAL)
--------------------------------------------------------- */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
