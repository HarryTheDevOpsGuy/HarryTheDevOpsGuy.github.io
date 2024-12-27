---
layout: base
title: Resume Builder | CV Builder 
permalink: /cv-builder.html
---

<div class="container resumes mt-5">
    <div class="mb-4">
        {% assign tags = site.tags | sort %}
        {% for tag in tags %}
        <span class="tag" data-tag="{{ tag[0] }}">{{ tag[0] }} ({{ tag[1].size }})</span>
        {% endfor %}
        <!-- <span class="tag" data-tag="{{ tag[0] }}">Adventure (1)</span>
        <span class="tag" data-tag="Relaxation">Relaxation (1)</span>
        <span class="tag" data-tag="Urban">Urban (1)</span> -->
    </div>
    <div class="row g-4">
        {% for post in site.tags['cv'] %}
        <div class="col-md-4" data-tags="[{{ post.tags }}]">
            <div class="thumbnail">
                <img alt="{{ post.title }}" src="{{ post.featured_image | default: '/assets/img/logo1.jpg' }}"/>
                <div class="premium-tag">Free</div>
                <div class="caption">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.description | default: "trending resume" }}</p>
                    <div class="mt-2">
                        {% for tgs in post.tags %}
                        <span class="tag">{{ tgs }}</span>
                        {% endfor %}
                    </div>
                    <div class="meta mt-2">
                        <span>Posted by Harry</span> | <span>{{ post.date | date: "%B %d, %Y" }}</span>
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