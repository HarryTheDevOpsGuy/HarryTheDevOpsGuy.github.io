// Course Sidebar Toggle
function toggleSidebar() {
    const sidebar = document.getElementById('course-sidebar');
    sidebar.classList.toggle('-translate-x-full');
}

// Module Toggle
function toggleModule(button) {
    const content = button.nextElementSibling;
    const icon = button.querySelector('svg');
    const isExpanded = button.getAttribute('aria-expanded') === 'true';

    // Toggle content visibility
    content.classList.toggle('hidden');
    button.setAttribute('aria-expanded', !isExpanded);

    // Animate icon
    icon.style.transform = isExpanded ? 'rotate(0deg)' : 'rotate(180deg)';
}

// Course Progress Tracking
document.addEventListener('DOMContentLoaded', () => {
    const progressBar = document.getElementById('progress-bar');
    const progressPercentage = document.getElementById('progress-percentage');
    const completedLessons = document.querySelectorAll('.bg-green-500').length;
    const totalLessons = document.querySelectorAll('[class*="rounded-full"]').length;

    if (totalLessons > 0) {
        const progress = Math.round((completedLessons / totalLessons) * 100);
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress}%`;
    }

    // Auto-expand current module
    const currentPage = window.location.pathname;
    const currentLink = document.querySelector(`a[href*="${currentPage}"]`);
    if (currentLink) {
        const moduleButton = currentLink.closest('.course-module').querySelector('button');
        toggleModule(moduleButton);
    }
});

// Handle click outside to close sidebar on mobile
document.addEventListener('click', (event) => {
    const sidebar = document.getElementById('course-sidebar');
    if (!sidebar.contains(event.target) && !event.target.closest('[onclick="toggleSidebar()"]')) {
        sidebar.classList.add('-translate-x-full');
    }
});