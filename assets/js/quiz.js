/* =========================================================
   Excel with Eddie - Quiz Script (Advanced Version)
   ========================================================= */

const questions = [
  { 
    q: "1. What is the result of the formula: =IF(A1>10, \"High\", \"Low\") when A1 = 12?",
    answers: ["High", "Low", "Error"],
    correct: 0,
    explanation: "Since 12 > 10, the IF function returns 'High'."
  },

  { 
    q: "2. Which formula returns the value in B2 if A2 = \"Yes\"?",
    answers: [
      "=IF(A2=\"Yes\", B2)",
      "=IF(A2=B2, \"Yes\")",
      "=IF(B2=\"Yes\", A2)"
    ],
    correct: 0,
    explanation: "The IF test is (A2=\"Yes\"), and the returned value is B2."
  },

  { 
    q: "3. What does =XLOOKUP(\"John\", A2:A10, B2:B10) return?",
    answers: [
      "The value in column B where A = John",
      "The row number where John appears",
      "Always returns an error unless sorted"
    ],
    correct: 0,
    explanation: "XLOOKUP returns the corresponding value from the return array."
  },

  { 
    q: "4. Which formula checks if C5 is between 10 and 20?",
    answers: [
      "=IF(C5>10<20, TRUE, FALSE)",
      "=AND(C5>=10, C5<=20)",
      "=IF(C5>=10 AND C5<=20)"
    ],
    correct: 1,
    explanation: "AND evaluates multiple logical conditions to ensure both are TRUE."
  },

  { 
    q: "5. What is the output of: =SUM(A1:A3) if A1=5, A2=\"3\", A3=2?",
    answers: ["10", "5", "Error"],
    correct: 0,
    explanation: "Excel converts the text '3' to a number automatically."
  },

  { 
    q: "6. What does =IFERROR(VLOOKUP(D1, A2:B10, 2, FALSE), \"Not Found\") return if D1 is not in the list?",
    answers: ["#N/A", "Not Found", "0"],
    correct: 1,
    explanation: "IFERROR replaces lookup errors with the custom message 'Not Found'."
  },

  { 
    q: "7. What is the correct formula to return TRUE only if A1 > B1 AND C1 = \"Complete\"?",
    answers: [
      "=IF(A1>B1 AND C1=\"Complete\", TRUE, FALSE)",
      "=AND(A1>B1, C1=\"Complete\")",
      "=OR(A1>B1, C1=\"Complete\")"
    ],
    correct: 1,
    explanation: "AND requires BOTH conditions to be TRUE."
  },

  { 
    q: "8. Given: A1=5, what does this formula return? =IF(AND(A1>2, A1<10), A1*2, A1*5)",
    answers: ["10", "25", "Error"],
    correct: 0,
    explanation: "Since 5 is between 2 and 10, Excel uses A1*2 = 10."
  },

  { 
    q: "9. What does =INDEX(B2:B10, MATCH(\"Item3\", A2:A10, 0)) return?",
    answers: [
      "The value in column B for Item3",
      "The row number of Item3",
      "The text 'Item3'"
    ],
    correct: 0,
    explanation: "MATCH finds the row; INDEX returns the matching value."
  },

  { 
    q: "10. What is the result of =IF(A1=\"Yes\", IF(B1>5, \"Approved\", \"Review\"), \"Rejected\") when A1=\"Yes\" and B1=3?",
    answers: ["Approved", "Review", "Rejected"],
    correct: 1,
    explanation: "Nested IF: A1 = Yes → evaluate B1; 3 > 5? No → 'Review'."
  },
];

questions.sort(() => Math.random() - 0.5);

let currentIndex = 0;
let score = 0;

/* =========================================================
   QUIZ CORE FUNCTIONS
   ========================================================= */

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

  container.innerHTML = `
    <h2>${q.q}</h2>
    ${q.answers
      .map((ans, i) => `<button class="answer-btn" onclick="submitAnswer(${i})">${ans}</button>`)
      .join("")}
    <p id="explanation" class="explanation"></p>
  `;

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
    </div>
  `;
}

function calculateLevel(score) {
  if (score <= 3) return "📘 Excel Level: Beginner";
  if (score <= 7) return "📗 Excel Level: Intermediate";
  return "📕 Excel Level: Advanced";
}
