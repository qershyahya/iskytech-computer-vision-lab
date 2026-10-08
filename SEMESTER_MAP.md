# Computer Vision Lab — Semester Map

## Fixed delivery contract

- **Format:** 14 individual 50-minute sessions.
- **Learner:** one experienced 16-year-old working directly with the facilitator.
- **Routine:** predict → inspect a real input → run or edit code → record evidence → reflect.
- **Session page:** one central teaching question, no duplicate timing labels, and one clear next code action.
- **Notebook:** a real `.ipynb` file, Colab-ready, with concise comments and no simulated code results.
- **Evidence:** every session ends with a named input, change, output, and decision or limitation.
- **Progression:** a later session can reuse an earlier model only when it introduces a new decision, test, or output type.

## Existing learning objectives

These are the objectives already established for the course. This map assigns each one a single primary session so the learner does not encounter the same lesson twice under different slide titles.

| # | Session | Primary learning objective | Code outcome | Evidence to retain |
|---|---|---|---|---|
| 01 | Ask a camera a question | Match a real question to classification, detection, segmentation, landmarks, or tracking. | Run one of the five starter labs. | Chosen task type and required output. |
| 02 | Change pixels, change evidence | Explain how crop, detail, blur, light, and colour alter a prediction. | Edit one input; use the detector challenge. | First edit that changes or weakens a result. |
| 03 | What is in the image? | Use classification for a whole-image label. | Run the classification notebook; compare ranked labels. | Stable and unstable labels. |
| 04 | Where are the objects? | Use detection to locate objects and compare confidence. | Run the detection notebook; adjust the retained-box threshold. | First box lost and its consequence. |
| 05 | Which pixels belong to it? | Choose a mask when an object's visible boundary matters. | Run segmentation; inspect masks against boxes. | One task that needs a mask rather than a box. |
| 06 | Where are the key points? | Interpret landmark coordinates as structured points, not identity. | Run hand-landmark detection; inspect a difficult fingertip or joint. | Point that is uncertain and why. |
| 07 | Where did it move? | Interpret temporary tracking IDs through a sequence. | Run tracking; change frame range and inspect an ID uncertainty. | Frame where an ID becomes uncertain or switches. |
| 08 | What does a score cost? | Explain the false-positive / false-negative trade-off in a threshold. | Re-run detection with a fixed image and several thresholds. | Chosen threshold and costlier mistake. |
| 09 | What did the data leave out? | Identify missing conditions in a small image set. | Build a compact test set inventory in code. | A missing condition and a collection decision. |
| 10 | Will it survive reality? | Design and execute a controlled robustness test. | Write and run one transformation test against a baseline. | Baseline, changed condition, and failure point. |
| 11 | Can it be used responsibly? | Add consent, privacy, bias, and human-review rules to a vision task. | Annotate a project brief with use constraints. | One non-negotiable deployment rule. |
| 12 | Frame one problem worth solving | Define a user, decision, input, output, and success condition. | Create the project notebook scaffold. | Four-line problem brief. |
| 13 | Build the smallest useful test | Create a narrow prototype with a visible input and evaluation rule. | Implement one project pipeline in code. | Input/output example and a known limitation. |
| 14 | Defend the result | Present evidence for a prototype and name the next test. | Run the final notebook and compare baseline with a stress case. | Final evidence card and next-test plan. |

## Sequence gates

The following gates prevent empty work or duplicated lessons:

1. **No new session begins without a distinct question.** Its title, notebook, and exit evidence must answer that question only.
2. **No notebook is linked before it runs from a clean Colab runtime.** The delivered notebook must show imports, real input, editable learner code where appropriate, and evidence prompts.
3. **No visual slide is accepted without a desktop render check.** Text, card contents, controls, and visuals must remain inside the teaching surface.
4. **Each session must add one item to the learner's evidence record.** A prediction alone is not completion.
5. **Sessions 12–14 use the learner's selected problem.** They do not introduce a sixth generic lab or repeat the five core task types.

## Build order

1. Sessions 03–07: one session per core computer-vision task.
2. Sessions 08–11: evaluation, data quality, robustness, and responsible use.
3. Sessions 12–14: individual project framing, prototype, and evidence defence.
4. Regenerate the full 1:1 guide after the sessions are published, then verify every Colab link and the semester navigation.
