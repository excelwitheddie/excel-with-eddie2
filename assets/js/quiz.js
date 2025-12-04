---
layout: null
---
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
  const q = questions[currentIndex];
  const explanation = document.getElementById("explanation");

  if (choice === q.correct) {
    score++;
    explanation.style.color = "#009a63";
    explanation.textContent = "Correct! " + q.explanation;
  } else {
    explanation.style.color = "red";
    explanation.textContent = "Incorrect. " + q.explanation;
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) {
      showQuestion();
    } else {
      showResults();
    }
  }, 1300);
}

function showResults() {
  const container = document.getElementById("quizContainer");
  const level = calculateLevel(score);

  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  container.innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${questions.length}</h2>
      <h3>${level}</h3>

      <p style="font-size:1.1rem; margin-top:10px;">
        Want help improving your Excel skills? Book a session anytime.
      </p>

      <a href="/book" class="quiz-btn">Book a Tutoring Session</a>

      <p style="margin-top:20px;">Or try again:</p>
      <button class="quiz-btn" onclick="location.reload()">Retake Quiz</button>

      <h4 style="margin-top:30px;">Get your results by email:</h4>
      <input type="email" id="emailInput" placeholder="Your email" style="padding:10px; width:60%; max-width:300px; border-radius:6px; border:1px solid #ccc;">
      <button class="quiz-btn" onclick="emailResults()">Send Results</button>
    </div>
  `;
}

function calculateLevel(score) {
  if (score <= 3) return "📘 Excel Level: Beginner";
  if (score <= 7) return "📗 Excel Level: Intermediate";
  return "📕 Excel Level: Advanced";
}

function emailResults() {
  const email = document.getElementById("emailInput").value;
  if (!email) {
    alert("Please enter an email address.");
    return;
  }

  const subject = "My Excel Quiz Results";
  const body = `I scored ${score} out of 10 on the Excel quiz!`;

  window.location.href =
    `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
