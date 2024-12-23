---
layout: cv
title: "Design and Create your profesional Resume with ResumeBuilder"
permalink: /blog/test.html
---

<style>
.carousel {
  max-height: 500px;
  overflow: hidden;
}

.carousel iframe {
  height: 500px;
  width: 100%;
  border: none;
}

</style>

<script>
document.querySelectorAll('iframe[resume]').forEach(iframe => {
  iframe.addEventListener('load', function () {
    const divSelector = iframe.getAttribute('resume');
    const iframeDoc = iframe.contentDocument || iframe.contentWindow.document;
    const specificDiv = iframeDoc.querySelector(divSelector);
    if (specificDiv) {
      iframe.contentWindow.document.body.innerHTML = '';
      iframe.contentWindow.document.body.appendChild(specificDiv.cloneNode(true));
    }
  });
});

</script>


<div id="carouselExample" class="carousel slide" data-bs-ride="carousel">
  <div class="carousel-inner">
    {% for post in site.tags['cv'] %}
    <div class="carousel-item {% if forloop.first %}active{% endif %}">
      <iframe 
        class="d-block w-100" 
        src="{{ post.url }}" 
        data-div-selector="#specific-div-id" 
        style="height: 500px; border: none;">
      </iframe>
    </div>
    {% endfor %}
  </div>
  <button class="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
    <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Previous</span>
  </button>
  <button class="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
    <span class="carousel-control-next-icon" aria-hidden="true"></span>
    <span class="visually-hidden">Next</span>
  </button>
</div>
