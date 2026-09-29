# Computer Vision Lesson Deck — Build Plan

## Goal

Build an online, self-paced computer-vision lesson deck for an experienced 16-year-old. Every idea is delivered in one short, testable teaching unit. Each deck screen has exactly ten visual elements: one main explanatory illustration, three small concept cues, and six quiet decorative patterns. No image is a collage; every asset is generated and stored as its own file before layout.

The deck will use a real notebook runtime when one is available. It will never simulate a live notebook with a static mock-up.

## Visual identity

| Role | Value | Use |
|---|---:|---|
| Ink | `#000000` | page base, illustration outlines |
| Sky blue | `#158AC2` | primary forms, links, structure |
| Orange | `#F68A45` | active idea, emphasis, primary action |
| Apricot | `#FEC377` | secondary fill and pattern |
| Pale cream | `#FFDDAD` | text, light fill and contrast |

### Illustration rules

- Flat 2D editorial cartoons only.
- Black slightly imperfect outlines; blue, orange, apricot, and cream fills only.
- No photorealism, 3D rendering, anime, gradients, text inside artwork, logos, UI panels, emojis, SVG icon substitutes, or bundled multi-part scenes.
- Each image shows one object, action, or relationship.
- Main illustration: occupies the right teaching area and explains the slide’s one idea.
- Three concept cues: independently generated small illustrations that reinforce the idea.
- Six decoration assets: independently generated small patterns placed only in empty margins. They never cover text, controls, a main illustration, or one another.

### Ten-element composition contract

| Slot | Role | Layout zone |
|---|---|---|
| 1 | Main illustration | right teaching area |
| 2–4 | Three concept cues | near the main illustration, with their own clear space |
| 5–10 | Six low-contrast decorative patterns | outer margins only |

The text column remains a protected rectangle. All elements use a spacing grid and are placed in separate slots; no absolute decorative element may cross another element’s box.

## Atomic asset library

### Reusable decorative library — 18 individual generated files

The six decoration slots on each screen draw from this library. They are small, sparse, and reused only when they do not compete with the lesson idea.

1. Lens and three pixels
2. Magnifier and pixel cluster
3. Three image tiles
4. Four pixel squares
5. Curved camera-field line
6. Small light ray
7. Crop-corner pair
8. Confidence gauge needle
9. Tiny object silhouette
10. Dot trail
11. Corner grid
12. Three overlap circles
13. Motion arrow trail
14. Three-point constellation
15. Mask-shaped blob
16. Binary on/off tiles
17. Small camera body
18. Error spark

Every item is generated individually as a transparent PNG. CSS controls only placement, size, and opacity; it does not draw substitute artwork.

### Main and concept-cue asset manifest

| Deck screen | One main illustration | Three small concept cues |
|---|---|---|
| Mission: find the yellow mug | a single yellow mug seen by a simple camera | camera, yellow swatch, question mark-free target ring |
| Predict failure | a yellow mug half in shadow | glare ray, blue mug, yellow notebook |
| Five questions | a camera with five separate view rays | label tag, location pin, pixel mask |
| Classification lab | one image card with a cat-like silhouette | ranked cards, whole-image frame, one category tile |
| Detection lab | three separate desk objects | one box corner, object tag, confidence gauge |
| Segmentation lab | one boot with a clean boundary | pixel cluster, boundary ribbon, overlap silhouette |
| Landmarks lab | one hand in a pinch gesture | fingertip point, joint chain, coordinate crosshair |
| Tracking lab | one runner in two positions | ID badge, dot trail, three frame tiles |
| Task atlas | a camera splitting into five clean paths | label, box, mask |
| Vision pipeline | five connected plain process blocks | camera, transform arrows, decision lever |
| Method selection | a rule card beside a learning card | colour swatch, small dataset stack, branching arrow |
| Evidence | an input card becoming an output card | checklist mark, test tube, result card |
| Failure testing | one object under a shade | glare ray, crop corner, motion streak |
| Confidence | one gauge between two decision paths | false-positive marker, missed-object marker, threshold line |
| Responsible vision | a camera with a privacy cover | consent card, minimal-data box, person-reviewed tick |
| Design then code | a simple project blueprint card | user, input card, test card |
| Exit ticket | camera, model, and test card in a line | eye, route arrow, check card |

This creates 68 lesson-specific assets: 17 main illustrations and 51 concept cues. Together with the 18 decoration files, the completed library contains **86 individually generated PNG assets**. A screen shows ten assets at a time; it does not compress its ten assets into one generated image.

## Asset-generation sequence

1. Generate and approve the 18 reusable decorations first, one file per request.
2. Generate the main illustration for a screen.
3. Generate its three concept cues, one file per request.
4. Place only that screen’s four teaching assets plus six compatible decorations.
5. Inspect the screen at desktop and mobile widths for cropping, overlap, contrast, and reading order.
6. Repeat for the next screen.
7. Keep an `assets/manifest.json` record of prompt, filename, slide use, and status.

No asset generation begins until the following instructional copy and runtime plan have been installed in the project.

## Notebook runtime: Binder + Colab

### What can be embedded

A real Binder session can be embedded only after these conditions are true:

1. The notebooks and Binder configuration are in a **public Git repository**.
2. MyBinder successfully builds that repository.
3. The returned Binder URL loads in an iframe in the deck.
4. A launch test confirms that the actual Jupyter interface, kernel, and notebook are visible and runnable.

The target live URL format is:

