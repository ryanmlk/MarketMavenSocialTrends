# Implementation Plan: Pre-generated PDF Report Export

## Phase 1: PDF Report Generation Script

- [x] **Task: Set up PDF generation environment** [f35954a]
    -   [x] Sub-task: Choose and install a Node.js library for PDF creation (e.g., `pdfkit`, `jspdf`). I will research the best option.
    -   [x] Sub-task: Create a new script file `server/src/generate-report.ts`.
- [x] **Task: Read and process CSV data** [a4f8a30]
    -   [x] Sub-task: Write a failing test for reading the CSV file.
    -   [x] Sub-task: Implement logic in `generate-report.ts` to read and parse `/mnt/area51/Projects/SocialsMonitor/scraped_reddit_data.csv`.
    -   [x] Sub-task: Ensure the test passes.
- [x] **Task: Implement Correlation Analysis for PDF** [35faeea]
    -   [x] Sub-task: Write a failing test for the correlation analysis output.
    -   [x] Sub-task: In `generate-report.ts`, adapt the existing `detectCorrelations` logic or reuse it to process the post text from the CSV.
    -   [x] Sub-task: Add the correlation analysis results to the PDF.
    -   [x] Sub-task: Ensure the test passes.
- [x] **Task: Implement Conversations over Time Graph for PDF** [14d2c50]
    -   [x] Sub-task: Write a failing test for the time-series data generation.
    -   [x] Sub-task: In `generate-report.ts`, process the 'Timestamp' data from the CSV to aggregate post counts over a time period (e.g., daily).
    -   [x] Sub-task: Use a charting library compatible with the chosen PDF library (or generate an image and embed it) to create the line graph.
    -   [x] Sub-task: Add the graph to the PDF.
    -   [x] Sub-task: Ensure the test passes.
- [x] **Task: Add Hashtags and Likes to PDF** [14d2c50]
    -   [x] Sub-task: Write a failing test for including hashtags and likes.
    -   [x] Sub-task: Add the 'Hashtags' and 'Likes' data from the CSV to the PDF in a readable format.
    -   [x] Sub-task: Ensure the test passes.
- [x] **Task: Finalize and Generate the PDF** [14d2c50]
    -   [x] Sub-task: Add a title and structure to the PDF document.
    -   [x] Sub-task: Run the `generate-report.ts` script to produce the final `social_analysis_report.pdf`.
- [ ] **Task: Conductor - User Manual Verification 'Phase 1: PDF Report Generation Script' (Protocol in workflow.md)**

## Phase 2: Integration and Serving the PDF

-   [ ] **Task: Store the generated PDF**
    -   [ ] Sub-task: Place the `social_analysis_report.pdf` into a directory that will be served publicly by the frontend server (e.g., `client/public/`).
-   [ ] **Task: Update Frontend Export Button**
    -   [ ] Sub-task: Write a failing test for the export button's new behavior.
    -   [ ] Sub-task: Modify the `onClick` handler for the "Export Report" button in `client/src/components/Dashboard.tsx`.
    -   [ ] Sub-task: Change the handler to directly link to the path of the static PDF (e.g., `/social_analysis_report.pdf`).
    -   [ ] Sub-task: Ensure the test passes.
-   [ ] **Task: Clean up old export endpoint (optional but recommended)**
    -   [ ] Sub-task: Since the export is now a static file, the `/api/export` endpoint in the Express server (`server/src/index.ts`) may no longer be needed. Analyze and consider removing it and its related tests (`server/src/export.test.ts`).
-   [ ] **Task: Conductor - User Manual Verification 'Phase 2: Integration and Serving the PDF' (Protocol in workflow.md)**
