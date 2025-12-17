/* =========================================================
   Excel with Eddie – Quiz Script
   Difficulty + Google Sheets + Google Charts
   ========================================================= */

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ---------------------------------------------------------
   QUESTION BANK
   (KEEP YOUR EXISTING QUESTION BANK EXACTLY AS IS)
--------------------------------------------------------- */
const questionBank = { /* unchanged */ };

/* ---------------------------------------------------------
   QUIZ STATE
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

function getRandomQuestions(source, count) {
  return [...source].sort(() => Math.random() - 0.5).slice(0, count);
}

/* ---------------------------------------------------------
   START QUIZ
--------------------------------------------------------- */
function startQuiz(difficulty = "beginner") {
  currentDifficulty = difficulty;
  currentIndex = 0;
  score = 0;

  currentSet = getRandomQuestions(questionBank[difficulty], 10);

  // Hide difficulty selector
  const difficultyBlock = document.getElementById("difficultySelect");
  if (difficultyBlock) difficultyBlock.style.display = "none";

  // Show progress UI
  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
}

/* ---------------------------------------------------------
   PROGRESS
--------------------------------------------------------- */
function updateProgress() {
  const percent = (currentIndex / currentSet.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${currentSet.length} (${capitalize(currentDifficulty)})`;
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
        (ans, i) =>
          `<button class="answer-btn" onclick="submitAnswer(${i})">${ans}</button>`
      )
      .join("")}
    <p id="explanation" class="explanation"></p>
  `;

  updateProgress();
}

/* ---------------------------------------------------------
   SUBMIT ANSWER
--------------------------------------------------------- */
function submitAnswer(choice) {
  const q = currentSet[currentIndex];
  const explanation = document.getElementById("explanation");

  const isCorrect = choice === q.correct;
  if (isCorrect) score++;

  explanation.textContent =
    (isCorrect ? "Correct! " : "Incorrect. ") + q.explanation;
  explanation.style.color = isCorrect ? "#009a63" : "#b00020";

  // Disable answers
  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = "default";
  });

  showNavigationButtons();
}

/* ---------------------------------------------------------
   NAVIGATION CONTROLS
--------------------------------------------------------- */
function showNavigationButtons() {
  const container = document.getElementById("quizContainer");

  // Prevent duplicate button rendering
  if (document.getElementById("quizNav")) return;

  container.insertAdjacentHTML(
    "beforeend",
    `
    <div id="quizNav" style="margin-top:20px;">
      <button class="quiz-btn" onclick="nextQuestion()">Next Question</button>
      <button class="quiz-btn" style="background:#b00020;margin-left:10px;" onclick="quitQuiz()">Quit Quiz</button>
    </div>
    `
  );
}

function nextQuestion() {
  currentIndex++;
  currentIndex < currentSet.length ? showQuestion() : showResults();
}

function quitQuiz() {
  showResults();
}

/* ---------------------------------------------------------
   RESULTS
--------------------------------------------------------- */
function showResults() {
  const total = currentSet.length;
  const level = calculateLevel(score, total);

  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${total}</h2>
      <h3>${level}</h3>
      <p>Difficulty: <strong>${capitalize(currentDifficulty)}</strong></p>

      <div id="quizChart" style="height:300px;margin-top:30px;"></div>

      <a href="/book" class="quiz-btn">Book a Tutoring Session</a>
      <br><br>
      <button class="quiz-btn" onclick="location.reload()">Retake Quiz</button>
    </div>
  `;

  sendResultsToGoogleSheets({
    score,
    totalQuestions: total,
    level,
    difficulty: currentDifficulty,
    page: window.location.pathname,
    timestamp: new Date().toISOString()
  });

  drawResultsChart(score, total);
}

function calculateLevel(score, total) {
  const pct = (score / total) * 100;
  if (pct < 40) return "📘 Excel Level: Beginner";
  if (pct < 75) return "📗 Excel Level: Intermediate";
  return "📕 Excel Level: Advanced";
}

/* ---------------------------------------------------------
   GOOGLE SHEETS LOGGING
--------------------------------------------------------- */
function sendResultsToGoogleSheets(payload) {
  if (!GOOGLE_SHEETS_WEB_APP_URL) return;

  fetch(GOOGLE_SHEETS_WEB_APP_URL, {
    method: "POST",
    mode: "no-cors",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(payload)
  }).catch(err => console.error("Sheets error:", err));
}

/* ---------------------------------------------------------
   GOOGLE CHARTS (SAFE LOAD)
--------------------------------------------------------- */
function drawResultsChart(correct, total) {
  if (!window.google || !google.charts) {
    setTimeout(() => drawResultsChart(correct, total), 300);
    return;
  }

  google.charts.load("current", { packages: ["corechart"] });
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

/* ---------------------------------------------------------
   GLOBAL EXPORTS (INLINE HTML NEEDS THESE)
--------------------------------------------------------- */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
window.nextQuestion = nextQuestion;
window.quitQuiz = quitQuiz;
