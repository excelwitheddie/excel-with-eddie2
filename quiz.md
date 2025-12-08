/* =========================================================
   Excel with Eddie - Advanced Quiz Script + Sheets Tracking
   ========================================================= */

/**
 * STEP 1: OPTIONAL – Google Sheets tracking
 * -----------------------------------------
 * After you create a Google Apps Script web app (instructions below),
 * paste your web app URL here:
 *
 * Example:
 * const GOOGLE_SHEETS_WEB_APP_URL =
 *   "https://script.google.com/macros/s/XXXXXXXXXXXX/exec";
 */
const GOOGLE_SHEETS_WEB_APP_URL = "https://script.google.com/macros/s/PASTE_YOUR_WEB_APP_URL_HERE/exec";

/* =========================================================
   Question Bank (10 advanced Excel questions)
   ========================================================= */

const questions = [
  { 
    q: "1. What is the result of the formula: =IF(A1>10, \"High\", \"Low\") when A1 = 12?",
    answers: ["High", "Low", "Error"],
    correct: 0,
    explanation: "Since 12 > 10, the IF function returns \"High\"."
  },
  { 
    q: "2. Which formula returns the value in B2 if A2 = \"Yes\"?",
    answers: [
      "=IF(A2=\"Yes\", B2)",
      "=IF(A2=B2, \"Yes\")",
      "=IF(B2=\"Yes\", A2)"
    ],
    correct: 0,
    explanation: "The test is (A2=\"Yes\") and the returned value is B2."
  },
  { 
    q: "3. What does =XLOOKUP(\"John\", A2:A10, B2:B10) return?",
    answers: [
      "The value in column B where A = \"John\"",
      "The row number where John appears",
      "Always returns an error unless the range is sorted"
    ],
    correct: 0,
    explanation: "XLOOKUP returns the corresponding value from the return array (here, column B)."
  },
  { 
    q: "4. Which formula checks if C5 is between 10 and 20 (inclusive)?",
    answers: [
      "=IF(C5>10<20, TRUE, FALSE)",
      "=AND(C5>=10, C5<=20)",
      "=IF(C5>=10 AND C5<=20)"
    ],
    correct: 1,
    explanation: "AND evaluates multiple logical tests; both must be TRUE for the result to be TRUE."
  },
  { 
    q: "5. What is the output of: =SUM(A1:A3) if A1=5, A2=\"3\", A3=2?",
    answers: ["10", "5", "Error"],
    correct: 0,
    explanation: "Excel coerces the text \"3\" into a number, so 5 + 3 + 2 = 10."
  },
  { 
    q: "6. What does =IFERROR(VLOOKUP(D1, A2:B10, 2, FALSE), \"Not Found\") return if D1 is not in the list?",
    answers: ["#N/A", "Not Found", "0"],
    correct: 1,
    explanation: "IFERROR wraps the VLOOKUP and replaces the error with \"Not Found\"."
  },
  { 
    q: "7. What is the correct formula to return TRUE only if A1 > B1 AND C1 = \"Complete\"?",
    answers: [
      "=IF(A1>B1 AND C1=\"Complete\", TRUE, FALSE)",
      "=AND(A1>B1, C1=\"Complete\")",
      "=OR(A1>B1, C1=\"Complete\")"
    ],
    correct: 1,
    explanation: "AND requires both conditions (A1>B1 and C1=\"Complete\") to be TRUE."
  },
  { 
    q: "8. Given A1 = 5, what does this formula return? =IF(AND(A1>2, A1<10), A1*2, A1*5)",
    answers: ["10", "25", "Error"],
    correct: 0,
    explanation: "5 is between 2 and 10, so Excel evaluates A1*2 = 10."
  },
  { 
    q: "9. What does =INDEX(B2:B10, MATCH(\"Item3\", A2:A10, 0)) return?",
    answers: [
      "The value in column B for \"Item3\"",
      "The row number where \"Item3\" appears",
      "The text \"Item3\""
    ],
    correct: 0,
    explanation: "MATCH finds the position of \"Item3\"; INDEX returns the value from B at that position."
  },
  { 
    q: "10. What is the result of =IF(A1=\"Yes\", IF(B1>5, \"Approved\", \"Review\"), \"Rejected\") when A1=\"Yes\" and B1=3?",
    answers: ["Approved", "Review", "Rejected"],
    correct: 1,
    explanation: "First IF is true (A1 = \"Yes\"), then B1>5 is false, so the inner IF returns \"Review\"."
  }
];

