# Tech Stack: Social Media Trend Analyzer

## Language & Runtime
- **Node.js (LTS):** The primary runtime for both frontend and backend.
- **TypeScript:** Used throughout the project for enhanced type safety and maintainability.

## Backend
- **Express.js:** A minimalist web framework for building the application's API endpoints.
- **Node-NLP / Natural:** For text processing, keyword extraction, and theme clustering.
- **Danfo.js:** For data manipulation and analysis, providing a Pandas-like API for JavaScript.

## Frontend
- **React:** The primary library for building the interactive user interface.
- **Tailwind CSS:** For rapid, utility-first styling and a professional look.
- **Chart.js / Recharts:** To create visual summaries and trend graphs on the dashboard.
- **Stitch UI:** Implementing the pre-defined dashboard and upload screens.

## Infrastructure & Tools
- **Git:** Version control and collaboration.
- **NPM:** Package management and script execution.
- **Prettier & ESLint:** Ensuring code quality and consistent formatting.
- **Docker:** Containerization to ensure consistent development, testing, and hosting environments.

## Data Processing
- **File System (Local):** Temporary storage for uploaded CSV and JSON files.
- **In-Memory Storage:** Efficient processing of datasets for near-instant reporting.
- **Docker Compose:** Streamlining multi-container setup (e.g., frontend, backend, and potential future services).
