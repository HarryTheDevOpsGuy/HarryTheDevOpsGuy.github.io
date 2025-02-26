// Course Progress Management
const CourseProgress = {
    storageKey: 'courseProgress',

    init() {
        this.setupSidebar();
        this.loadProgress();
        this.setupProgressTracking();
        this.setupResponsiveness();
    },

    setupSidebar() {
        const sidebar = document.querySelector('aside nav');
        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'sidebar-toggle btn btn-outline mb-4 md:hidden w-full';
        toggleBtn.innerHTML = 'Toggle Menu';
        sidebar.parentNode.insertBefore(toggleBtn, sidebar);

        toggleBtn.addEventListener('click', () => {
            sidebar.classList.toggle('hidden');
            sidebar.classList.toggle('block');
        });

        // Add collapse functionality to sections
        const sections = document.querySelectorAll('.course-section');
        sections.forEach(section => {
            const heading = section.querySelector('h4');
            if (heading) {
                heading.addEventListener('click', () => {
                    section.querySelector('ul').classList.toggle('hidden');
                    heading.classList.toggle('collapsed');
                });
            }
        });
    },

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const links = document.querySelectorAll('.nav-link');

        links.forEach(link => {
            const path = link.getAttribute('href');
            if (progress[path]) {
                link.classList.add('completed');
                link.innerHTML += ' ✓';
            }
        });
    },

    setupProgressTracking() {
        const progress = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const currentPath = window.location.pathname;

        // Mark current page as completed
        progress[currentPath] = true;
        localStorage.setItem(this.storageKey, JSON.stringify(progress));

        // Add progress indicator
        const totalPages = document.querySelectorAll('.nav-link').length;
        const completedPages = Object.keys(progress).length;
        const progressPercent = Math.round((completedPages / totalPages) * 100);

        const progressBar = document.createElement('div');
        progressBar.className = 'progress-bar mt-4';
        progressBar.innerHTML = `
            <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-primary-600 h-2.5 rounded-full" style="width: ${progressPercent}%"></div>
            </div>
            <p class="text-sm text-gray-600 dark:text-gray-400 mt-2">${progressPercent}% Complete</p>
        `;

        document.querySelector('aside nav').appendChild(progressBar);
    },

    setupResponsiveness() {
        const mediaQuery = window.matchMedia('(max-width: 768px)');
        const sidebar = document.querySelector('aside nav');

        const handleResize = (e) => {
            if (e.matches) {
                sidebar.classList.add('hidden');
            } else {
                sidebar.classList.remove('hidden');
                sidebar.classList.add('block');
            }
        };

        mediaQuery.addListener(handleResize);
        handleResize(mediaQuery);
    }
};

// Initialize when DOM is loaded
document.addEventListener('DOMContentLoaded', () => CourseProgress.init());