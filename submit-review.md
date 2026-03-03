---
layout: default
title: Submit Spreadsheet for Review
permalink: /submit-review/
description: Upload your Excel spreadsheet for a free professional review with optional priority turnaround.
---

<section class="section" style="max-width:800px; margin:0 auto;">

<h1>Submit Your Spreadsheet for Review</h1>

<p style="font-size:1.15rem; margin-top:15px;">
Upload your file and tell me what you'd like help improving.
</p>

<p>
You’ll receive a structured review within 1–2 business days.
</p>

<hr style="margin:40px 0;">

<form
  action="https://formspree.io/f/xkorakaq"
  method="POST"
  enctype="multipart/form-data"
  accept-charset="UTF-8"
  class="contact-form"
>

  <div class="contact-row">
    <input
      type="text"
      name="name"
      placeholder="Your Name"
      required
    />

    <input
      type="email"
      name="email"
      placeholder="Your Email"
      required
    />
  </div>

  <textarea
    name="description"
    placeholder="What does this spreadsheet do? What feels inefficient, confusing, or fragile?"
    rows="6"
    required
  ></textarea>

  <!-- Goal of Review -->
  <p style="margin-top:25px;"><strong>Primary Goal of This Review</strong></p>

  <select name="review_goal" required style="margin-top:10px; width:
