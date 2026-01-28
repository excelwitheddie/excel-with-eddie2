---
layout: default
title: Contact
---

<section class="contact-section">
  <h1>Contact Me</h1>

  <p class="contact-intro">
    Have a question or want to schedule something custom?
    Send me a message below — I respond quickly.
  </p>

  <!-- FORM: sends to Formspree -->
  <form
    class="contact-form"
    action="https://formspree.io/f/xkorakaq"
    method="POST"
  >
    <div class="contact-row">
      <input type="text" name="name" placeholder="Your Name" required>
      <input type="email" name="email" placeholder="Your Email" required>
    </div>

    <textarea name="message" placeholder="How can I help you?" required></textarea>

    <!-- helpful metadata -->
    <input type="hidden" name="_subject" value="New message from ExcelWithEddie.com">
    <input type="hidden" name="page" value="contact">
    <input type="text" name="_gotcha" style="display:none">

    <button type="submit" class="quiz-btn">Send Message</button>
  </form>
</section>
