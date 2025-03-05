document.addEventListener('DOMContentLoaded', function() {
  const filterButtons = document.querySelectorAll('.tag-filter-btn');
  const allPosts = document.querySelectorAll('.blog-post');
  let activeTag = 'all';

  // Initialize counters for each tag
  const updateTagCounts = () => {
    const tagCounts = {};
    allPosts.forEach(post => {
      const tags = post.dataset.tags.split(',');
      tags.forEach(tag => {
        tagCounts[tag] = (tagCounts[tag] || 0) + 1;
      });
    });

    // Update count badges
    filterButtons.forEach(btn => {
      const tag = btn.dataset.tag;
      const count = tag === 'all' ? allPosts.length : (tagCounts[tag] || 0);
      const countBadge = btn.querySelector('.tag-count');
      if (countBadge) {
        countBadge.textContent = count;
      }
    });
  };

  // Filter posts based on selected tag
  const filterPosts = (tag) => {
    activeTag = tag;

    // Update active state of filter buttons
    filterButtons.forEach(btn => {
      btn.classList.toggle('active', btn.dataset.tag === tag);
      btn.classList.toggle('bg-primary-600', btn.dataset.tag === tag);
      btn.classList.toggle('text-white', btn.dataset.tag === tag);
    });

    // Show/hide posts based on selected tag
    allPosts.forEach(post => {
      const postTags = post.dataset.tags.split(',');
      const shouldShow = tag === 'all' || postTags.includes(tag);
      
      // Add animation classes
      if (shouldShow) {
        post.classList.remove('hidden');
        post.classList.add('animate-fade-in');
      } else {
        post.classList.add('hidden');
        post.classList.remove('animate-fade-in');
      }
    });
  };

  // Add click event listeners to filter buttons
  filterButtons.forEach(btn => {
    btn.addEventListener('click', () => {
      const tag = btn.dataset.tag;
      filterPosts(tag);
    });
  });

  // Initialize tag counts and filter
  updateTagCounts();
  filterPosts('all');
});