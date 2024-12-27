---
layout: base
title: Resume Builder | CV Builder 
permalink: /cv-builder.html
---

<div class="container resumes mt-5">
    <div class="row g-4">
        {% for post in site.tags['cv'] %}
        <div class="col-md-4">
            <div class="thumbnail">
                <img alt="A scenic view of a mountain range with a clear blue sky" src="https://storage.googleapis.com/a1aa/image/fA2BlYvQlQ1hZa6orkCOfW4byoVW5CFQdKvsHvfk8y1NuJePB.jpg"/>
                <div class="caption">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.description | default: "trending resume" }}</p>
                    <div class="mt-2">
                        <span class="tag">Adventure</span>
                    </div>
                    <div class="meta mt-2">
                        <span>Posted by Harry</span> | <span>March 10, 2023</span>
                    </div>
                    <div class="contact-links text-center hide-code">
                        <a href="{{ post.url }}" class="contact-link" target="_blank">
                            <i class="fa-solid fa-pen-to-square"></i> Looks Good? Edit Now
                        </a>
                    </div>
                </div>
            </div>
        </div>
        {% endfor %}
    </div>
</div>