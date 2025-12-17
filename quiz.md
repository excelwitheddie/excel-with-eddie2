---
layout: default
title: Excel Knowledge Quiz
---

<section id="quizPage" style="max-width:900px; margin:0 auto; text-align:center; padding:20px 10px;">
  <h1>Excel Knowledge Quiz</h1>

  <p style="font-size:1.15rem; color:#0a3c5a;">
    Choose your difficulty and test your Excel skills.
    Your final score, level, and performance chart will appear at the end.
  </p>

  <p style="font-size:1rem; color:#083c5a; margin-top:15px;">
    1-on-1 Excel tutoring available —
    <strong>$70</strong> per session,
    <strong>$175</strong> for 3 sessions, or
    <strong>$550</strong> for 10 sessions.
  </p>

  <!-- ========================= -->
  <!-- DIFFICULTY SELECTION -->
  <!-- ========================= -->
  <div id="difficultySelect" style="margin-top:25px;">
    <p style="font-weight:600; color:#083c5a; margin-bottom:10px;">
      Select your level to begin:
    </p>

    <button class="quiz-btn" onclick="startQuiz('beginner')">
      Beginner
    </button>

    <button class="quiz-btn" onclick="startQuiz('intermediate')">
      Intermediate
    </button>

    <button class="quiz-btn" onclick="startQuiz('advanced')">
      Advanced
    </button>
  </div>

  <!-- ========================= -->
  <!-- PROGRESS BAR -->
  <!-- ========================= -->
  <div
    id="progressWrapper"
    style="display:none; margin:30px auto; width:80%; max-width:500px; background:#eee; border-radius:8px;"
  >
    <div
      id="progressBar"
      style="height:12px; width:0%; background:#009a63; border-radius:8px; transition:width 0.3s;"
    ></div>
  </div>

  <!-- QUESTION COUNTER -->
  <p
    id="questionCounter"
    style="font-size:1rem; color:#083c5a; margin-top:10px; display:none;"
  ></p>

  <!-- QUIZ CONTENT -->
  <div id="quizContainer" style="margin-top:20px;"></div>

  <!-- RESULTS CHART -->
  <div id="quizChart" style="margin:40px auto; max-width:500px;"></div>
</section>

<style>
.quiz-btn {
  padding: 12px 26px;
  background: #083c5a;
  color: #ffffff;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  margin: 10px;
  font-size: 1.1rem;
  min-width: 140px;
}
.quiz-btn:hover {
  background: #009a63;
}

.answer-btn {
  display: block;
  margin: 12px auto;
  padding: 12px 20px;
  background: #ffffff;
  color: #083c5a;
  border: 2px solid #083c5a;
  border-radius: 6px;
  cursor: pointer;
  font-size: 1rem;
  width: 80%;
  max-width: 420px;
}
.answer-btn:hover {
  background: #083c5a;
  color: #ffffff;
}

.explanation {
  margin-top: 14px;
  font-size: 1rem;
}

.result-screen {
  margin-top: 40px;
  padding: 20px;
}
</style>

<!-- ========================= -->
<!-- GOOGLE CHARTS -->
<!-- ========================= -->
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!-- ========================= -->
<!-- QUIZ LOGIC -->
<!-- ========================= -->
<script src="/assets/js/quiz.js" defer></script>
