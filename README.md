![Banner](./banner-black.svg)

Welcome to the Platform Specification project! This repository contains the source code for the entire Platform Specification website as well as the official specification files themselves.

Please see https://platformspec.io for the full project details.

## Table of Contents
- [Overview](#overview)
- [Website](#website)
- [Getting Started](#getting-started)
  - [Using Docker](#using-docker)
  - [Using npm](#using-npm)
- [Contributing](#contributing)
  - [GitHub Issues](#github-issues)
  - [Pull Requests](#pull-requests)
- [License](#license)

## Overview

The Platform Specification is designed to help platform engineers, infrastructure architects, and DevOps teams define and manage cloud platforms efficiently. By providing a common structure, this specification makes it easier to deploy platforms across different cloud providers and environments. The documentation is built using [Vitepress](https://vitepress.dev/), and hosted on GitHub Pages.

## Website

The official documentation for the Platform Specification is generated statically using [Vitepress](https://vitepress.dev) and can be found at https://platformspec.io.

## Getting Started

The website and documentation is written using [Vitepress :: Vite & Vue Powered Static Site Generator - Markdown to Beautiful Docs in Minutes](https://vitepress.dev).  Please see documentation on https://vitepress.dev for details.

You can work on the Platform Specification and its accompanying documentation locally by following the steps below.

### Using Docker

We recommend using Docker to avoid the need for setting up Node.js locally.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/platformspec/site.git platformspec/site
   cd platformspec/site
   ```

2. **Build and Run the Docker Container:**
   ```bash
   touch .env
   make build
   make run
   ```

3. **Access the Local Site:**
   Open your browser and visit `http://localhost:5173` to view the live version of the site locally.

### Using npm

Alternatively, you can use Node.js and npm for local development.

1. **Clone the Repository:**
   ```bash
   git clone https://github.com/platformspec/site.git platformspec/site
   cd platformspec/site
   ```

2. **Install Dependencies:**
   ```bash
   npm install
   ```

3. **Run the Development Server:**
   ```bash
   npm run docs:dev
   ```

4. **Access the Local Site:**
   Visit `http://localhost:5173` in your browser to view the site.

### Build the Site

To build the static HTML version of the site for production:

```bash
npm run docs:build
```

The output will be located in the `dist/` directory.

## Contributing

We welcome contributions from the community! Whether you want to report a bug, suggest an improvement, or submit a pull request, we'd love to hear from you.

### GitHub Issues

You can participate by submitting issues related to:
- Bugs or issues in the specification
- Enhancements or feature requests
- Questions or discussions about the project

To submit an issue:
1. Visit the [GitHub Issues](https://github.com/platformspec/site/issues) page.
2. Search for existing issues before creating a new one.
3. If a similar issue doesn’t exist, click "New Issue" and fill in the template.

### Pull Requests

We accept contributions via pull requests. Before submitting one:
1. Ensure the issue you’re addressing has been discussed or logged.
2. Fork the repository and create a new branch.
3. Implement your changes and write tests if necessary.
4. Run `npm run docs:dev` to ensure everything works.
5. Submit a pull request with a detailed description of your changes.

## License

This project is licensed under the [Creative Commons BY-SA 4.0 License](https://creativecommons.org/licenses/by-sa/4.0/).

---

Thank you for contributing to the Platform Specification! If you have any questions, feel free to reach out via GitHub Issues or Discussions.
