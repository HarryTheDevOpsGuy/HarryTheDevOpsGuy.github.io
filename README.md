# Digital Garden & Portfolio

A modern portfolio website built with Jekyll and Tailwind CSS, featuring blogs, documentation, courses, and a digital garden section.

## Features

- 🎨 Modern, responsive design with Tailwind CSS
- 📝 Blog with pagination and categories
- 📚 Documentation section for technical guides
- 🎓 Course catalog with detailed lessons
- 🌱 Digital Garden for growing ideas
- 🔍 SEO optimized with Jekyll SEO Tag
- 📱 Mobile-friendly navigation
- 🌙 Dark mode support

## Tech Stack

- Jekyll 4.2.0 - Static site generator
- Tailwind CSS 3.3.5 - Utility-first CSS framework
- Node.js & NPM - For managing JavaScript dependencies
- Ruby & Bundler - For managing Ruby dependencies

## Prerequisites

- Ruby (with Bundler)
- Node.js (with NPM)
- Make (for running commands)

## Getting Started

1. Clone the repository:
   ```bash
   git clone https://github.com/HarryTheDevOpsGuy/HarryTheDevOpsGuy.github.io.git
   cd HarryTheDevOpsGuy.github.io
   ```

2. Install dependencies:
   ```bash
   make install
   ```

3. Start the development server:
   ```bash
   make serve
   ```

4. Open your browser and visit: `http://localhost:4000`

## Available Commands

- `make install` - Install all dependencies
- `make build` - Build the site for production
- `make serve` - Start development server with live reload
- `make clean` - Clean up generated files
- `make all` - Install dependencies and build site
- `make help` - Show all available commands

## Project Structure

```
├── _config.yml          # Jekyll configuration
├── _layouts/            # HTML layout templates
├── assets/             # Static assets (CSS, JS, images)
├── blog/               # Blog posts and index
├── courses/            # Course content
├── docs/               # Documentation pages
├── garden/             # Digital garden entries
└── portfolio.html      # Portfolio page
```

## Content Management

### Blog Posts
Add new blog posts in `blog/_posts/` following the format: `YYYY-MM-DD-title.md`

### Courses
Create new courses in `courses/` directory with corresponding index.md files

### Documentation
Add documentation pages in `docs/` organized by categories

### Digital Garden
Add new entries in `garden/` for work-in-progress thoughts and notes

## Development Guidelines

### CSS Styling
- Use Tailwind CSS utility classes
- Custom styles can be added in `assets/css/main.css`
- Run `npm run watch:css` for development

### Jekyll Configuration
- Site settings are in `_config.yml`
- Collections configuration for portfolio, courses, docs, and garden
- Plugin settings for SEO, sitemap, and pagination

## Deployment

The site is automatically deployed to GitHub Pages when changes are pushed to the main branch using GitHub Actions workflow.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request