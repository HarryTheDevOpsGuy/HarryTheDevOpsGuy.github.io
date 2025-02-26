# Environment variables
ENV ?= development
JEKYLL_ENV ?= $(ENV)
NODE_ENV ?= $(ENV)
JOBS ?= 4

# Colors for pretty output
RESET = \033[0m
BOLD = \033[1m
GREEN = \033[32m
YELLOW = \033[33m
BLUE = \033[34m

# Declare phony targets
.PHONY: install build serve clean lint test deploy dev prod help

# Default target
.DEFAULT_GOAL := help

install: ## Install all dependencies
	@echo "${BLUE}Installing dependencies...${RESET}"
	@bundle install --jobs $(JOBS) --retry 3 --path vendor/bundle
	@npm ci
	@echo "${GREEN}✓ Dependencies installed successfully${RESET}"

# Build the site with Jekyll and Tailwind CSS
build: ## Build the site for production
	@echo "${BLUE}Building site for $(ENV) environment...${RESET}"
	@npm run build:css
	@JEKYLL_ENV=$(JEKYLL_ENV) bundle exec jekyll build --trace
	@echo "${GREEN}✓ Site built successfully${RESET}"

# Development build with watch mode
dev: ## Start development server with live reload
	@echo "${BLUE}Starting development server...${RESET}"
	@JEKYLL_ENV=development bundle exec jekyll serve --livereload --incremental

# Production build
prod: ENV=production ## Build for production
prod:
	@make build

# Serve the site locally
serve: ## Serve the site locally
	@echo "${BLUE}Starting local server...${RESET}"
	@bundle exec jekyll serve --livereload

# Clean generated files
clean: ## Clean up generated files
	@echo "${YELLOW}Cleaning up generated files...${RESET}"
	@rm -rf _site .jekyll-cache node_modules
	@echo "${GREEN}✓ Cleanup complete${RESET}"

# Lint code
lint: ## Lint JavaScript and CSS files
	@echo "${BLUE}Linting code...${RESET}"
	@npm run lint

# Run tests
test: ## Run all tests
	@echo "${BLUE}Running tests...${RESET}"
	@npm test

# Deploy to GitHub Pages (requires proper setup)
deploy: prod ## Deploy to GitHub Pages
	@echo "${BLUE}Deploying to GitHub Pages...${RESET}"
	@git push origin main

# Help command
help: ## Show this help message
	@echo "${BOLD}Available commands:${RESET}"
	@grep -E '^[a-zA-Z_-]+:.*?## .*$$' $(MAKEFILE_LIST) | sort | awk 'BEGIN {FS = ":.*?## "}; {printf "  ${YELLOW}%-15s${RESET} %s\n", $$1, $$2}'

# Error handling
.SILENT:
.ONESHELL:
.NOTPARALLEL:

# Ensure clean state
.PHONY: install build serve clean lint test deploy dev prod help