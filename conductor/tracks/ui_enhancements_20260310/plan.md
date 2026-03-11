# Implementation Plan: UI Enhancements & Theme Toggle

## Phase 1: Data Visualization Polish
- [ ] Task: Fix Trending Keywords Bar Scaling and Colors
    - [ ] Update `Dashboard.tsx` to map keyword growth to a semantic Tailwind color class (e.g., green/yellow/red).
    - [ ] Ensure the inline style `width: ${kw.percentage}%` accurately reflects the scale relative to its container.
- [ ] Task: Dynamic Correlation Score Colors
    - [ ] Update `Dashboard.tsx` to conditionally apply background and text colors to the correlation score badge based on `cor.score`.
- [ ] Task: Main Chart Layout and Legend
    - [ ] Adjust the Tailwind classes on the `react-chartjs-2` wrapper `div` to ensure it stretches full width.
    - [ ] Update `chartOptions` in `Dashboard.tsx` to enable the legend and position it at the bottom.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Data Visualization Polish' (Protocol in workflow.md)

## Phase 2: Theme Toggle
- [ ] Task: Implement Theme Context/State
    - [ ] Update `App.tsx` or create a context to manage `isDarkMode` state.
    - [ ] Apply or remove the `.dark` class on the root HTML `<html>` or `<body>` element based on state.
- [ ] Task: Add Sidebar Toggle Button
    - [ ] Update `Sidebar.tsx` to accept the theme state and a toggle function as props.
    - [ ] Add the toggle button UI to the bottom of the sidebar.
- [ ] Task: Conductor - User Manual Verification 'Phase 2: Theme Toggle' (Protocol in workflow.md)