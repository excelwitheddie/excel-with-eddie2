---
layout: default
title: Excel Knowledge Quiz
---

<section style="max-width:900px; margin:0 auto; text-align:center;">
  <h1>Excel Knowledge Quiz</h1>
  <p style="font-size:1.15rem; color:#0a3c5a;">
    Test your Excel skills with this 10-question quiz. Your final score and skill level will appear at the end!
  </p>

  <p style="font-size:1rem; color:#083c5a; margin-top:15px;">
    Want personalized Excel coaching?  
    1-on-1 tutoring available — <strong>$70</strong> per session,  
    <strong>$175</strong> for 3 sessions, or <strong>$550</strong> for 10 sessions.
  </p>

  <!-- Progress bar -->
  <div id="progressWrapper" style="display:none; margin:20px auto; width:80%; max-width:500px; background:#eee; border-radius:8px;">
    <div id="progressBar" style="height:12px; width:0%; background:#009a63; border-radius:8px; transition:width 0.3s;"></div>
  </div>

  <!-- Question counter -->
  <p id="questionCounter" style="font-size:1rem; color:#083c5a; margin-top:10px; display:none;"></p>

  <!-- Quiz container -->
  <div id="quizContainer"></div>

  <!-- Start button -->
  <button id="startBtn" onclick="startQuiz()" class="quiz-btn">
    Start Quiz
  </button>

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
  transition: background 0.3s, color 0.3s;
}
.answer-btn:hover {
  background: #083c5a;
  color: white;
}

.explanation {
  margin-top: 10px;
  font-size: 0.95rem;
}

.result-screen {
  margin-top: 30px;
  padding: 20px;
}
</style>

<!-- Load the external quiz JS file -->
<script src="/assets/js/quiz.js"></script>
