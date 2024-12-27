---
layout: base
title: Resume Builder | CV Builder 
permalink: /cv-builder.html
---

<div class="container">
        <h1 class="my-4">Tags with Post Counts</h1>
        <div class="tag-list">
            {% assign tags = site.tags | sort %}
            {% for tag in tags['cv'] %}

                <div class="tag-item">
                    <a href="{{ site.baseurl }}/tag/{{ tag[0] | slugify }}" class="btn btn-primary">
                        {{ tag[0] }} <span class="badge bg-secondary">{{ tag[1].size }}</span>
                    </a>
                </div>
            {% endfor %}
        </div>
    </div>


<div class="container resumes mt-5">
    <div class="row g-4">
        {% for post in site.tags['cv'] %}
        <div class="col-md-4">
            <div class="thumbnail">
                <img alt="{{ post.title }}" src="{{ post.featured_image | default: '/assets/img/logo1.jpg' }}"/>
                <div class="premium-tag">Free</div>
                <div class="caption">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.description | default: "trending resume" }}</p>
                    <div class="mt-2">
                        <span class="tag">{{ post.tag }}</span>
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