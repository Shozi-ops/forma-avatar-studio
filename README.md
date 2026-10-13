# Forma Avatar Studio

Private, on-device 3D avatars from a single selfie. No account. No photo upload. Export GLB.

```bash
npm ci && npm start
```

Open http://localhost:3000 (Node 20+).

## What Forma is

Forma is an independent avatar studio. A front-facing portrait is reconstructed locally with MediaPipe landmarks into a photo-textured face, fitted to a humanoid body with selectable wardrobe, motion preview, and GLB/PNG export. Avatars can be saved in the browser library.

**Different by design**

- **On-device only** — photos never leave the browser; the server refuses photo uploads
- **One selfie** — no multi-angle scan or account required
- **Instant wardrobe** — tops, bottoms, shoes, hair, eyewear; shuffle or pick
- **Portable GLB** — skeleton, materials, optional idle/walk clips

## Wardrobe

Tops, bottoms, shoes, hair, and eyewear with multiple styles (tees, hoodies, polos, denim, chinos, skirts, boots, runners, curls, aviators, and more). Garments are continuous meshes fitted to the anatomical base.

## Limits (honest)

Single-photo depth is approximate; the rear head is inferred. Body shape is generic, not reconstructed from the selfie. Bone weights are approximate. There are no facial morph targets or automatic Mixamo retargeting in this build. Camera needs browser permission. Local library data should be backed up via GLB export.

## Verification

`npm test` checks serving and upload rejection. `node verify-glb.mjs path/to/avatar.glb` checks structure. See VERIFICATION.md and THIRD_PARTY_NOTICES.md.
