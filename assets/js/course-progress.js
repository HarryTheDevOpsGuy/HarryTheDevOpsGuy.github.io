// Course Progress Tracking System

class CourseProgress {
  constructor() {
    this.progressKey = 'course_progress';
    this.readTimeKey = 'estimated_read_time';
    this.progress = this.loadProgress();
    this.initializeProgress();
    this.setupEventListeners();
  }

  loadProgress() {
    const stored = localStorage.getItem(this.progressKey);
    return stored ? JSON.parse(stored) : {};
  }

  saveProgress() {
    localStorage.setItem(this.progressKey, JSON.stringify(this.progress));
    this.updateProgressUI();
  }

  initializeProgress() {
    const courseId = document.querySelector('[data-course-id]')?.dataset.courseId;
    if (!courseId) return;

    if (!this.progress[courseId]) {
      this.progress[courseId] = {
        completedLessons: [],
        lastVisited: null,
        totalTime: 0
      };
    }

    this.calculateReadingTime();
    this.updateProgressUI();
  }

  calculateReadingTime() {
    const article = document.querySelector('article');
    if (!article) return;

    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    const readingTime = Math.ceil(wordCount / 200); // Average reading speed: 200 words per minute

    const courseInfo = document.querySelector('.course-info');
    if (courseInfo) {
      // Create course metadata container
      const metadataContainer = document.createElement('div');
      metadataContainer.className = 'course-metadata grid grid-cols-2 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg mb-6';

      // Add reading time
      const readingTimeElement = document.createElement('div');
      readingTimeElement.className = 'flex items-center';
      readingTimeElement.innerHTML = `
        <div class="mr-3">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Reading Time</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">${readingTime} min</div>
        </div>
      `;

      // Add difficulty level
      const difficultyElement = document.createElement('div');
      difficultyElement.className = 'flex items-center';
      const difficulty = courseInfo.dataset.difficulty || 'Beginner';
      difficultyElement.innerHTML = `
        <div class="mr-3">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"></path>
          </svg>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Difficulty</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">${difficulty}</div>
        </div>
      `;

      // Add total modules
      const modulesElement = document.createElement('div');
      modulesElement.className = 'flex items-center';
      const totalModules = document.querySelector('[data-course-progress]')?.dataset.totalModules || '0';
      modulesElement.innerHTML = `
        <div class="mr-3">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path>
          </svg>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Total Modules</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">${totalModules}</div>
        </div>
      `;

      // Add total lessons
      const lessonsElement = document.createElement('div');
      lessonsElement.className = 'flex items-center';
      const totalLessons = document.querySelector('[data-course-progress]')?.dataset.totalLessons || '0';
      lessonsElement.innerHTML = `
        <div class="mr-3">
          <svg class="w-5 h-5 text-gray-600 dark:text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"></path>
          </svg>
        </div>
        <div>
          <div class="text-sm font-medium text-gray-900 dark:text-gray-100">Total Lessons</div>
          <div class="text-sm text-gray-600 dark:text-gray-400">${totalLessons}</div>
        </div>
      `;

      // Add all elements to the metadata container
      metadataContainer.appendChild(readingTimeElement);
      metadataContainer.appendChild(difficultyElement);
      metadataContainer.appendChild(modulesElement);
      metadataContainer.appendChild(lessonsElement);

      // Insert the metadata container at the beginning of course info
      courseInfo.insertBefore(metadataContainer, courseInfo.firstChild);
    }

    return readingTime;
  }

