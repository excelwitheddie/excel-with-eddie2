---
layout: default
title: Excel Knowledge Quiz
---

<section class="quiz-section section">
  <h1>Excel Knowledge Quiz</h1>

  <p style="font-size:1.15rem;">
    Choose your difficulty and test your Excel skills.
  </p>

  <!-- START BUTTONS -->
  <div class="quiz-start-buttons">
    <button class="quiz-btn" onclick="startQuiz('beginner')">Beginner</button>
    <button class="quiz-btn" onclick="startQuiz('intermediate')">Intermediate</button>
    <button class="quiz-btn" onclick="startQuiz('advanced')">Advanced</button>
  </div>

  <!-- PROGRESS -->
  <div id="progressWrapper" style="display:none;margin:25px auto;width:80%;max-width:500px;">
    <div id="progressBar" style="height:12px;width:0%;background:#16a085;border-radius:8px;"></div>
  </div>

  <p id="questionCounter" style="display:none;"></p>

  <!-- QUIZ CONTENT -->
  <div id="quizContainer"></div>
</section>

<script src="/assets/js/quiz.js"></script>
