---
layout: default
title: Excel Knowledge Quiz
---

<section class="quiz-wrapper">
  <h1>Excel Knowledge Quiz</h1>

  <p class="quiz-intro">
    Choose your difficulty and test your Excel skills.
    Your score, level, and performance chart appear at the end.
  </p>

  <!-- START BUTTONS -->
  <div class="quiz-start-buttons">
    <button class="quiz-btn" data-difficulty="beginner">Beginner</button>
    <button class="quiz-btn" data-difficulty="intermediate">Intermediate</button>
    <button class="quiz-btn" data-difficulty="advanced">Advanced</button>
  </div>

  <!-- PROGRESS -->
  <div id="progressWrapper" class="quiz-progress" hidden>
    <div id="progressBar"></div>
  </div>

  <!-- COUNTER -->
  <p id="questionCounter" hidden></p>

  <!-- QUIZ CONTENT -->
  <div id="quizContainer"></div>

  <!-- CHART -->
  <div id="quizChart" class="quiz-chart"></div>
</section>

<!-- Google Charts -->
<script src="https://www.gstatic.com/charts/loader.js"></script>

<!-- Quiz Script -->
<script src="/assets/js/quiz.js" defer></script>
