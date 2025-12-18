---
layout: default
title: Excel Knowledge Quiz
---

<section class="quiz-page">

  <h1>Excel Knowledge Quiz</h1>

  <p class="quiz-intro">
    Choose your difficulty and test your Excel skills.
    Your score, level, and performance chart appear at the end.
  </p>

  <!-- ========================= -->
  <!-- START BUTTONS -->
  <!-- ========================= -->
  <div class="quiz-start-buttons">
    <button class="quiz-btn" data-difficulty="beginner" type="button">
      Beginner
    </button>
    <button class="quiz-btn" data-difficulty="intermediate" type="button">
      Intermediate
    </button>
    <button class="quiz-btn" data-difficulty="advanced" type="button">
      Advanced
    </button>
  </div>

  <!-- ========================= -->
  <!-- PROGRESS BAR -->
  <!-- ========================= -->
  <div id="progressWrapper" class="quiz-progress" style="display:none;">
    <div id="progressBar"></div>
  </div>

  <!-- ========================= -->
  <!-- QUESTION COUNTER -->
  <!-- ========================= -->
  <p id="questionCounter" class="quiz-counter" style="display:none;"></p>

  <!-- ========================= -->
  <!-- QUIZ CONTENT -->
  <!-- ========================= -->
  <div id="quizContainer" class="quiz-container"></div>

  <!-- ========================= -->
  <!-- RESULTS CHART -->
  <!-- ========================= -->
  <div id="quizChart" class="quiz-chart"></div>

</section>

<!-- ========================= -->
<!-- GOOGLE CHARTS -->
<!-- ========================= -->
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!-- ========================= -->
<!-- QUIZ SCRIPT -->
<!-- ========================= -->
<script src="/assets/js/quiz.js" defer></script>
