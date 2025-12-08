/* =========================================================
   Excel with Eddie - Quiz Script + Difficulty + Charts + Sheets
   ========================================================= */

const GOOGLE_SHEETS_WEB_APP_URL =
  "https://script.google.com/macros/s/AKfycbxwtUQPY5ZcpwfRUMEj33kSLEV-Fkq0FBcGIYMhl5UmvcHC6cmBES__FVBrtvs053TC/exec";

/* ---------------------------------------------------------
   QUESTION BANK BY DIFFICULTY
   (Add more questions anytime using same structure)
--------------------------------------------------------- */
const questionBank = {
  beginner: [
    {
      q: "What does the SUM function do?",
      answers: ["Adds numbers in a range", "Counts text cells", "Sorts values"],
      correct: 0,
      explanation: "SUM adds all the numeric values in a specified range."
    },
    {
      q: "Which of these is a valid cell reference?",
      answers: ["1A", "A1", "AA0"],
      correct: 1,
      explanation: "Cell references start with column letter(s) followed by row number (e.g., A1)."
    },
    {
      q: "Which shortcut saves your workbook?",
      answers: ["Ctrl + S", "Ctrl + P", "Ctrl + Z"],
      correct: 0,
      explanation: "Ctrl + S saves your workbook."
    },
    {
      q: "Which function counts numeric cells?",
      answers: ["COUNT", "COUNTA", "COUNTBLANK"],
      correct: 0,
      explanation: "COUNT counts cells that contain numbers."
    },
    {
      q: "Which symbol starts a formula in Excel?",
      answers: ["#", "=", "$"],
      correct: 1,
      explanation: "All formulas in Excel begin with =."
    },
    {
      q: "Which tool changes number formatting (currency, percent, etc.)?",
      answers: ["Format Cells", "Sort & Filter", "Find & Replace"],
      correct: 0,
      explanation: "Format Cells controls display formats like currency and percentages."
    },
    {
      q: "Which function finds the average of a range?",
      answers: ["SUM", "AVERAGE", "MEDIAN"],
      correct: 1,
      explanation: "AVERAGE returns the arithmetic mean of values in a range."
    },
    {
      q: "What does Ctrl + Z do?",
      answers: ["Undo last action", "Redo last action", "Open print dialog"],
      correct: 0,
      explanation: "Ctrl + Z undoes your last action."
    },
    {
      q: "Which function returns the largest number in a range?",
      answers: ["MAX", "MIN", "LARGE"],
      correct: 0,
      explanation: "MAX returns the highest value in the range."
    },
    {
      q: "Which of these is a basic chart type in Excel?",
      answers: ["Scatter", "Flowchart", "Network graph"],
      correct: 0,
      explanation: "Scatter charts are built-in; flowcharts/network graphs are not native Excel chart types."
    }
  ],
  intermediate: [
    {
      q: "Which function adds values that meet a single condition?",
      answers: ["SUM", "SUMIF", "COUNTIF"],
      correct: 1,
      explanation: "SUMIF adds values that meet one specified condition."
    },
    {
      q: "Which function counts cells that match a condition?",
      answers: ["SUMIF", "COUNTIF", "COUNTA"],
      correct: 1,
      explanation: "COUNTIF counts cells that meet a single condition."
    },
    {
      q: "What does a PivotTable do?",
      answers: ["Summarizes data", "Formats text", "Protects a sheet"],
      correct: 0,
      explanation: "PivotTables are used to summarize and analyze large data sets."
    },
    {
      q: "What does VLOOKUP require?",
      answers: [
        "Lookup column must be the leftmost",
        "Data must be sorted ascending",
        "Return column must be the leftmost"
      ],
      correct: 0,
      explanation: "VLOOKUP expects the lookup column to be the leftmost in the table_array."
    },
    {
      q: "Which function replaced VLOOKUP in modern Excel?",
      answers: ["HLOOKUP", "XLOOKUP", "INDEX"],
      correct: 1,
      explanation: "XLOOKUP is more flexible and is the modern replacement for VLOOKUP."
    },
    {
      q: "What does the $ symbol do in a reference like $A$1?",
      answers: [
        "Turns text to currency",
        "Creates an absolute reference",
        "Highlights the cell"
      ],
      correct: 1,
      explanation: "$ locks the column and row so they don't change when copied."
    },
    {
      q: "Which feature visually highlights values based on rules?",
      answers: [
        "Conditional Formatting",
        "Data Validation",
        "Freeze Panes"
      ],
      correct: 0,
      explanation: "Conditional Formatting applies visual styles based on rules."
    },
    {
      q: "Which function returns the position of a value in a range?",
      answers: ["INDEX", "MATCH", "OFFSET"],
      correct: 1,
      explanation: "MATCH returns the relative position of a value in a range."
    },
    {
      q: "Which function combines text from multiple cells?",
      answers: ["TEXTJOIN or CONCAT", "SPLIT", "LEFT"],
      correct: 0,
      explanation: "TEXTJOIN and CONCAT are used to combine text from multiple cells."
    },
    {
      q: "Which function would you use to add numbers that meet multiple conditions?",
      answers: ["SUMIF", "SUMIFS", "COUNTIFS"],
      correct: 1,
      explanation: "SUMIFS adds numbers that meet multiple criteria."
    }
  ],
  advanced: [
    {
      q: "Which formula returns the value in B2 if A2 > 10, otherwise 0?",
      answers: [
        "=IF(A2>10,B2,0)",
        "=IF(B2>10,A2,0)",
        "=IF(A2<10,B2,0)"
      ],
      correct: 0,
      explanation: "IF(A2>10,B2,0) tests A2 and returns B2 or 0."
    },
    {
      q: "What does =INDEX(B2:B10, MATCH(\"Item3\", A2:A10, 0)) do?",
      answers: [
        "Returns the value from B where A = \"Item3\"",
        "Returns the row number of Item3",
        "Returns the text \"Item3\""
      ],
      correct: 0,
      explanation: "MATCH finds the row; INDEX returns the value from column B."
    },
    {
      q: "Which function can look left, right, up, or down in a range?",
      answers: ["VLOOKUP", "HLOOKUP", "XLOOKUP"],
      correct: 2,
      explanation: "XLOOKUP can search in any direction."
    },
    {
      q: "Which formula checks if C5 is between 10 and 20 (inclusive)?",
      answers: [
        "=IF(C5>10<20,TRUE,FALSE)",
        "=AND(C5>=10,C5<=20)",
        "=IF(C5>=10 AND C5<=20,TRUE)"
      ],
      correct: 1,
      explanation: "AND(C5>=10,C5<=20) returns TRUE only when C5 is in that range."
    },
    {
      q: "What does this return: =SUMPRODUCT(A2:A10,B2:B10)?",
      answers: [
        "Sum of A plus B",
        "Sum of A multiplied by B row-by-row",
        "Average of A and B"
      ],
      correct: 1,
      explanation: "SUMPRODUCT multiplies pairs and sums the results."
    },
    {
      q: "What does =IFERROR(XLOOKUP(D2,A2:A10,B2:B10),\"Not Found\") do?",
      answers: [
        "Returns #N/A if not found",
        "Returns \"Not Found\" instead of an error",
        "Forces exact match only"
      ],
      correct: 1,
      explanation: "IFERROR replaces lookup errors with the message \"Not Found\"."
    },
    {
      q: "Which function returns a dynamic filtered list based on criteria?",
      answers: ["FILTER", "SORT", "UNIQUE"],
      correct: 0,
      explanation: "FILTER returns only rows that match criteria (in dynamic array Excel)."
    },
    {
      q: "What does =UNIQUE(A2:A20) do?",
      answers: [
        "Removes duplicates and returns distinct values",
        "Sorts values",
        "Counts unique items only"
      ],
      correct: 0,
      explanation: "UNIQUE spills a list of distinct values."
    },
    {
      q: "Which formula returns the last non-blank value in column A?",
      answers: [
        "=LOOKUP(2,1/(A:A<>\"\"),A:A)",
        "=INDEX(A:A,COUNT(A:A))",
        "=MAX(A:A)"
      ],
      correct: 0,
      explanation: "LOOKUP with 2,1/(A:A<>\"\") is a classic pattern to get the last non-blank."
    },
    {
      q: "Which feature is best for building interactive dashboards?",
      answers: [
        "PivotTables + Slicers",
        "Spell Check",
        "Goal Seek"
      ],
      correct: 0,
      explanation: "PivotTables with slicers are core to interactive dashboards."
    }
  ]
};

