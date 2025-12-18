---
layout: default
title: Excel Knowledge Quiz
---

<section style="max-width:900px;margin:0 auto;text-align:center;padding-top:20px;">
  <h1>Excel Knowledge Quiz</h1>

  <p style="font-size:1.15rem;color:#0a3c5a;">
    Choose your difficulty and test your Excel skills.
    Your score, level, and chart appear at the end.
  </p>

  <!-- START BUTTONS -->
  <div class="quiz-start-buttons">
    <button class="quiz-btn" data-difficulty="beginner">Beginner</button>
    <button class="quiz-btn" data-difficulty="intermediate">Intermediate</button>
    <button class="quiz-btn" data-difficulty="advanced">Advanced</button>
  </div>

  <!-- PROGRESS -->
  <div id="progressWrapper" style="display:none;margin:25px auto;width:80%;max-width:500px;background:#eee;border-radius:8px;">
    <div id="progressBar" style="height:12px;width:0%;background:#009a63;border-radius:8px;"></div>
  </div>

  <!-- COUNTER -->
  <p id="questionCounter" style="display:none;color:#083c5a;"></p>

  <!-- QUIZ CONTENT -->
  <div id="quizContainer"></div>

  <!-- CHART -->
  <div id="quizChart" style="max-width:500px;margin:30px auto;"></div>
</section>

<script src="https://www.gstatic.com/charts/loader.js"></script>
<script src="/assets/js/quiz.js"></script>
