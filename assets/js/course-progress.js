// Course Progress Management
const CourseProgress = {
    storageKey: 'courseProgress',

    init() {
        this.setupSidebar();
        this.loadProgress();
        this.setupProgressTracking();
        this.setupResponsiveness();
        this.setupModuleAnimations();
    },

    setupSidebar() {
        const sidebar = document.getElementById('course-sidebar');
        const toggleBtn = document.querySelector('[aria-label="Toggle Sidebar"]');
        const toggleIcon = document.getElementById('sidebar-toggle-icon');

        if (toggleBtn) {
            toggleBtn.addEventListener('click', () => {
                sidebar.classList.toggle('collapsed');
                toggleIcon.style.transform = sidebar.classList.contains('collapsed') ? 'rotate(180deg)' : '';
            });
        }
    },

    setupModuleAnimations() {
        const moduleButtons = document.querySelectorAll('.module-section button');
        moduleButtons.forEach(button => {
            button.addEventListener('click', () => {
                const content = button.nextElementSibling;
                const icon = button.querySelector('svg');
                const isExpanded = button.getAttribute('aria-expanded') === 'true';

                // Toggle aria-expanded
                button.setAttribute('aria-expanded', !isExpanded);

                // Animate icon
                icon.style.transform = isExpanded ? '' : 'rotate(180deg)';

                // Animate content
                if (isExpanded) {
                    content.style.maxHeight = '0';
                    content.style.opacity = '0';
                } else {
                    content.style.maxHeight = content.scrollHeight + 'px';
                    content.style.opacity = '1';
                }
            });
        });
    },

        // Add collapse functionality to sections with animation
        const sections = document.querySelectorAll('.course-section');
        sections.forEach(section => {
            const heading = section.querySelector('h4');
            const content = section.querySelector('ul');
            if (heading && content) {
                heading.addEventListener('click', () => {
                    content.classList.toggle('hidden');
                    heading.querySelector('svg').classList.toggle('rotate-180');
                });
            }
        });
    },

    loadProgress() {
        const progress = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const links = document.querySelectorAll('.nav-link');

        links.forEach(link => {
            const path = link.getAttribute('href');
            const indicator = link.querySelector('.progress-indicator');
            if (progress[path]) {
                link.classList.add('text-primary-600');
                if (indicator) {
                    indicator.innerHTML = '●';
                    indicator.classList.add('text-primary-600');
                }
            }
        });

        this.updateProgressBar(progress);
    },

    updateProgressBar(progress) {
        const totalPages = document.querySelectorAll('.nav-link').length;
        const completedPages = Object.keys(progress).length;
        const progressPercent = Math.round((completedPages / totalPages) * 100);

        const progressIndicator = document.getElementById('course-progress-indicator');
        progressIndicator.innerHTML = `
            <div class="mb-2 flex justify-between items-center">
                <span class="text-sm font-medium text-gray-700 dark:text-gray-300">Course Progress</span>
                <span class="text-sm font-bold text-primary-600 dark:text-primary-400">${progressPercent}%</span>
            </div>
            <div class="bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
                <div class="bg-primary-600 h-2.5 rounded-full transition-all duration-500 ease-out" style="width: ${progressPercent}%"></div>
            </div>
        `;
    },

    setupProgressTracking() {
        const progress = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
        const currentPath = window.location.pathname;

        // Mark current page as completed
        if (!progress[currentPath]) {
            progress[currentPath] = true;
            localStorage.setItem(this.storageKey, JSON.stringify(progress));
            this.updateProgressBar(progress);

            // Update current page indicator
            const currentLink = document.querySelector(`a[href="${currentPath}"]`);
            if (currentLink) {
                const indicator = currentLink.querySelector('.progress-indicator');
                if (indicator) {
                    indicator.innerHTML = '●';
                    indicator.classList.add('text-primary-600');
                }
                currentLink.classList.add('text-primary-600');
            }
        }
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