# Session 05 quality harness — Object Detection and Shape Analysis

## Strict pass criteria

Every slide must make one meaningful learning move, use plain language suitable for a 14-year-old, show evidence rather than an ungrounded claim, and support the 50-minute one-to-one sequence. The notebook must use the smallest practical amount of fully commented code, run without a webcam or account-specific setup, and make its output inspectable. Each visual must explain this lesson’s idea rather than decorate the page. Keyboard navigation, labelled buttons, text alternatives, readable contrast, and a timer-hide control are required.

## Review method

The same four reviewers inspect the written slide, its visual, the interaction, and its position in the lesson. A slide passes only if **every role awards at least 8/10**. Round 1 observations were converted into fixes before the final scores below.

| Slide | Round 1 issue → concrete correction | Instructional designer | Teacher | CV SME | Student | Result |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 | Generic object art did not explain the process → original contour-to-measurement visual plus prediction prompt. | 9 | 9 | 9 | 9 | Pass |
| 2 | The symbol-only sequence was unclear → replacement visual explicitly shows original triangle → binary mask → contour and corners. | 9 | 9 | 9 | 9 | Pass |
| 3 | Measurements were named without a use → four clues are paired with four questions and a marked shape board. | 9 | 9 | 9 | 8 | Pass |
| 4 | Notebook hand-off was passive → prediction before running, explicit expected evidence, and large Colab action. | 9 | 9 | 9 | 9 | Pass |
| 5 | Failure was abstract → unique separated-versus-touching contour visual and one-condition stress exercise. | 9 | 9 | 10 | 9 | Pass |
| 6 | Method comparison was too broad → controlled-shape conditions contrasted with varied real-world objects. | 9 | 9 | 10 | 8 | Pass |
| 7 | The exit checklist was too abstract → replacement evidence-notebook visual shows each record item beside its visual evidence. | 9 | 9 | 9 | 9 | Pass |

## Notebook verification

- Executed every Python code cell locally after excluding the Colab-only `%pip` directive.
- Result: `Objects counted: 3` and three contours detected.
- The notebook uses a synthetic controlled image, so it needs no download, account, webcam, or device permission.
- Every executable step is preceded by an age-appropriate comment explaining what it does and why.

## Browser/render evidence

- Seven slide anchors (`#s1`–`#s7`) are present and unique.
- All three project-local visual assets resolve.
- The HTML has keyboard navigation, labelled previous/next buttons, timer hide/show controls, alt text on raster visuals, and mobile fallbacks.
- All seven slides were rendered at 1600×900 and reviewed as a contact sheet. No clipping, missing visuals, or overlap was found.
