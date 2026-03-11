# Specification: Pre-generated PDF Report Export

## 1. Overview

This track is to implement a feature that allows users to export a pre-generated PDF report. The report will be generated during development and included in the application bundle. When a user clicks the existing "Export Report" button, this static PDF file will be served to them.

The report will contain analysis based on the data from `/mnt/area51/Projects/SocialsMonitor/scraped_reddit_data.csv`.

## 2. Functional Requirements

### 2.1. Report Content

The PDF report MUST contain the following sections:

1.  **Hashtags:** A list or table of hashtags from the dataset.
2.  **Likes:** A list or table of the number of likes for each post.
3.  **Correlation Analysis:**
    *   This section will display pairs of keywords that frequently appear together in posts.
    *   The analysis will be based on the co-occurrence of words in the 'Post text' column of the source data.
    *   The output should be similar to the "Correlation Analysis" section on the main dashboard, showing keyword pairs and a correlation score.
4.  **Conversations Over Time Graph:**
    *   This section will display a line graph visualizing the number of posts over time.
    *   The graph should be similar in style to the one on the main dashboard.
    *   The time-series data will be derived from the 'Timestamp' column of the source data.

### 2.2. Report Generation

*   The PDF report will be generated as a one-time process during development.
*   The data source for this generation is `/mnt/area51/Projects/SocialsMonitor/scraped_reddit_data.csv`.
*   The generated PDF file will be static and packaged into the production Docker image.

### 2.3. Export Trigger

*   The user will trigger the download by clicking the existing "Export Report" button on the dashboard.
*   Clicking this button will download the pre-generated PDF file.

## 3. Non-Functional Requirements

*   **Format:** The report must be in PDF format.
*   **Performance:** Since the report is pre-generated, the download should be near-instantaneous for the user.

## 4. Out of Scope

*   Dynamically generating the report on-the-fly based on user-selected data or filters.
*   Any changes to the existing dashboard UI other than modifying the action of the "Export Report" button.
*   User authentication or authorization for accessing the report.
