# Implementation Plan: Enhanced Data Cleaning for Keyword Extraction

## Phase 1: Test Updates & Enhanced Stop Words
- [x] Task: Update Tests for New Cleaning Logic [2628779]
    - [x] Add unit tests in `cleaning.test.ts` to assert that contractions (like "I've") don't yield fragmented keywords ("ve").
    - [x] Add unit tests to ensure common stop words ("just", "not") are filtered out.
- [~] Task: Implement Enhanced Cleaning Logic
    - [ ] Update `cleanText` in `cleaning.ts` to handle contractions better.
    - [ ] Update `extractKeywords` in `cleaning.ts` to use a more robust stop word filtering approach (ensuring words like 'just', 'not' are removed).
    - [ ] Enforce a minimum character limit (e.g., length > 2) for keywords unless they are hashtags.
- [ ] Task: Conductor - User Manual Verification 'Phase 1: Test Updates & Enhanced Stop Words' (Protocol in workflow.md)