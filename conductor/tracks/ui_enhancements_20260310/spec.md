# Specification: UI Enhancements & Theme Toggle

## Overview
This track addresses several UI polish items on the Dashboard to improve data readability and user experience. It includes dynamic scaling and coloring for data visualization components, layout adjustments for the main chart, and the introduction of a light/dark mode toggle.

## Functional Requirements
### 1. Trending Keywords Visualization
- Update the horizontal bar charts for "Trending Keywords" so their widths accurately and proportionally reflect their percentage values (0-100%).
- Apply a semantic color scheme (e.g., green for high growth, yellow for moderate, red for negative/low) to the bars instead of a static purple, based on the keyword's growth metric.

### 2. Correlation Analysis UI
- Dynamically style the correlation score background and text colors based on the correlation strength.
- Use a semantic color scale (e.g., green for strong correlation, yellow for moderate, gray/red for weak).

### 3. Main Chart Adjustments
- Modify the layout of the main "Analyzed Conversations" line chart so it stretches to fill the available width of its container card.
- Add a legend at the bottom of the chart to clearly label the days (Mon-Sun).

### 4. Theme Toggle (Light/Dark Mode)
- Implement a theme toggle mechanism that switches the application between dark mode (current default) and a new light mode.
- Light mode should feature an off-white background while preserving the primary purple brand accents.
- The toggle button must be located in the Sidebar component.

## Acceptance Criteria
- Trending keyword bars visually scale from 0% to 100% correctly and change color based on growth.
- Correlation score badges change color according to their numerical value.
- The main line chart spans the full width of its designated area and displays a bottom legend.
- Clicking the theme toggle in the sidebar successfully switches the entire app between light and dark modes, persisting state where applicable or at least functioning smoothly across the session.

## Out of Scope
- Adding new charts or data points not currently returned by the backend.
- Modifying the underlying data analysis algorithms.