```text
https://mybinder.org/v2/gh/<github-owner>/<repository>/<commit>?urlpath=lab/tree/notebooks/<notebook>.ipynb
```

The deck will use this URL only after the live test succeeds. Until then, it shows a clearly labelled disabled runtime status plus working **Download notebook** and **Open in Colab** links. It will not show an iframe pretending to execute code.

### Runtime repository structure

```text
computer-vision-notebooks/
├── binder/
│   └── requirements.txt
├── notebooks/
│   ├── 01_classification_what_is_in_the_image.ipynb
│   ├── 02_detection_where_are_the_objects.ipynb
│   ├── 03_segmentation_which_pixels_belong_to_it.ipynb
│   ├── 04_landmarks_where_are_the_key_points.ipynb
│   └── 05_tracking_where_did_the_object_move.ipynb
└── README.md
```

`binder/requirements.txt` will pin only the packages required by the five notebooks: `ultralytics`, `mediapipe`, `opencv-python-headless`, `Pillow`, and `ipython`.

### Operational limit

MyBinder is suitable for a classroom demo, not a guaranteed hosted product: it uses public repositories, has no persistent storage, culls inactive sessions after roughly ten minutes, and offers 1–2 GB RAM. The Ultralytics notebooks are the riskiest within that limit. The deck therefore retains Colab as the robust alternative for heavier model runs. Binder’s own usage guidance documents the public, temporary nature of sessions and the resource limits: [Binder usage guidelines](https://mybinder.readthedocs.io/en/latest/about/user-guidelines.html). Binder supports links that open a specified notebook in JupyterLab: [Binder launch documentation](https://mybinder.readthedocs.io/en/latest/howto/launch.html).

## Instructional copy

The lesson copy is deliberately short. A screen carries one question, one claim, and one action.

### Mission: Find the yellow mug
**Question:** Can a camera find this yellow mug?  
**Claim:** Start with a visible job, not a model.  
**Action:** Name the target, the output, and one reason the result could be wrong.

### Predict failure
**Question:** What will the system get wrong?  
**Claim:** A result is more useful when you predicted its failures first.  
**Action:** Predict one false positive and one false negative.

### Five questions
**Question:** Which question does your problem actually ask?  
**Claim:** Classification, detection, segmentation, landmarks, and tracking answer different questions.  
**Action:** Choose the notebook that matches the required output.

### Classification lab
**Question:** What is in this image?  
**Claim:** Classification labels the whole image; it does not tell you where an object is.  
**Action:** Change `TOP_K`, compare the ranked labels, and note which label stays stable.

### Detection lab
**Question:** Where are the objects?  
**Claim:** Detection returns object locations and a confidence for each retained finding.  
**Action:** Change `CONFIDENCE`; record the first box that disappears.

### Segmentation lab
**Question:** Which pixels belong to it?  
**Claim:** A mask is useful when the exact visible outline matters.  
**Action:** Compare a box with a mask and name a task that needs the mask.

### Landmarks lab
**Question:** Where are the key points?  
**Claim:** Landmarks return structured coordinates such as joints and fingertips.  
**Action:** Predict which point will be hardest to locate, then inspect the result.

### Tracking lab
**Question:** Where did it move?  
**Claim:** Tracking keeps temporary IDs through time; it does not identify a person.  
**Action:** Change `MAX_FRAMES` and identify an uncertain or switched ID.

### Task atlas
**Question:** What output does each task return?  
**Claim:** The requested output determines the correct vision task.  
**Action:** Match five real questions to five outputs.

### Vision pipeline
**Question:** What happens before and after the model?  
**Claim:** A vision system is capture, preparation, interpretation, decision, and evaluation.  
**Action:** Locate the stage where a bad camera frame should be rejected.

### Method selection
**Question:** Rule or trained model?  
**Claim:** Use the simplest method that survives the conditions you expect.  
**Action:** State one controlled condition that makes a colour rule reasonable.

### Evidence
**Question:** What makes an output believable?  
**Claim:** A result becomes evidence when its input, change, output, and test are explicit.  
**Action:** Write one changed condition that could disprove your result.

### Failure testing
**Question:** How will this fail?  
**Claim:** Test shadow, glare, movement, crop, and clutter before trusting a demo.  
**Action:** Design one deliberate failure test.

### Confidence
**Question:** Is a high score truth?  
**Claim:** Confidence is a model score; threshold choice trades missed findings against weak findings.  
**Action:** Choose the costlier mistake for your use case.

### Responsible vision
**Question:** Should the system see this at all?  
**Claim:** Detection is not identification, and capability is not permission.  
**Action:** Add one consent, privacy, bias, or human-review rule.

### Design then code
**Question:** What decision will the system support?  
**Claim:** Good projects start with a decision, a user, a visible input, and a test.  
**Action:** Write a four-line problem brief.

### Exit ticket
**Question:** What will you carry into the next lesson?  
**Claim:** Useful vision means seeing, interpreting, and testing.  
**Action:** Bring one problem, one likely failure, and one responsible-use rule.

## Build order after this plan

1. Add the asset manifest and empty asset slots.
2. Build the truthful runtime panel, notebook links, and Binder configuration.
3. Install the concise instructional copy and atomic screen layout.
4. Generate and place individual assets following the manifest.
5. Test every notebook link and every live Binder iframe after a repository URL exists.
6. Perform visual QA at desktop and mobile sizes; fix every overlap or unreadable element.
