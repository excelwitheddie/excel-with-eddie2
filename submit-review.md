---
layout: default
title: Submit Spreadsheet for Review
permalink: /submit-review/
description: Upload your Excel spreadsheet for a free professional review and structured feedback.
---

<section class="section" style="max-width:800px; margin:0 auto;">

<h1>Submit Your Spreadsheet for Review</h1>

<p style="font-size:1.15rem; margin-top:15px;">
Upload your file below and briefly describe what you'd like feedback on.
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
    placeholder="Briefly describe what this spreadsheet is used for and what feels frustrating or inefficient."
    rows="6"
    required
  ></textarea>

  <p style="margin-top:20px;"><strong>Upload Spreadsheet (Excel file)</strong></p>

  <input
    type="file"
    name="attachment"
    accept=".xlsx,.xls,.xlsm,.csv"
    style="margin-top:10px;"
  />

  <p style="margin-top:20px;">
    Or paste a Google Drive / OneDrive link:
  </p>

  <input
    type="url"
    name="file_link"
    placeholder="Paste shareable link here (optional)"
  />

  <p style="margin-top:20px; font-size:0.9rem;">
    Please remove any sensitive data if necessary before submitting.
  </p>

  <!-- Subject line -->
  <input
    type="hidden"
    name="_subject"
    value="New Spreadsheet Review Submission"
  />

  <!-- Redirect after submission -->
  <input
    type="hidden"
    name="_next"
    value="https://excelwitheddie.com/thanks-review/"
  />

  <!-- Honeypot spam trap -->
  <input
    type="text"
    name="_gotcha"
    style="position:absolute;left:-9999px;opacity:0;height:0;width:0;"
  />

  <button type="submit" class="quiz-btn" style="margin-top:25px;">
    Submit for Free Review
  </button>

</form>

</section>