/* ---------------------------------------------------------
   QUIZ STATE
--------------------------------------------------------- */
let currentIndex = 0;
let score = 0;
let currentSet = [];
let currentDifficulty = "";

/* Utility: random subset of questions */
function getRandomQuestions(sourceArray, count) {
  const copy = [...sourceArray];
  const result = [];
  const n = Math.min(count, copy.length);

  for (let i = 0; i < n; i++) {
    const idx = Math.floor(Math.random() * copy.length);
    result.push(copy.splice(idx, 1)[0]);
  }
  return result;
}

/* ---------------------------------------------------------
   START QUIZ (with difficulty)
--------------------------------------------------------- */
function startQuiz(difficulty) {
  currentDifficulty = difficulty || "beginner";
  currentIndex = 0;
  score = 0;

  // build a random set of up to 10 questions from chosen difficulty
  currentSet = getRandomQuestions(questionBank[currentDifficulty], 10);

  // show UI elements
  const progressWrapper = document.getElementById("progressWrapper");
  const questionCounter = document.getElementById("questionCounter");
  if (progressWrapper) progressWrapper.style.display = "block";
  if (questionCounter) questionCounter.style.display = "block";

  showQuestion();
  updateProgress();
}

/* ---------------------------------------------------------
   UPDATE PROGRESS
--------------------------------------------------------- */
function updateProgress() {
  if (!currentSet.length) return;

  const percent = (currentIndex / currentSet.length) * 100;
  const bar = document.getElementById("progressBar");
  const counter = document.getElementById("questionCounter");

  if (bar) bar.style.width = percent + "%";
  if (counter) {
    counter.textContent = `Question ${currentIndex + 1} of ${currentSet.length} (${capitalize(currentDifficulty)})`;
  }
}

function capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

/* ---------------------------------------------------------
   SHOW QUESTION
--------------------------------------------------------- */
function showQuestion() {
  const container = document.getElementById("quizContainer");
  if (!container || !currentSet.length) return;

  const q = currentSet[currentIndex];

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

  if (isCorrect) {
    score++;
    explanation.style.color = "#009a63";
    explanation.textContent = "Correct! " + q.explanation;
  } else {
    explanation.style.color = "red";
    explanation.textContent = "Incorrect. " + q.explanation;
  }

  // Disable all answer buttons
  document.querySelectorAll(".answer-btn").forEach(btn => {
    btn.disabled = true;
    btn.style.cursor = "default";
  });

  // Show navigation
  showNavigationButtons();
}

/* ---------------------------------------------------------
   NEXT / QUIT CONTROLS
--------------------------------------------------------- */
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
  if (currentIndex < currentSet.length) {
    showQuestion();
  } else {
    showResults();
  }
}

function quitQuiz() {
  showResults();
}

/* ---------------------------------------------------------
   RESULTS + GOOGLE SHEETS + CHART
--------------------------------------------------------- */
function showResults() {
  const container = document.getElementById("quizContainer");
  const progressWrapper = document.getElementById("progressWrapper");
  const questionCounter = document.getElementById("questionCounter");

  if (progressWrapper) progressWrapper.style.display = "none";
  if (questionCounter) questionCounter.style.display = "none";

  const total = currentSet.length || 10;
  const level = calculateLevel(score, total);

  if (!container) return;

  container.innerHTML = `
    <div class="result-screen">
      <h2>Your Score: ${score} / ${total}</h2>
      <h3>${level}</h3>
      <p style="margin-top:10px;">
        Difficulty: <strong>${capitalize(currentDifficulty)}</strong>
      </p>

      <p style="margin-top:10px;">
        Want help improving your Excel skills? Book a session anytime.
      </p>

      <a href="/book" class="quiz-btn">Book a Tutoring Session</a>

      <p style="margin-top:20px;">Or try again:</p>
      <button class="quiz-btn" onclick="location.reload()">Retake Quiz</button>
    </div>
  `;

  // Log to Google Sheets
  sendResultsToGoogleSheets({
    score: score,
    totalQuestions: total,
    level: level,
    difficulty: currentDifficulty,
    page: window.location.href,
    timestamp: new Date().toISOString()
  });

  // Draw Google Chart
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
function sendResultsToGoogleSheets(data) {
  if (!GOOGLE_SHEETS_WEB_APP_URL) return;

  try {
    fetch(GOOGLE_SHEETS_WEB_APP_URL, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(data)
    });
  } catch (e) {
    console.error("Error sending quiz results:", e);
  }
}

/* ---------------------------------------------------------
   GOOGLE CHARTS (PERFORMANCE DONUT)
--------------------------------------------------------- */
function drawResultsChart(correct, total) {
  if (typeof google === "undefined" || !google.charts) {
    // If the loader hasn't finished yet, try again shortly
    setTimeout(() => drawResultsChart(correct, total), 300);
    return;
  }

  google.charts.load("current", { packages: ["corechart"] });
  google.charts.setOnLoadCallback(() => {
    const incorrect = total - correct;
    const data = google.visualization.arrayToDataTable([
      ["Result", "Count"],
      ["Correct", correct],
      ["Incorrect", incorrect]
    ]);

    const options = {
      title: "Your Performance",
      legend: { position: "bottom" },
      pieHole: 0.45,
      chartArea: { width: "90%", height: "70%" }
    };

    const chartDiv = document.getElementById("quizChart");
    if (!chartDiv) return;

    const chart = new google.visualization.PieChart(chartDiv);
    chart.draw(data, options);
  });
}

/* ---------------------------------------------------------
   EXPOSE FUNCTIONS GLOBALLY FOR INLINE HANDLERS
--------------------------------------------------------- */
window.startQuiz = startQuiz;
window.submitAnswer = submitAnswer;
window.nextQuestion = nextQuestion;
window.quitQuiz = quitQuiz;
window.showQuestion = showQuestion;
