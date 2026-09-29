# Computer Vision interactive notebook library

Five independent, Colab-ready labs for the five Computer Vision task types introduced in Lesson 01.

| File | Core question | Live technology |
|---|---|---|
| 01_classification_what_is_in_the_image.ipynb | What is in the image? | YOLO11 image classifier |
| 02_detection_where_are_the_objects.ipynb | Where are the objects? | YOLO11 object detector |
| 03_segmentation_which_pixels_belong_to_it.ipynb | Which pixels belong to each object? | YOLO11 segmentation model |
| 04_landmarks_where_are_the_key_points.ipynb | Where are the important hand points? | MediaPipe Hand Landmarker |
| 05_tracking_where_did_the_object_move.ipynb | Where did an object move? | YOLO11 + ByteTrack |

Each notebook uses a public sample asset, exposes a variable to change, and ends with an evidence prompt. The only external runtime dependencies are Ultralytics for classification, detection, segmentation, and tracking, plus MediaPipe for landmarks. OpenCV remains only in the tracking lab because it writes the output video. Models and assets download on first run.
