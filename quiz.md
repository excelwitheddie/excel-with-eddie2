---
layout: default
title: Excel Knowledge Quiz
---

<section style="max-width:900px; margin:0 auto; text-align:center;">
  <h1>Excel Knowledge Quiz</h1>
  <p style="font-size:1.15rem; color:#0a3c5a;">
    Test your Excel skills with this 10-question quiz. Your score will appear at the end!
  </p>

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
}
.answer-btn:hover {
  background: #083c5a;
  color: white;
}

.explanation {
  margin-top: 10px;
  font-size: 0.95rem;
  color: #009a63;
}

.result-screen {
  margin-top: 30px;
  padding: 20px;
}
</style>

<script>
const questions = [
  {
    q: "1. What does the SUM formula do?",
    answers: ["Adds numbers", "Finds the largest value", "Counts blank cells"],
    correct: 0,
    explanation: "SUM adds all numbers in a selected range."
  },
  {
    q: "2. What does a PivotTable help you do?",
    answers: ["Format cells", "Summarize and analyze data", "Create macros"],
    correct: 1,
    explanation: "PivotTables help summarize large datasets quickly."
  },
  {
    q: "3. Which formula performs a lookup?",
    answers: ["SUM", "XLOOKUP", "ROUND"],
    correct: 1,
    explanation: "XLOOKUP is Excel's most powerful lookup function."
  },
  {
    q: "4. What keyboard shortcut selects the entire column?",
    answers: ["Ctrl + C", "Ctrl + Space", "Shift + Enter"],
    correct: 1,
    explanation: "Ctrl + Space selects the entire column."
  },
  {
    q: "5. Which tool removes duplicate values?",
    answers: ["Remove Duplicates", "Sort", "Data Validation"],
    correct: 0,
    explanation: "Excel has a built-in 'Remove Duplicates' tool in the Data tab."
  },
  {
    q: "6. What does Ctrl + 1 do in Excel?",
    answers: ["Open Format Cells", "Open a new workbook", "Paste values only"],
    correct: 0,
    explanation: "Ctrl + 1 opens the Format Cells dialog box."
  },
  {
    q: "7. What does the IF function do?",
    answers: ["Returns a value based on a condition", "Finds duplicates", "Sorts data"],
    correct: 0,
    explanation: "IF allows conditional logic."
  },
  {
    q: "8. Which is NOT a valid chart type?",
    answers: ["Bubble Chart", "Radar Chart", "Sequence Chart"],
    correct: 2,
    explanation: "Excel has no 'Sequence Chart' type."
  },
  {
    q: "9. What does VLOOKUP require?",
    answers: ["Data sorted alphabetically", "Lookup value in the leftmost column", "Filter applied first"],
    correct: 1,
    explanation: "VLOOKUP only works when the lookup column is the leftmost column."
  },
  {
    q: "10. What does Flash Fill do?",
    answers: ["Fills formulas automatically", "Recognizes patterns and fills values", "Creates dropdown lists"],
    correct: 1,
    explanation: "Flash Fill learns patterns and fills in formatting or text automatically."
  }
];

let currentIndex = 0;
let score = 0;

function startQuiz() {
  document.getElementById("startBtn").style.display = "none";
  showQuestion();
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
  container.innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${questions.length}</h2>
      <p style="font-size:1.1rem; color:#083c5a;">Thanks for taking the quiz!</p>
      <button class="quiz-btn" onclick="location.reload()">Try Again</button>
    </div>
  `;
}
</script>
