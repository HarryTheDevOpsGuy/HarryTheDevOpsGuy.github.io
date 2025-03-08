---
layout: default
title: Resume Collection
---

<div class="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 dark:from-gray-900 dark:to-gray-800 py-12">
  <div class="container mx-auto px-4">
    <!-- Header Section -->
    <header class="max-w-4xl mx-auto text-center mb-12">
      <h1 class="text-4xl font-bold text-gray-900 dark:text-white mb-4">
        Professional Resume Collection
      </h1>
      <p class="text-xl text-gray-600 dark:text-gray-400">
        Choose from multiple professionally designed resume templates
      </p>
    </header>

    <!-- Main Content -->
    <div class="max-w-7xl mx-auto">
      <!-- Resume Categories -->
      {% for dataset in site.data.cv %}
      <div class="mb-12">
        <div class="flex items-center justify-between mb-6">
          <h2 class="text-2xl font-semibold text-gray-900 dark:text-white">
            {{ dataset[0] | capitalize }} Collection
          </h2>
          <span class="px-4 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 rounded-full text-sm">
            {{ site.layouts | where_exp: "item", "item[0] contains 'cv/'" | size }} Templates
          </span>
        </div>

        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {% assign layouts = site.layouts | where_exp: "item", "item[0] contains 'cv/'" %}
          {% for layout in layouts %}
            {% assign layout_name = layout[0] | split: '/' | last %}
            <div class="group bg-white dark:bg-gray-800 rounded-xl shadow-lg overflow-hidden hover:shadow-xl transition-all duration-300">
              <!-- Preview Area (You can add template previews here) -->
              <div class="h-48 bg-gradient-to-br from-gray-100 to-gray-200 dark:from-gray-700 dark:to-gray-600 p-6">
                <div class="h-full border-2 border-dashed border-gray-300 dark:border-gray-600 rounded-lg flex items-center justify-center">
                  <span class="text-gray-500 dark:text-gray-400">{{ layout_name | capitalize }}</span>
                </div>
              </div>

              <!-- Template Info -->
              <div class="p-6">
                <div class="flex items-center justify-between mb-4">
                  <h3 class="text-lg font-medium text-gray-900 dark:text-white">
                    {{ layout_name | capitalize }} Template
                  </h3>
                  <span class="px-3 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 rounded-full text-sm">
                    {{ layout_name }}
                  </span>
                </div>

                <!-- Action Buttons -->
                <div class="flex items-center gap-4 mt-6">
                  <a href="/cv/{{ dataset[0] }}/{{ layout_name }}.html"
                     class="flex-1 inline-flex items-center justify-center px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors">
                    <span>View Resume</span>
                    <svg class="w-4 h-4 ml-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7"/>
                    </svg>
                  </a>
                  
                  <button onclick="printCV('/cv/{{ dataset[0] }}/{{ layout_name }}.html')"
                          class="inline-flex items-center px-4 py-2 bg-gray-100 dark:bg-gray-700 text-gray-700 dark:text-gray-300 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-600 transition-colors">
                    <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          {% endfor %}
        </div>
      </div>
      {% endfor %}
    </div>

    <!-- Features Section -->
    <section class="max-w-4xl mx-auto mt-16 px-4">
      <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
        <div class="text-center">
          <div class="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 5a1 1 0 011-1h14a1 1 0 011 1v2a1 1 0 01-1 1H5a1 1 0 01-1-1V5zM4 13a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H5a1 1 0 01-1-1v-6zM16 13a1 1 0 011-1h2a1 1 0 011 1v6a1 1 0 01-1 1h-2a1 1 0 01-1-1v-6z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Professional Layouts</h3>
          <p class="text-gray-600 dark:text-gray-400">Multiple professionally designed templates for different needs</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6v6m0 0v6m0-6h6m-6 0H6"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Easy Customization</h3>
          <p class="text-gray-600 dark:text-gray-400">Customize your resume with different styles and layouts</p>
        </div>

        <div class="text-center">
          <div class="w-12 h-12 mx-auto bg-blue-100 dark:bg-blue-900 rounded-xl flex items-center justify-center mb-4">
            <svg class="w-6 h-6 text-blue-600 dark:text-blue-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"/>
            </svg>
          </div>
          <h3 class="text-lg font-semibold text-gray-900 dark:text-white mb-2">Print Ready</h3>
          <p class="text-gray-600 dark:text-gray-400">All templates are optimized for perfect printing</p>
        </div>
      </div>
    </section>
  </div>
</div>

<script>
  function printCV(url) {
    window.open(url, '_blank').print();
  }
</script>
