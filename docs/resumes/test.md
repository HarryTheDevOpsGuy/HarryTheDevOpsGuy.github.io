---
layout: base
title: "My print page"
permalink: /test.html
---

<div class="container mt-5">
    <div class="row">
        <div class="col-md-8 offset-md-2">
            <h2>Welcome to Our Website</h2>
            <p>This is a sample website created using Bootstrap. You can find various articles and services here.</p>
            <!-- Printable Article Section -->
            <div class="printable-area">
                <h3>Printable Article Title</h3>
                <p>This is the content of the article that is meant to be printed. It contains valuable information that you can take with you.</p>
                <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.</p>
                <p>For more information, please contact us.</p>
            </div>
            <button class="btn btn-success mt-3" onclick="window.print()">Print Article</button>
        </div>
    </div>
</div>

