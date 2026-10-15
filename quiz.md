---
layout: default
title: Excel Knowledge Quiz
description: "Test your Excel skills with interactive formula challenges across Basic, Intermediate, and Advanced tiers."
permalink: /quiz/
---

<section class="quiz-section section">
  <h1>Excel Knowledge Quiz</h1>

  <p class="quiz-intro">
    Think you know Excel? Prove it. Three levels of hands-on formula challenges —
    type the actual formula, not just the answer.
  </p>

  <iframe
    id="excel-quiz-frame"
    src="/quiz-app/excel-quiz.html"
    width="100%"
    style="border:none; min-height:600px;"
    title="Excel Knowledge Quiz"
    loading="lazy">
  </iframe>
</section>

<script>
window.addEventListener('message', function(e) {
  if (e.origin !== window.location.origin) return;
  if (e.data && e.data.type === 'quiz-resize' && e.data.height) {
    var f = document.getElementById('excel-quiz-frame');
    if (f) f.style.height = e.data.height + 'px';
  }
});
</script>
