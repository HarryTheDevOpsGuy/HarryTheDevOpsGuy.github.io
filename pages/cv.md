---
layout: default
title: "Resume"
---

<h2>{{ site.data.resume.personal_info.name }}</h2>
<p>{{ site.data.resume.personal_info.title }}</p>
<p>Email: <a href="mailto:{{ site.data.resume.personal_info.email }}">{{ site.data.resume.personal_info.email }}</a></p>
<p>Phone: {{ site.data.resume.personal_info.phone }}</p>
<p>Location: {{ site.data.resume.personal_info.location }}</p>

<h3>Summary</h3>
<p>{{ site.data.resume.summary }}</p>

<h3>Skills</h3>
<ul>
  {% for skill in site.data.resume.skills.technical %}
    <li>{{ skill }}</li>
  {% endfor %}
</ul>
