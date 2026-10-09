# G2S2 Computer Vision — Semester Map

## Delivery contract

- **Format:** 12 individual 50-minute sessions.
- **Routine:** predict → run or edit code → inspect a visible output → record evidence.
- **Every session:** one distinct technical purpose, one Colab-ready notebook, one evidence card, and a forward link.
- **Project rules:** detection is never described as recognition; facial work requires privacy, consent, storage, bias, and human-review decisions.

| Session | Topic | Learner outcome | Code activity | Evidence card |
|---:|---|---|---|---|
| 01 | Computer Vision — retained | Existing published Session 01 remains unchanged. | Existing Session 01 activities remain unchanged. | Existing Session 01 exit evidence remains unchanged. |
| 02 | Image Manipulation for Vision — retained | Existing published Session 02 remains unchanged. | Existing Session 02 activities remain unchanged. | Existing Session 02 exit evidence remains unchanged. |
| 03 | Drawing and Shapes on Images | Build live-video output interfaces: boxes, labels, guides, ROIs, status panels, and measurement overlays. | Draw an interface over a webcam frame. | Overlay purpose, ROI, measured value, user feedback. |
| 04 | Voice and Vision | Turn a voice/text command into a validated vision action and useful visual feedback. | Map commands to safe vision controls. | Command, validated action, visual response, rejected input. |
| 05 | Color Filtering and Masks | Use HSV masks, trackbars, morphology, and connected components under changing light. | Tune an HSV mask and track connected components. | HSV range, morphology choice, tracked component, lighting failure. |
| 06 | Object Detection and Shape Analysis | Use contours, geometry, and region properties to detect, classify, count, and measure simple objects; compare with deep learning. | Measure contour-based shapes in a frame. | Shape rule, count/measurement, deep-learning comparison. |
| 07 | Deep Learning in Vision | Explain CNNs, transfer learning, splits, augmentation, overfitting, and confidence; run a pretrained classifier. | Run and evaluate a pretrained image classifier. | Top labels, confidence, augmentation effect, overfitting risk. |
| 08 | From Classification to Detection | Interpret detector labels, boxes, confidence, and non-maximum suppression; evaluate false positives/negatives. | Run a pretrained detector and alter its retained-box rule. | Threshold, boxes retained, false-positive/negative cost. |
| 09 | MediaPipe for Computer Vision | Turn hand, pose, or face landmarks into gestures, measures, or controls. | Use landmarks to trigger a gesture or movement control. | Landmark input, gesture rule, control response, failure case. |
| 10 | Face Detection | Build real-time face detection while distinguishing it from recognition and applying responsible-use rules. | Run detection only and display non-identifying face boxes. | Consent, storage rule, bias test, human review, no-identification boundary. |
| 11 | Reviewing and Project Engineering | Compare techniques by accuracy, speed, compute cost, robustness, and privacy; choose a final-project method. | Score candidate methods against project constraints. | Chosen method, rejected method, trade-off, project test plan. |
| 12 | Final Project | Build, test, document, and demonstrate a complete computer-vision application. | Run a project pipeline with inputs, outputs, evaluation, limits, and responsible-use decision. | Demo result, criteria, limitation, next test, responsible-use rule. |

## Scope boundary

Sessions 01 and 02 are retained exactly as already published. The G2S2 realignment begins at **Session 03**.

## Sequence gates

1. The notebook and slide must use the session's stated technique—not a generic substitute.
2. The code activity must create or inspect a real visible output.
3. The evidence card records input, action, output, and limitation.
4. No session repeats a prior session's question or treats a model score as proof.
5. Session 12 may combine methods only after Session 11 selects them using stated engineering constraints.
