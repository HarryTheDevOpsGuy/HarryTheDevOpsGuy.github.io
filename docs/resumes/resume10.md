---
layout: base
title: "My print page"
permalink: /resume10.html
---

<div class="container py-5">
    <h2>Trendy DevOps Resume</h2>
    <div class="printable-area border p-4" contenteditable="true">
        <!-- Resume Header -->
        <header class="row mb-4">
            <div class="col-md-8">
                <h1>Michael Williams <small class="text-muted">DevOps Engineer</small></h1>
                <p><i class="fas fa-map-marker-alt"></i> Austin, TX | <i class="fas fa-envelope"></i> michael@example.com | <i class="fas fa-phone"></i> +123 456 7890</p>
            </div>
            <div class="col-md-4 text-md-end">
                <img src="https://via.placeholder.com/150" class="img-fluid rounded-circle" alt="Profile Picture">
            </div>
        </header>
        <!-- Resume Content -->
        <div class="row">
            <!-- Sidebar with Skills & Tools -->
            <div class="col-md-4">
                <div class="card shadow-sm mb-4">
                    <div class="card-body">
                        <h5 class="card-title">Skills & Tools</h5>
                        <ul class="list-unstyled">
                            <li><i class="fab fa-aws text-warning"></i> AWS</li>
                            <li><i class="fas fa-cogs"></i> CI/CD (Jenkins, GitLab)</li>
                            <li><i class="fab fa-docker"></i> Docker</li>
                            <li><i class="fab fa-kubernetes"></i> Kubernetes</li>
                            <li><i class="fab fa-github"></i> GitHub</li>
                            <li><i class="fas fa-tools"></i> Terraform</li>
                            <li><i class="fas fa-database"></i> MySQL, PostgreSQL</li>
                        </ul>
                    </div>
                </div>
            </div>
            <!-- Main Resume Content -->
            <div class="col-md-8">
                <!-- Summary Section -->
                <section class="mb-4">
                    <h3><i class="fas fa-user"></i> Professional Summary</h3>
                    <p>
                        Experienced DevOps Engineer with a demonstrated history of working in the cloud computing and infrastructure automation industry. Skilled in AWS, Docker, Kubernetes, CI/CD pipelines, and system architecture. Passionate about optimizing workflows, automating manual processes, and ensuring reliable, scalable systems.
                    </p>
                </section>
                <!-- Work Experience Section -->
                <section class="mb-4">
                    <h3><i class="fas fa-briefcase"></i> Work Experience</h3>
                    <div class="mb-3">
                        <h5>Senior DevOps Engineer</h5>
                        <p><i class="fas fa-building"></i> CloudTech Inc. | <i class="fas fa-calendar-alt"></i> Jan 2020 - Present</p>
                        <ul>
                            <li>Implemented CI/CD pipelines using Jenkins and GitLab CI, reducing deployment time by 50% 🚀</li>
                            <li>Automated infrastructure provisioning using Terraform for multi-cloud environments 🌐</li>
                            <li>Orchestrated microservices on Kubernetes, ensuring 99.99% uptime 🏅</li>
                        </ul>
                    </div>
                    <div class="mb-3">
                        <h5>DevOps Engineer</h5>
                        <p><i class="fas fa-building"></i> Tech Solutions Ltd. | <i class="fas fa-calendar-alt"></i> Jun 2017 - Dec 2019</p>
                        <ul>
                            <li>Managed cloud infrastructure on AWS, ensuring scalability and cost optimization 🏗️</li>
                            <li>Developed monitoring solutions using Prometheus, Grafana, and ELK stack 📊</li>
                            <li>Collaborated with developers to streamline deployment processes 👫</li>
                        </ul>
                    </div>
                </section>
                <!-- Education Section -->
                <section class="mb-4">
                    <h3><i class="fas fa-graduation-cap"></i> Education</h3>
                    <div class="mb-3">
                        <h5>Bachelor of Science in Computer Science</h5>
                        <p><i class="fas fa-school"></i> University of Texas | <i class="fas fa-calendar-alt"></i> 2013 - 2017</p>
                    </div>
                </section>
                <!-- Certifications Section -->
                <section class="mb-4">
                    <h3><i class="fas fa-certificate"></i> Certifications</h3>
                    <ul>
                        <li>AWS Certified Solutions Architect 🏅</li>
                        <li>Certified Kubernetes Administrator 🐳</li>
                        <li>Docker Certified Associate 🐋</li>
                    </ul>
                </section>
            </div>
        </div>
    </div>
</div>
    
<button onclick="window.print()" class="btn btn-success">Print Resume</button>




        
