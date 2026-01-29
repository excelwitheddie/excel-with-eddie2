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
    id="contactForm"
    class="contact-form"
    action="https://formspree.io/f/xkorakaq"
    method="POST"
    accept-charset="UTF-8"
  >
    <div class="contact-row">
      <input type="text" name="name" placeholder="Your Name" autocomplete="name" required />
      <input type="email" name="email" placeholder="Your Email" autocomplete="email" required />
    </div>

    <textarea name="message" placeholder="How can I help you?" rows="6" required></textarea>

    <input type="hidden" name="_subject" value="New message from ExcelWithEddie.com" />

    <!-- honeypot -->
    <input
      type="text"
      name="_gotcha"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      style="position:absolute;left:-9999px;opacity:0;"
    />

    <button type="submit" class="quiz-btn">Send Message</button>

    <p id="contactStatus" style="margin-top:14px; display:none;"></p>
  </form>
</section>

<script>
  document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const status = document.getElementById("contactStatus");
    if (!form || !status) return;

    form.addEventListener("submit", async (e) => {
      e.preventDefault();

      status.style.display = "block";
      status.style.color = "#083c5a";
      status.textContent = "Sending…";

      try {
        const res = await fetch(form.action, {
          method: "POST",
          body: new FormData(form),
          headers: { "Accept": "application/json" }
        });

        if (res.ok) {
          form.reset();
          window.location.href = "/thanks/";
        } else {
          status.style.color = "#b00020";
          status.textContent = "Something went wrong. Please try again.";
        }
      } catch (err) {
        status.style.color = "#b00020";
        status.textContent = "Network error. Please try again.";
      }
    });
  });
</script>
