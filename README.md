# Forma Avatar Studio

Run `npm ci` and `npm start`, then open http://localhost:3000. Node 20+.

Upload a front-facing portrait, enable local processing, and select Create my avatar. Select garments from Tops, Bottoms, Shoes, Hair and Eyewear. Preview idle/walk motion, adjust body proportions, and export GLB or PNG. Save named avatars to the device library and reopen them after refreshing.

## Implemented

Local MediaPipe inference produces a 468-vertex photo-textured face with estimated depth and a generic rear cranium. A CC0 MakeHuman body provides a 22-bone skeleton. Continuous fitted garment meshes, scalp-fitted hair and eyewear are selectable. Garments follow the anatomical base with shared smooth normals and clean clipped hems. GLB embeds textures, skeleton and optional Idle/Walk clips. IndexedDB stores named avatars, cropped face textures and portable GLBs locally. Removal supports undo. Photos never leave the browser; the server refuses photo uploads.

## Current limitations

This is a functional independent prototype, not production Avaturn parity. Face depth and unseen head surfaces are approximate. Body shape is generic rather than reconstructed. Garments and hair are procedural starter assets with visible fit/seam limitations. Bone weights are approximate. There are no facial morph targets, ARKit blendshapes, automatic Mixamo retargeting, accounts, cloud sync or production head fitting. Camera requires browser permission. Local library data depends on browser storage and should be backed up via GLB export.

## Verification

`npm test` checks server/model serving and upload rejection. `node verify-glb.mjs /path/to/portrait-avatar.glb` checks face depth, embedded PNG textures, 22 joints and Idle/Walk animations. The public MediaPipe sample portrait was used for browser verification; no user selfie was used.

See VERIFICATION.md and THIRD_PARTY_NOTICES.md for evidence and provenance.
