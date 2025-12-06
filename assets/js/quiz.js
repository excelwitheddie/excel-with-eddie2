/* =========================================================
   Excel with Eddie - Quiz Script (Rewritten, Guaranteed Working)
   ========================================================= */

// ------------------------
// Question Bank
// ------------------------
const questions = [
  { q: "What is the result of =IF(A1>10, \"High\", \"Low\") when A1=12?",
    answers: ["High", "Low", "Error"],
    correct: 0,
    explanation: "12 > 10, so the result is 'High'." },

  { q: "Which formula returns the value in B2 if A2 = \"Yes\"?",
    answers: ["=IF(A2=\"Yes\",B2)", "=IF(A2=B2,\"Yes\")", "=IF(B2=\"Yes\",A2)"],
    correct: 0,
    explanation: "IF(A2=\"Yes\") → return B2." },

  { q: "What does =XLOOKUP(\"John\",A2:A10,B2:B10) return?",
    answers: ["Matching value in column B", "Row number", "Error unless sorted"],
    correct: 0,
    explanation: "XLOOKUP returns the corresponding value." },

  { q: "Which checks whether C5 is between 10 and 20?",
    answers: ["=IF(C5>10<20)", "=AND(C5>=10,C5<=20)", "=IF(C5>=10 AND C5<=20)"],
    correct: 1,
    explanation: "AND checks multiple conditions." },

  { q: "If A1=5, A2=\"3\", A3=2 → =SUM(A1:A3) returns:",
    answers: ["10", "5", "Error"],
    correct: 0,
    explanation: "Excel converts '3' to a number." },

  { q: "=IFERROR(VLOOKUP(D1,A2:B10,2,FALSE),\"Not Found\") returns what if D1 is missing?",
    answers: ["#N/A", "Not Found", "0"],
    correct: 1,
    explanation: "IFERROR replaces error with text." },

  { q: "Return TRUE only if A1>B1 AND C1=\"Complete\"?",
    answers: ["=IF(A1>B1 AND C1=\"Complete\")", "=AND(A1>B1,C1=\"Complete\")", "=OR(A1>B1,C1=\"Complete\")"],
    correct: 1,
    explanation: "AND requires both conditions to be true." },

  { q: "A1=5 → =IF(AND(A1>2,A1<10),A1*2,A1*5) returns:",
    answers: ["10", "25", "Error"],
    correct: 0,
    explanation: "5 is between 2 and 10 → 5*2 = 10." },

  { q: "=INDEX(B2:B10, MATCH(\"Item3\",A2:A10,0)) returns:",
    answers: ["Value from column B", "Row number", "Item text"],
    correct: 0,
    explanation: "MATCH finds row; INDEX returns the value." },

  { q: "A1=\"Yes\", B1=3 → =IF(A1=\"Yes\",IF(B1>5,\"Approved\",\"Review\"),\"Rejected\") returns:",
    answers: ["Approved", "Review", "Rejected"],
    correct: 1,
    explanation: "Nested IF returns 'Review'." }
];

questions.sort(() => Math.random() - 0.5);

// ------------------------
// Variables
// ------------------------
let currentIndex = 0;
let score = 0;

// ------------------------
// Start Quiz
// ------------------------
function startQuiz() {
  const startBtn = document.getElementById("startBtn");
  startBtn.style.display = "none";

  document.getElementById("progressWrapper").style.display = "block";
  document.getElementById("questionCounter").style.display = "block";

  if (typeof gtag === "function") {
    gtag('event', 'quiz_started');
  }

  showQuestion();
  updateProgress();
}

// ------------------------
// Display Progress
// ------------------------
function updateProgress() {
  const percent = (currentIndex / questions.length) * 100;
  document.getElementById("progressBar").style.width = percent + "%";
  document.getElementById("questionCounter").textContent =
    `Question ${currentIndex + 1} of ${questions.length}`;
}

// ------------------------
// Display Question
// ------------------------
function showQuestion() {
  const q = questions[currentIndex];
  const container = document.getElementById("quizContainer");

  container.innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers.map((ans,i)=>`
      <button class="answer-btn" onclick="submitAnswer(${i})">${ans}</button>
    `).join("")}
    <p id="explanation" class="explanation"></p>
  `;

  updateProgress();
}

// ------------------------
// Handle Answer
// ------------------------
function submitAnswer(choice) {
  const q = questions[currentIndex];
  const explanation = document.getElementById("explanation");

  const correct = (choice === q.correct);

  if (correct) {
    score++;
    explanation.style.color = "#009a63";
    explanation.textContent = "Correct! " + q.explanation;
  } else {
    explanation.style.color = "red";
    explanation.textContent = "Incorrect. " + q.explanation;
  }

  if (typeof gtag === "function") {
    gtag('event', 'quiz_answered', {
      question: q.q,
      selected: q.answers[choice],
      correct: q.answers[q.correct],
      is_correct: correct
    });
  }

  setTimeout(() => {
    currentIndex++;
    if (currentIndex < questions.length) showQuestion();
    else showResults();
  }, 1200);
}

// ------------------------
// Results Screen
// ------------------------
function showResults() {
  const level = calculateLevel(score);
  const container = document.getElementById("quizContainer");

  document.getElementById("progressWrapper").style.display = "none";
  document.getElementById("questionCounter").style.display = "none";

  if (typeof gtag === "function") {
    gtag('event', 'quiz_completed', {
      score: score,
      level: level
    });
  }

  container.innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${questions.length}</h2>
      <h3>${level}</h3>

      <p style="margin-top:10px;">Want help improving your Excel skills? Book a session anytime.</p>

      <a href="/book" class="quiz-btn">Book a Tutoring Session</a>

      <p style="margin-top:20px;">Or try again:</p>
      <button class="quiz-btn" onclick="location.reload()">Retake Quiz</button>
    </div>
  `;
}

// ------------------------
// Level Calculation
// ------------------------
function calculateLevel(score) {
  if (score <= 3) return "📘 Excel Level: Beginner";
  if (score <= 7) return "📗 Excel Level: Intermediate";
  return "📕 Excel Level: Advanced";
}

// ------------------------
// Force global scope for GitHub Pages
// ------------------------
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
window.showQuestion = showQuestion;