  setupEventListeners() {
    let scrollTimeout;
    let lastScrollPosition = 0;
    const courseId = document.querySelector('[data-course-id]')?.dataset.courseId;
    const lessonId = document.querySelector('[data-lesson-id]')?.dataset.lessonId;

    if (!courseId || !lessonId) return;

    // Track scroll position
    window.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      
      scrollTimeout = setTimeout(() => {
        const scrollPercent = (window.scrollY + window.innerHeight) / document.documentElement.scrollHeight * 100;
        lastScrollPosition = scrollPercent;

        if (scrollPercent > 90) {
          this.markLessonAsRead(courseId, lessonId);
        }
      }, 100);
    });

    // Track time spent on page
    let timeSpent = 0;
    const timeInterval = setInterval(() => {
      if (document.visibilityState === 'visible') {
        timeSpent++;
        if (timeSpent >= this.getEstimatedReadTime() * 60 * 0.7) { // 70% of estimated reading time
          this.markLessonAsRead(courseId, lessonId);
          clearInterval(timeInterval);
        }
      }
    }, 1000);

    // Handle next/previous navigation
    const nextButton = document.querySelector('.next-lesson');
    const prevButton = document.querySelector('.prev-lesson');

    if (nextButton) {
      nextButton.addEventListener('mouseenter', () => {
        nextButton.classList.add('transform', 'translate-x-1', 'transition-transform');
      });
      nextButton.addEventListener('mouseleave', () => {
        nextButton.classList.remove('transform', 'translate-x-1', 'transition-transform');
      });
      nextButton.addEventListener('click', () => {
        this.markLessonAsRead(courseId, lessonId);
      });
    }

    if (prevButton) {
      prevButton.addEventListener('mouseenter', () => {
        prevButton.classList.add('transform', '-translate-x-1', 'transition-transform');
      });
      prevButton.addEventListener('mouseleave', () => {
        prevButton.classList.remove('transform', '-translate-x-1', 'transition-transform');
      });
    }
  }

  markLessonAsRead(courseId, lessonId) {
    if (!this.progress[courseId].completedLessons.includes(lessonId)) {
      this.progress[courseId].completedLessons.push(lessonId);
      this.progress[courseId].lastVisited = new Date().toISOString();
      this.saveProgress();
    }
  }

  getEstimatedReadTime() {
    const article = document.querySelector('article');
    if (!article) return 0;

    const text = article.textContent;
    const wordCount = text.trim().split(/\s+/).length;
    return Math.ceil(wordCount / 200);
  }

  updateProgressUI() {
    const courseProgress = document.querySelector('[data-course-progress]');
    const progressText = document.querySelector('[data-progress-text]');
    const moduleProgressBars = document.querySelectorAll('[data-module-progress]');

    if (!courseProgress || !progressText) return;

    const totalModules = parseInt(courseProgress.dataset.totalModules) || 0;
    const totalLessons = parseInt(courseProgress.dataset.totalLessons) || 0;
    const courseId = document.querySelector('[data-course-id]')?.dataset.courseId;
    if (!courseId) return;

    const completedLessons = this.progress[courseId]?.completedLessons.length || 0;
    const progressPercent = Math.round((completedLessons / totalLessons) * 100);

    // Add smooth transition
    courseProgress.style.transition = 'width 0.5s ease-in-out';
    courseProgress.style.width = `${progressPercent}%`;
    progressText.textContent = `${progressPercent}%`;

    // Update progress color based on completion
    if (progressPercent === 100) {
      courseProgress.classList.add('bg-green-500');
      courseProgress.classList.remove('bg-primary-600');
    } else {
      courseProgress.classList.add('bg-primary-600');
      courseProgress.classList.remove('bg-green-500');
    }

    // Update module progress bars with smooth transitions
    moduleProgressBars.forEach(bar => {
      const moduleLessons = parseInt(bar.dataset.totalLessons) || 0;
      const moduleId = bar.closest('[data-module-id]')?.dataset.moduleId;
      if (!moduleId) return;

      const completedModuleLessons = this.getCompletedLessonsInModule(moduleId);
      const moduleProgress = Math.round((completedModuleLessons / moduleLessons) * 100);

      bar.style.transition = 'width 0.5s ease-in-out';
      bar.style.width = `${moduleProgress}%`;

      // Update module progress color
      if (moduleProgress === 100) {
        bar.classList.add('bg-green-500');
        bar.classList.remove('bg-primary-600');
      } else {
        bar.classList.add('bg-primary-600');
        bar.classList.remove('bg-green-500');
      }

      // Update module progress text if exists
      const moduleProgressText = bar.closest('[data-module-id]')?.querySelector('[data-module-progress-text]');
      if (moduleProgressText) {
        moduleProgressText.textContent = `${moduleProgress}%`;
      }
    });

    // Update course metadata if it exists
    this.updateCourseMetadata(completedLessons, totalLessons, totalModules);
  }

  updateCourseMetadata(completedLessons, totalLessons, totalModules) {
    const courseInfo = document.querySelector('.course-info');
    if (!courseInfo) return;

    const completionStatus = document.querySelector('[data-completion-status]');
    if (completionStatus) {
      const isCompleted = completedLessons === totalLessons;
      completionStatus.textContent = isCompleted ? 'Completed' : 'In Progress';
      completionStatus.className = `text-sm font-medium ${isCompleted ? 'text-green-600' : 'text-yellow-600'}`;
    }

    const lessonCounter = document.querySelector('[data-lesson-counter]');
    if (lessonCounter) {
      lessonCounter.textContent = `${completedLessons}/${totalLessons} lessons completed`;
    }
  }

  getCompletedLessonsInModule(moduleId) {
    const courseId = document.querySelector('[data-course-id]').dataset.courseId;
    const moduleLessons = document.querySelectorAll(`[data-module-id="${moduleId}"] [data-lesson-id]`);
    let completed = 0;

    moduleLessons.forEach(lesson => {
      if (this.progress[courseId]?.completedLessons.includes(lesson.dataset.lessonId)) {
        completed++;
      }
    });

    return completed;
  }
}

// Initialize course progress tracking
document.addEventListener('DOMContentLoaded', () => {
  new CourseProgress();
});