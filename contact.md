---
layout: default
title: Contact
permalink: /contact/
---

<section class="contact-section section">
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
    novalidate
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

    <!-- Subject line in the email you receive -->
    <input
      type="hidden"
      name="_subject"
      value="New message from ExcelWithEddie.com"
    />

    <!-- Honeypot (spam trap) -->
    <input
      type="text"
      name="_gotcha"
      tabindex="-1"
      autocomplete="off"
      aria-hidden="true"
      style="position:absolute;left:-9999px;opacity:0;height:0;width:0;"
    />

    <button type="submit" class="quiz-btn">Send Message</button>

    <p id="contactStatus" style="margin-top:14px; display:none;"></p>
  </form>
</section>

<script>
  (function () {
    function ready(fn) {
      if (document.readyState !== "loading") fn();
      else document.addEventListener("DOMContentLoaded", fn);
    }

    ready(() => {
      const form = document.getElementById("contactForm");
      const status = document.getElementById("contactStatus");
      if (!form || !status) return;

      function setStatus(msg, color) {
        status.style.display = "block";
        status.style.color = color || "#083c5a";
        status.textContent = msg;
      }

      form.addEventListener("submit", async (e) => {
        e.preventDefault();

        // Basic front-end validation
        const name = form.querySelector('input[name="name"]');
        const email = form.querySelector('input[name="email"]');
        const message = form.querySelector('textarea[name="message"]');

        if (!name.value.trim() || !email.value.trim() || !message.value.trim()) {
          setStatus("Please fill out all fields.", "#b00020");
          return;
        }

        setStatus("Sending…", "#083c5a");

        try {
          const res = await fetch(form.action, {
            method: "POST",
            body: new FormData(form),
            headers: { Accept: "application/json" }
          });

          if (res.ok) {
            form.reset();
            window.location.assign("/thanks/");
            return;
          }

          // If Formspree returned JSON, it may contain helpful info
          let data = null;
          try { data = await res.json(); } catch (_) {}

          setStatus(
            (data && data.error) ? data.error : "Something went wrong. Please try again.",
            "#b00020"
          );
        } catch (err) {
          setStatus("Network error. Please try again.", "#b00020");
        }
      });
    });
  })();
</script>
