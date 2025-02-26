.PHONY: install build serve clean

install:
	@echo "Installing dependencies..."
	bundle install
	npm install

# Build the site with Jekyll and Tailwind CSS
build:
	@echo "Building site..."
	npx tailwindcss -i ./assets/css/main.css -o ./_site/assets/css/tailwind.css --minify
	bundle exec jekyll build

# Serve the site locally
serve:
	@echo "Starting development server..."
	bundle exec jekyll serve --livereload

# Clean generated files
clean:
	@echo "Cleaning up..."
	rm -rf _site
	rm -rf .jekyll-cache
	rm -rf node_modules

# Default target
all: install build

# Help command
help:
	@echo "Available commands:"
	@echo "  make install  - Install all dependencies"
	@echo "  make build   - Build the site"
	@echo "  make serve   - Start development server"
	@echo "  make clean   - Clean up generated files"
	@echo "  make all     - Install dependencies and build site"
	@echo "  make help    - Show this help message"