# Specification: Enhanced Data Cleaning for Keyword Extraction

## Overview
The current data cleaning process yields irrelevant trending keywords (e.g., "#just", "#ve", "#not"). This track aims to improve the data cleaning pipeline to filter out common English stop words and handle punctuation more intelligently, resulting in more meaningful keyword extraction.

## Functional Requirements
- **Stop Word Filtering:** Implement a robust English stop word list to filter out common words (e.g., "just", "not", "the").
- **Contextual Punctuation Filtering:** Improve the tokenization process to handle contractions (e.g., preventing "I've" from being split into "I" and "ve") while preserving relevant symbols like hashtags (`#`) and mentions (`@`).
- **Minimum Keyword Length:** Filter out any extracted keywords that are less than 3 characters long, unless they are specific known acronyms (if applicable, though standard length filtering will be the primary mechanism).

## Non-Functional Requirements
- **Performance:** The enhanced cleaning logic should not significantly increase the overall processing time for large datasets (e.g., 1000+ records).

## Acceptance Criteria
- Given a post containing common stop words and contractions (e.g., "I've just not seen a better tool!"), the extracted keywords should NOT include "ve", "just", or "not".
- Given a post with a hashtag (e.g., "#AI is great"), the hashtag should be preserved correctly if intended.
- The unit tests for `cleanText` and `extractKeywords` are updated and passing.

## Out of Scope
- Multilingual stop word support.
- Customizable stop word lists via the UI.