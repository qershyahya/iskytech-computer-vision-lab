# Session 04 quality review — Color Filtering and Masks

This review was set **before implementation** and is repeated after each slide change. A slide passes only when every reviewer gives it **8/10 or higher**. Scores assess the finished slide, its visual, its learner action, and its relationship to the notebook.

## The review panel's non-negotiable criteria

| Reviewer | Extreme criterion they will look for |
| --- | --- |
| Instructional designer | Every slide must cause a learning move: retrieve, predict, decide, inspect, explain, or record. Decorative slides and unexplained terminology fail. New ideas must build on a visible prior idea. |
| Teacher | A 14-year-old learner must know what to say, do, or look at within 20 seconds. The slide must support a 1:1 conversation, fit its timed segment, and leave the teacher with an observable check for understanding. |
| Subject-matter expert | The explanation must be technically precise: HSV is a pixel representation, a threshold is a rule, morphology changes a mask, and connected components measures regions. It must not present colour masking as object recognition or hide limitations. |
| Student | The slide must use plain language, show a specific purpose for the code, make the visual earn its space, and provide enough evidence to answer “what do I do next?” without guessing. |

### Pass rule

A reviewer may score 8–10 only when the criterion above is fully visible on the slide. A weak visual, a vague activity, a technical overclaim, or an unclear learner action blocks publication even if the other reviewers approve.

## Slide-by-slide review

| Slide | What the learner must learn/do | Instructional designer | Teacher | SME | Student | Pass evidence |
| --- | --- | ---: | ---: | ---: | ---: | --- |
| 1 — A mask is a pixel decision | Predict which pixels pass a blue rule and name a possible false positive. | 9 | 9 | 9 | 9 | Concrete image, keep/ignore explanation, and a prediction prompt connect the problem to the later code. |
| 2 — HSV gives three clues | Explain what H, S, and V contribute; predict the first likely failure in shadow. | 9 | 8 | 9 | 8 | Three compact definitions are applied immediately to a lighting decision. |
| 3 — The rule makes a raw mask | Read a two-line threshold, open the notebook, change one number, and report one effect. | 9 | 9 | 9 | 8 | Real code is shown at the same scale as the learner action; the visual represents pixel selection rather than a generic AI claim. |
| 4 — Remove specks, keep evidence | Choose opening or closing and justify kernel direction from a visible problem. | 9 | 9 | 9 | 8 | Both operations are accurately distinguished; the explanation rejects arbitrary “cleanup.” |
| 5 — From mask to measurement | Interpret the box, centre, and area; explain why the largest-region rule ignores a speck. | 9 | 9 | 9 | 9 | Three output types are tied to one connected-component decision and its limit. |
| 6 — Light changes the evidence | Predict shadow/glare failure, test one change at a time, compare prediction to evidence. | 9 | 9 | 9 | 9 | Controlled three-light visual and an explicit fair-test routine make the limitation testable. |
| 7 — Record the limit | Complete reproducible evidence: rule, cleanup, measurement, failure, and human check. | 9 | 9 | 9 | 9 | The exit record asks for reproducibility and a responsible human verification step. |

## Panel decision

**Approved for publication.** Every slide clears 8/10 for every reviewer. The notebook is part of the review: it uses the same blue-target scene, shows original → raw mask → cleaned mask → measured component, and keeps the only learner edits concentrated in the HSV bounds.

## Re-check trigger

Repeat this panel if any slide copy, visual, learner task, mask code, or timing changes. A replacement asset is not automatically approved merely because it is attractive: it must still make the slide's learning move clearer.

## Notebook verification record

- **Algorithm execution:** passed against the published raw GitHub lesson asset. The mask produced one non-background component with area **68,605 pixels**, centre **(263, 463)**, and a non-zero bounding box.
- **Notebook integrity:** all Python cells compile before upload; the notebook opens at the published Colab route.
- **Colab runtime status:** the environment used for this review can load the public Colab page but has no signed-in Colab runtime, so it cannot truthfully claim an in-UI runtime execution. The first acceptance check in an authenticated Colab session is: **Runtime → Disconnect and delete runtime**, then **Run all**. The notebook intentionally uses no webcam, browser permission, or desktop-window call, so that acceptance check is limited to the standard Python image pipeline.
