# Third-party provenance

- **Three.js 0.180.0**: MIT. https://github.com/mrdoob/three.js/blob/r180/LICENSE
- **MediaPipe Tasks Vision 0.10.22-rc.20250304**: npm package declares Apache-2.0. https://www.npmjs.com/package/@mediapipe/tasks-vision
- **Face Landmarker model, float16, version 1**: downloaded without modification from https://storage.googleapis.com/mediapipe-models/face_landmarker/face_landmarker/float16/1/face_landmarker.task . Model documentation: https://ai.google.dev/edge/mediapipe/solutions/vision/face_landmarker/index . Model card: https://storage.googleapis.com/mediapipe-assets/Model%20Card%20MediaPipe%20Face%20Mesh%20V2.pdf . This is a third-party pretrained model, not a model trained by Forma.
- **Canonical face topology**: vertex triangle indices extracted from Google's MediaPipe canonical face model. https://github.com/google-ai-edge/mediapipe/blob/master/mediapipe/modules/face_geometry/data/canonical_face_model.obj . MediaPipe repository license: https://github.com/google-ai-edge/mediapipe/blob/master/LICENSE . Geometry construction and UV projection around that topology are application code.
- **Test portrait**: https://storage.googleapis.com/mediapipe-assets/portrait.jpg . Public example image used only to verify inference and export; not a user upload. The generated verification GLB and screenshots are labeled as public test data.

No Avaturn services, meshes or branding are used. No FLAME, DECA or EMOCA weights are included.

## MakeHuman base mesh

Only the base mesh asset is included, under CC0-1.0. Source: https://raw.githubusercontent.com/makehumancommunity/makehuman/master/makehuman/data/3dobjs/base.obj . Source hash and attribution are embedded in public/models/human-base.json. MakeHuman application code is not included. Core asset license: https://static.makehumancommunity.org/about/license.html .
