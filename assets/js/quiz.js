console.log("🔥 quiz.js loaded");

/* ===============================
   QUESTION BANK (REQUIRED)
================================ */
const questionBank = {
  beginner: [
    {
      q: "What symbol starts every Excel formula?",
      answers: ["+", "=", "#"],
      correct: 1,
      explanation: "All Excel formulas begin with ="
    },
    {
      q: "Which function adds numbers?",
      answers: ["SUM", "COUNT", "AVERAGE"],
      correct: 0,
      explanation: "SUM adds numbers in a range."
    }
  ],
  intermediate: [
    {
      q: "Which function replaces VLOOKUP?",
      answers: ["XLOOKUP", "HLOOKUP", "MATCH"],
      correct: 0,
      explanation: "XLOOKUP is the modern replacement."
    },
    {
      q: "What does a PivotTable do?",
      answers: ["Summarize data", "Format cells", "Protect sheets"],
      correct: 0,
      explanation: "PivotTables summarize large datasets."
    }
  ],
  advanced: [
    {
      q: "Which function returns unique values?",
      answers: ["UNIQUE", "FILTER", "SORT"],
      correct: 0,
      explanation: "UNIQUE returns distinct values."
    },
    {
      q: "Which function handles errors?",
      answers: ["IFERROR", "ERROR", "TRY"],
      correct: 0,
      explanation: "IFERROR replaces errors with a value."
    }
  ]
};

/* ===============================
   QUIZ STATE
================================ */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let difficulty = "";

/* ===============================
   START QUIZ
================================ */
function startQuiz(level) {
  console.log("▶ Starting quiz:", level);

  difficulty = level;
  score = 0;
  currentIndex = 0;
  currentSet = [...questionBank[level]];

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* ===============================
   SHOW QUESTION
================================ */
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

  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length}`;
}

/* ===============================
   ANSWER
================================ */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const exp = document.getElementById("explanation");

  if (choice === q.correct) {
    score++;
    exp.textContent = "✅ Correct! " + q.explanation;
    exp.style.color = "green";
  } else {
    exp.textContent = "❌ " + q.explanation;
    exp.style.color = "red";
  }

  setTimeout(nextQuestion, 1200);
}

/* ===============================
   NEXT / RESULTS
================================ */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentSet.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function showResults() {
  document.getElementById("quizContainer").innerHTML = `
    <h2>Your Score: ${score} / ${currentSet.length}</h2>
    <p>Difficulty: ${difficulty}</p>
    <button class="quiz-btn" onclick="location.reload()">Try Again</button>
  `;
}

/* ===============================
   GLOBAL EXPORTS
================================ */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
