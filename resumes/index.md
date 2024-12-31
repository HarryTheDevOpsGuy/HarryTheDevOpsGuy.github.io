---
layout: base
title: Resume Builder | CV Builder 
---


<header class="bg-primary text-white text-center py-5">
   <div class="container">
    <h1>
     Build Your Professional Resume
    </h1>
    <p class="lead">
     Choose from a variety of templates and create your resume in minutes.
    </p>
    <a class="btn btn-light btn-lg" href="#">
     Get Started
    </a>
   </div>
</header>

<div class="container resumes mt-5">
    <div class="mb-4">
        {% assign tags = site.tags | sort %}
        {% for tag in tags %}
        <span class="tag" data-tag="{{ tag[0] }}">{{ tag[0] }} ({{ tag[1].size }})</span>
        {% endfor %}
    </div>
    <div class="row g-4">
        {% for post in site.tags['cv'] %}
        <div class="col-md-4 post" data-tags="{{ post.tags | join: ', ' }}">
            <div class="thumbnail">
                <img alt="{{ post.title }}" src="{{ post.featured_image | default: '/assets/img/logo1.jpg' }}"/>
                {% for cvtype in site.data.base.resume_types %}
                    {% if post.tags contains cvtype %}
                <div class="premium-tag">{{ cvtype }}</div> 
                    {% endif %}
                {% endfor %}
                <div class="caption">
                    <h3>{{ post.title }}</h3>
                    <p>{{ post.description | default: "trending resume" }}</p>
                    <div class="mt-2">
                        {% for tgs in post.tags %}
                        <span class="tag" data-tag="{{ tgs }}">{{ tgs }}</span>
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