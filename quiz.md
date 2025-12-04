---
layout: default
title: Excel Knowledge Quiz
---

<section style="max-width:900px; margin:0 auto; text-align:center;">
  <h1>Excel Knowledge Quiz</h1>
  <p style="font-size:1.15rem; color:#0a3c5a;">
    Test your Excel skills with this 10-question quiz. Your score and Excel level will appear at the end!
  </p>

  <!-- Progress bar -->
  <div id="progressWrapper" style="display:none; margin:20px auto; width:80%; max-width:500px; background:#eee; border-radius:8px;">
    <div id="progressBar" style="height:12px; width:0%; background:#009a63; border-radius:8px; transition:width 0.3s;"></div>
  </div>

  <!-- Question counter -->
  <p id="questionCounter" style="font-size:1rem; color:#083c5a; margin-top:10px; display:none;"></p>

  <div id="quizContainer"></div>

  <button id="startBtn" onclick="startQuiz()" class="quiz-btn">Start Quiz</button>
</section>

<style>
.quiz-btn {
  padding: 12px 25px;
  background: #083c5a;
  color: white;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin-top: 20px;
}
.quiz-btn:hover {
  background: #009a63;
}

.answer-btn {
  display: block;
  margin: 12px auto;
  padding: 12px 20px;
  background: white;
  color: #083c5a;
  border: 2px solid #083c5a;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 80%;
  max-width: 400px;
  transition: background 0.3s, color 0.3s;
}
.answer-btn:hover {
  background: #083c5a;
  color: white;
}

.explanation {
  margin-top: 10px;
  font-size: 0.95rem;
}

.result-screen {
  margin-top: 30px;
  padding: 20px;
}
</style>

<script>
const questions = [
  { q: "1. What does the SUM function do?", answers: ["Adds numbers", "Finds max value", "Counts blanks"], correct: 0, explanation: "SUM totals all numbers in a range." },
  { q: "2. What does a PivotTable do?", answers: ["Formats text", "Summarizes data", "Creates charts automatically"], correct: 1, explanation: "PivotTables summarize and analyze data quickly." },
  { q: "3. Which formula performs a lookup?", answers: ["XLOOKUP", "SUMIF", "TEXT"], correct: 0, explanation: "XLOOKUP is Excel’s most flexible lookup function." },
  { q: "4. Shortcut to select an entire column?", answers: ["Ctrl + C", "Ctrl + Space", "Ctrl + Shift + L"], correct: 1, explanation: "Ctrl + Space selects the entire column." },
  { q: "5. Tool used to remove duplicates?", answers: ["Data Validation", "Remove Duplicates", "Sort"], correct: 1, explanation: "Excel includes a built-in Remove Duplicates feature." },
  { q: "6. What does Ctrl + 1 open?", answers: ["Format Cells", "Insert Row", "Print Preview"], correct: 0, explanation: "Ctrl + 1 opens Format Cells instantly." },
  { q: "7. The IF function does what?", answers: ["Conditional logic", "Lookup text", "Format dates"], correct: 0, explanation: "IF tests a condition and returns different values." },
  { q: "8. Which is NOT a chart type?", answers: ["Waterfall", "Sunburst", "Sequence Chart"], correct: 2, explanation: "Excel does not have a 'Sequence Chart' type." },
  { q: "9. VLOOKUP requires what?", answers: ["Sorted data", "Lookup column on left", "Named ranges"], correct: 1, explanation: "VLOOKUP needs the lookup column to be the leftmost." },
  { q: "10. Flash Fill does what?", answers: ["Detects patterns", "Creates filters", "Sorts data"], correct: 0, explanation: "Flash Fill auto-fills based on detected patterns." }
];

// Randomize questions (optional)
questions.sort(() => Math.random() - 0.5);

let currentIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById("startBtn").style.display = "none";

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  showQuestion();
  updateProgress();
}

function updateProgress() {
  const percent = ((currentIndex) / questions.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;
}

function showQuestion() {
  const container = document.getElementById("quizContainer");
  const q = questions[currentIndex];

  let html = `
    <h2>${q.q}</h2>
    ${q.answers.map((ans, i) => `
      <button class="answer-btn" onclick="submitAnswer(${i})">${ans}</button>
    `).join("")}
    <p id="explanation" class="explanation"></p>
  `;

  container.innerHTML = html;
  updateProgress();
}

function submitAnswer(choice) {
  const q =
<script src="/assets/js/quiz.js"></script>
