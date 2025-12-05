---
layout: default
title: Contact
---

<section class="section" style="text-align:center; max-width:600px; margin:auto;">
  <h1>Contact Me</h1>
  <p>Have a question? Want to schedule something custom? Send me a message below — I respond quickly!</p>

  <form action="https://formsubmit.co/eddie@excelwitheddie.com" method="POST" class="contact-form">

    <!-- Required hidden fields -->
    <input type="hidden" name="_captcha" value="false">
    <input type="hidden" name="_subject" value="New message from ExcelWithEddie.com">
    <input type="hidden" name="_template" value="box">
    <input type="hidden" name="_next" value="https://excelwitheddie.com/thank-you">

    <input type="text" name="name" placeholder="Your Name" required>
    <input type="email" name="email" placeholder="Your Email" required>

    <textarea name="message" placeholder="How can I help you?" rows="6" required></textarea>

    <button type="submit" class="cta-btn">Send Message</button>
  </form>
</section>
