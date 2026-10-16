# Forma Avatar Studio

Private, on-device photo-avatar creation and wardrobe preview. No Avaturn subscription, account, or API key is needed.

## Run
Use Node.js 20 or newer:

```sh
npm ci
npm start
```

Open http://127.0.0.1:3000. Camera access requires localhost or HTTPS. Uploading a portrait works without a webcam.

```sh
npm test
npm run build
```

The build runs the regression tests before preparing the self-contained static site in `dist/`. Netlify publishes `dist/` from `main` using `netlify.toml`.

## Customer workflow
1. Upload one well-lit frontal portrait, or take a photo with the camera.
2. Confirm processing on this device, then choose Create my avatar.
3. Select clothes, body appearance, hair and eyewear. Preview idle/walk motion and rotate the view.
4. Save locally, reopen from My avatars, or download GLB/PNG.

Photos and landmarks are processed in a browser worker. Saved avatars and their face textures stay in IndexedDB on that browser. Clearing browser data removes access to the library; export a GLB for a portable copy. No cloud accounts or cross-device storage are included.

## Accurate product limits
Facial depth comes from landmarks estimated from one photograph. The unseen head and body are generic. Body sliders change visual proportions, not body measurements. Garments are fitted sample meshes with skeletal deformation; there is no physical cloth simulation or validated size/fit prediction. Store products, checkout and customer accounts are not connected. Do not present this as a measured replica of the customer or a completed store integration.

See VERIFICATION.md for release evidence and outstanding real-device checks, and THIRD_PARTY_NOTICES.md for asset provenance.
