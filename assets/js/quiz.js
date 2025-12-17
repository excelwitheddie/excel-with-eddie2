/* =========================================================
   Excel with Eddie – Stable Quiz Engine
   ========================================================= */

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ------------------------
   STATE
------------------------ */
let currentSet = [];
let currentIndex = 0;
let score = 0;
let currentDifficulty = "";

/* ------------------------
   HELPERS
------------------------ */
function capitalize(s) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

function shuffle(arr) {
  return [...arr].sort(() => Math.random() - 0.5);
}

/* ------------------------
   START QUIZ
------------------------ */
function startQuiz(difficulty) {
  currentDifficulty = difficulty;
  currentIndex = 0;
  score = 0;

  currentSet = shuffle(questionBank[difficulty]).slice(0, 10);

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";
  document.getElementById("quizChart").innerHTML = "";

  renderQuestion();
}

/* ------------------------
   RENDER QUESTION
------------------------ */
function renderQuestion() {
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

/* ------------------------
   PROGRESS
------------------------ */
function updateProgress() {
  const pct = (currentIndex / currentSet.length) * 100;
  document.getElementById("progressBar").style.width = pct + "%";
  document.getElementById(
    "questionCounter"
  ).textContent = `Question ${currentIndex + 1} of ${
    currentSet.length
  } (${capitalize(currentDifficulty)})`;
}

/* ------------------------
   ANSWER
------------------------ */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  const correct = choice === q.correct;
  if (correct) score++;

  explanation.textContent =
    (correct ? "Correct! " : "Incorrect. ") + q.explanation;
  explanation.style.color = correct ? "#009a63" : "#b00020";

  document.querySelectorAll(".answer-btn").forEach(b => (b.disabled = true));

  document
    .getElementById("quizContainer")
    .insertAdjacentHTML(
      "beforeend",
      `
      <div style="margin-top:20px;">
        <button class="quiz-btn" onclick="nextQuestion()">Next Question</button>
        <button class="quiz-btn" style="background:#b00020;margin-left:10px;" onclick="endQuiz()">Quit Quiz</button>
      </div>
    `
    );
}

/* ------------------------
   NEXT
------------------------ */
function nextQuestion() {
  currentIndex++;
  if (currentIndex < currentSet.length) {
    renderQuestion();
  } else {
    endQuiz();
  }
}

/* ------------------------
   END QUIZ
------------------------ */
function endQuiz() {
  const total = currentSet.length;
  const level = calculateLevel(score, total);

  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  document.getElementById("quizContainer").innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${total}</h2>
      <h3>${level}</h3>
      <p>Difficulty: <strong>${capitalize(currentDifficulty)}</strong></p>
      <div id="quizChart" style="height:300px;margin-top:20px;"></div>
      <a href="/book" class="quiz-btn">Book a Tutoring Session</a><br><br>
      <button class="quiz-btn" onclick="location.reload()">Retake Quiz</button>
    </div>
  `;

  logResults(score, total, level, currentDifficulty);
  drawChart(score, total);
}

/* ------------------------
   LEVEL
------------------------ */
function calculateLevel(score, total) {
  const pct = (score / total) * 100;
  if (pct < 40) return "📘 Excel Level: Beginner";
  if (pct < 75) return "📗 Excel Level: Intermediate";
  return "📕 Excel Level: Advanced";
}

/* ------------------------
   GOOGLE SHEETS
------------------------ */
function logResults(score, total, level, difficulty) {
  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      score,
      totalQuestions: total,
      level,
      difficulty,
      page: window.location.pathname,
      timestamp: new Date().toISOString()
    })
  });
}

/* ------------------------
   CHART
------------------------ */
google.charts.load("current", { packages: ["corechart"] });

function drawChart(correct, total) {
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

/* ------------------------
   GLOBAL EXPORTS
------------------------ */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
window.nextQuestion = nextQuestion;
window.endQuiz = endQuiz;

document.addEventListener("DOMContentLoaded", () => {
  document.querySelectorAll(".quiz-start-buttons button").forEach(btn => {
    btn.addEventListener("click", () => {
      const difficulty = btn.dataset.difficulty;
      startQuiz(difficulty);
    });
  });
});

