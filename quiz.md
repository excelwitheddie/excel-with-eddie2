---
layout: default
title: Excel Knowledge Quiz
---

<section style="max-width:900px; margin:0 auto; text-align:center; padding-top:20px;">
  <h1>Excel Knowledge Quiz</h1>

  <p style="font-size:1.15rem; color:#0a3c5a;">
    Choose your difficulty and test your Excel skills.  
    Your final score, level, and a performance chart will appear at the end!
  </p>

  <p style="font-size:1rem; color:#083c5a; margin-top:15px;">
    1-on-1 Excel tutoring available — <strong>$70</strong> per session,  
    <strong>$175</strong> for 3 sessions, or <strong>$550</strong> for 10 sessions.
  </p>

  <!-- Difficulty selection -->
  <div style="margin-top:25px;">
    <p style="font-weight:600; color:#083c5a;">Select your level to begin:</p>
    <button class="quiz-btn" onclick="startQuiz('beginner')">Beginner</button>
    <button class="quiz-btn" onclick="startQuiz('intermediate')" style="margin-left:10px;">Intermediate</button>
    <button class="quiz-btn" onclick="startQuiz('advanced')" style="margin-left:10px;">Advanced</button>
  </div>

  <!-- Progress bar -->
  <div id="progressWrapper" style="display:none; margin:25px auto; width:80%; max-width:500px; background:#eee; border-radius:8px;">
    <div id="progressBar" style="height:12px; width:0%; background:#009a63; border-radius:8px; transition:width 0.3s;"></div>
  </div>

  <!-- Question counter -->
  <p id="questionCounter" style="font-size:1rem; color:#083c5a; margin-top:10px; display:none;"></p>

  <!-- Quiz display area -->
  <div id="quizContainer" style="margin-top:20px;"></div>

  <!-- Chart container -->
  <div id="quizChart" style="margin:30px auto; max-width:500px;"></div>
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
  font-size: 1.1rem;
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
  transition: background 0.3s, color 0.3s;
}
.answer-btn:hover {
  background: #083c5a;
  color: white;
}

.explanation {
  margin-top: 12px;
  font-size: 1rem;
}

.result-screen {
  margin-top: 40px;
  padding: 20px;
}
</style>

<!-- Google Charts loader -->
<script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>

<!-- Load external script -->
<script src="/assets/js/quiz.js"></script>
