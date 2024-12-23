---
layout: cv
title: "Design and Create your profesional Resume with ResumeBuilder"
permalink: /blog/test2.html
---


<div id="resumeCarousel" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    {% for post in site.tags['cv'] %}
      <div class="carousel-item {% if forloop.first %}active{% endif %}">
        <iframe src="{{ post.url }}#resume-content" frameborder="0" width="100%" height="500px"></iframe>
      </div>
    {% endfor %}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#resumeCarousel" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#resumeCarousel" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>