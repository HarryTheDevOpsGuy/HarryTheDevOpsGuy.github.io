---
layout: base
title: "My print page"
permalink: /resume13.html
---

<div class="container py-5">
    <h2>Stylish DevOps Resume</h2>
    <div id="resume" resumeid="resumeid01" class="printable-area border p-4" contenteditable="true">
        <!-- Header Section -->
        <div class="row mb-4">
            <div class="col-md-3 text-center">
                <img src="https://via.placeholder.com/150" class="rounded-circle img-fluid mb-3" alt="Profile Picture">
                <h4 class="fw-bold">Alex Johnson</h4>
                <p class="text-muted">DevOps Engineer 💻</p>
            </div>
            <div class="col-md-9">
                <h3 class="fw-bold"><i class="fas fa-address-card me-2"></i> Contact Information</h3>
                <ul class="list-unstyled">
                    <li><i class="fas fa-envelope me-2"></i> Email: alex.johnson@example.com</li>
                    <li><i class="fas fa-phone me-2"></i> Phone: +123 456 7890</li>
                    <li><i class="fas fa-globe me-2"></i> Website: www.alexjohnson.dev</li>
                    <li><i class="fab fa-linkedin me-2"></i> LinkedIn: linkedin.com/in/alexjohnson</li>
                </ul>
            </div>
        </div>

        <!-- Objective Section -->
        <div class="mb-4">
            <h3 class="fw-bold"><i class="fas fa-bullseye me-2"></i> Objective</h3>
            <p>I am a highly motivated DevOps Engineer with 5+ years of experience in automating deployments, managing cloud infrastructure, and driving operational excellence. I am seeking a challenging position in a dynamic organization.</p>
        </div>

        <!-- Skills Section -->
        <div class="mb-4">
            <h3 class="fw-bold"><i class="fas fa-tools me-2"></i> Skills</h3>
            <div class="row">
                <div class="col-md-6">
                    <ul class="list-group">
                        <li class="list-group-item"><i class="fas fa-cloud me-2"></i> AWS, Azure, GCP</li>
                        <li class="list-group-item"><i class="fas fa-cogs me-2"></i> Terraform, Ansible</li>
                        <li class="list-group-item"><i class="fab fa-docker me-2"></i> Docker, Kubernetes</li>
                        <li class="list-group-item"><i class="fas fa-code me-2"></i> Bash, Python</li>
                    </ul>
                </div>
                <div class="col-md-6">
                    <ul class="list-group">
                        <li class="list-group-item"><i class="fas fa-server me-2"></i> CI/CD Pipelines (Jenkins)</li>
                        <li class="list-group-item"><i class="fas fa-laptop-code me-2"></i> Linux Administration</li>
                        <li class="list-group-item"><i class="fas fa-database me-2"></i> MySQL, PostgreSQL</li>
                        <li class="list-group-item"><i class="fas fa-network-wired me-2"></i> Networking & Security</li>
                    </ul>
                </div>
            </div>
        </div>

        <!-- Experience Section -->
        <div class="mb-4">
            <h3 class="fw-bold"><i class="fas fa-briefcase me-2"></i> Experience</h3>
            <ul class="list-unstyled">
                <li>
                    <h5 class="fw-bold">Senior DevOps Engineer</h5>
                    <p class="text-muted mb-1">Tech Innovators | 2020 - Present</p>
                    <ul>
                        <li>Designed and implemented CI/CD pipelines using Jenkins and GitLab.</li>
                        <li>Automated infrastructure provisioning with Terraform and Ansible.</li>
                        <li>Deployed and managed Kubernetes clusters on AWS and GCP.</li>
                    </ul>
                </li>
                <li>
                    <h5 class="fw-bold">DevOps Engineer</h5>
                    <p class="text-muted mb-1">Cloud Solutions | 2018 - 2020</p>
                    <ul>
                        <li>Streamlined deployments and reduced downtime by 50% through automation.</li>
                        <li>Improved system reliability using monitoring tools like Prometheus and Grafana.</li>
                        <li>Collaborated with developers to ensure seamless application delivery.</li>
                    </ul>
                </li>
            </ul>
        </div>

        <!-- Education Section -->
        <div class="mb-4">
            <h3 class="fw-bold"><i class="fas fa-graduation-cap me-2"></i> Education</h3>
            <ul class="list-unstyled">
                <li>Bachelor of Science in Computer Science - XYZ University (2014-2018)</li>
            </ul>
        </div>

        <!-- Certifications Section -->
        <div class="mb-4">
            <h3 class="fw-bold"><i class="fas fa-certificate me-2"></i> Certifications</h3>
            <ul class="list-unstyled">
                <li>AWS Certified Solutions Architect - Associate</li>
                <li>Certified Kubernetes Administrator (CKA)</li>
                <li>HashiCorp Certified: Terraform Associate</li>
            </ul>
        </div>
    </div>
 </div>

<!-- Print Button -->
<div class="text-center mb-5">
    <button class="btn btn-primary" onclick="window.print()">
        <i class="fas fa-print me-2"></i> Print Resume
    </button>
    <button class="btn btn-primary" id="saveResume">
        <i class="fas fa-save me-2"></i> Save
    </button>
    <button class="btn btn-danger me-2" id="clearResume"><i class="fas fa-trash-alt"></i> Reset/Clear</button>
    <button class="btn btn-info me-2" id="copyResume"><i class="fas fa-copy"></i> Copy Data</button>
    <button class="btn btn-warning me-2" id="pasteResume"><i class="fas fa-clipboard"></i> Paste Data</button>
    <span id="successMessage" class="success-msg text-center">Successfull!</span>
</div>