// Randomize question order (optional)
questions.sort(() => Math.random() - 0.5);

let currentIndex = 0;
let score = 0;

/* =========================================================
   Core Quiz Controls
   ========================================================= */

function startQuiz() {
  score = 0;
  currentIndex = 0;

  // Hide start button, show progress bar + counter
  const startBtn = document.getElementById("startBtn");
  if (startBtn) startBtn.style.display = "none";

  const progressWrapper = document.getElementById("progressWrapper");
  const questionCounter = document.getElementById("questionCounter");

  if (progressWrapper) progressWrapper.style.display = "block";
  if (questionCounter) questionCounter.style.display = "block";

  showQuestion();
  updateProgress();
}

function updateProgress() {
  const progressBar = document.getElementById("progressBar");
  const questionCounter = document.getElementById("questionCounter");

  if (!progressBar || !questionCounter) return;

  const percent = (currentIndex / questions.length) * 100;
  progressBar.style.width = percent + "%";
  questionCounter.textContent = `Question ${currentIndex + 1} of ${questions.length}`;
}

function showQuestion() {
  const container = document.getElementById("quizContainer");
  if (!container) return;

  const q = questions[currentIndex];

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

/* =========================================================
   Answer Handling + Navigation
   ========================================================= */

function submitAnswer(choice) {
  const q = questions[currentIndex];
  const explanation = document.getElementById("explanation");
  if (!explanation) return;

  // Evaluate answer
  if (choice === q.correct) {
    score++;
    explanation.style.color = "#009a63";
    explanation.textContent = "Correct! " + q.explanation;
  } else {
    explanation.style.color = "red";
    explanation.textContent = "Incorrect. " + q.explanation;
  }

  // Disable answer buttons
  const buttons = document.querySelectorAll(".answer-btn");
  buttons.forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = "default";
  });

  // Show Next + Quit buttons
  showNavigationButtons();
}

function showNavigationButtons() {
  const container = document.getElementById("quizContainer");
  if (!container) return;

  const navHTML = `
    <div style="margin-top:20px;">
      <button class="quiz-btn" onclick="nextQuestion()">Next Question</button>
      <button class="quiz-btn" style="background:#b00020; margin-left:10px;" onclick="quitQuiz()">Quit Quiz</button>
    </div>
  `;

  container.insertAdjacentHTML("beforeend", navHTML);
}

function nextQuestion() {
  currentIndex++;
  if (currentIndex < questions.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function quitQuiz() {
  showResults();
}

/* =========================================================
   Results + Level Calculation
   ========================================================= */

function showResults() {
  const container = document.getElementById("quizContainer");
  const progressWrapper = document.getElementById("progressWrapper");
  const questionCounter = document.getElementById("questionCounter");

  if (progressWrapper) progressWrapper.style.display = "none";
  if (questionCounter) questionCounter.style.display = "none";

  const level = calculateLevel(score);

  if (!container) return;

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
    </div>
  `;

  // Send results to Google Sheets (if configured)
  sendResultsToGoogleSheets({
    score: score,
    totalQuestions: questions.length,
    level: level,
    page: window.location.href,
    timestamp: new Date().toISOString()
  });
}

function calculateLevel(score) {
  if (score <= 3) return "📘 Excel Level: Beginner";
  if (score <= 7) return "📗 Excel Level: Intermediate";
  return "📕 Excel Level: Advanced";
}

/* =========================================================
   Google Sheets Logging (via Apps Script web app)
   ========================================================= */

function sendResultsToGoogleSheets(data) {
  if (
    !GOOGLE_SHEETS_WEB_APP_URL ||
    GOOGLE_SHEETS_WEB_APP_URL.includes("PASTE_YOUR_WEB_APP_URL_HERE")
  ) {
    // Tracking not configured; silently skip
    return;
  }

  try {
    fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors", // allows POST without waiting for response
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(data)
    }).catch(function (err) {
      console.error("Error sending quiz results:", err);
    });
  } catch (err) {
    console.error("Fetch not supported or failed:", err);
  }
}
