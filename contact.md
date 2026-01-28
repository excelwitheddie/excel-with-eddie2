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

  <form
    class="contact-form"
    action="https://formspree.io/f/xkorakaq"
    method="POST"
    accept-charset="UTF-8"
  >
    <div class="contact-row">
      <input
        type="text"
        name="name"
        placeholder="Your Name"
        autocomplete="name"
        required
      />

      <input
        type="email"
        name="email"
        placeholder="Your Email"
        autocomplete="email"
        required
      />
    </div>

    <textarea
      name="message"
      placeholder="How can I help you?"
      rows="6"
      required
    ></textarea>

    <!-- Helps replies go to the sender -->
    <input type="hidden" name="_replyto" value="" />

    <!-- Email subject -->
    <input
      type="hidden"
      name="_subject"
      value="New message from ExcelWithEddie.com"
    />

    <!-- Redirect after submit -->
    <input
      type="hidden"
      name="_next"
      value="https://excelwitheddie.com/thanks/"
    />

    <!-- Optional: cleaner email format -->
    <input type="hidden" name="_format" value="plain" />

    <!-- Honeypot (spam trap) -->
    <input
      type="text"
      name="_gotcha"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      style="position:absolute;left:-9999px;opacity:0;"
    />

    <button type="submit" class="quiz-btn">Send Message</button>
  </form>
</section>

<script>
  // Populate _replyto from the email field (Formspree uses it)
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.querySelector(".contact-form");
    if (!form) return;
    const email = form.querySelector('input[name="email"]');
    const replyTo = form.querySelector('input[name="_replyto"]');
    if (!email || !replyTo) return;

    const sync = () => (replyTo.value = email.value || "");
    email.addEventListener("input", sync);
    sync();
  });
</script>
