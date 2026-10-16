# Verification — 2026-10-17

## Release changes
- Restored the missing exported Avatar class from the complete repository source; the previous main branch could not start app.js.
- Retained supported wardrobe styles, used garment kinds consistently, and removed unsupported shape labels.
- Kept the body continuous under clothes, preserved skin weights from the original anatomical surface, offset fabric normally at shoulders, and retained straight hem bounds.
- Removed the duplicate rear-head overlay when a photo face is attached.
- Added cancellable camera ownership, stale request guards, stream release on background/page exit, explicit playback errors, and busy-state guards during generation/export.
- Fixed narrow-screen controls being covered by the header, added dialog scrolling, reduced render/shadow workload, and clarified single-photo and local-storage limits.
- Builds now run all regression tests before producing static assets.

## Verified locally
- Twelve automated tests pass: garment continuity/hem bounds; normalized weights and arm deformation for every top; saved-face retention through wardrobe rebuild; camera cancellation/overlap; face coordinate validation; server boundaries and local WASM/model delivery.
- Public MediaPipe portrait reconstruction completed in 8.3 seconds; the textured face appeared correctly in the front view.
- Saved a named public sample avatar, reloaded, reopened it with face intact, changed tee/hoodie, and previewed walking.
- Downloaded GLB validated: 1,602,700 bytes, 468 face vertices, 898 face triangles, five embedded textures, 22 bones, Idle and Walk clips. PNG download succeeded.
- Desktop 1280x900 and responsive 390x844 views checked. On the narrow layout, uploaded a blank PNG, confirmed local processing, and received a no-face error; controls recovered and the prior avatar remained intact.
- No browser console errors in tested flows.

## Acceptance limits
Physical iPhone/Android camera and performance tests remain outstanding; responsive desktop emulation does not replace them. Single-photo likeness, depth and garment weights remain approximate. There is no validated body measurement, physical cloth simulation, store catalog, real checkout, login, or cross-device storage. This release is a functional local avatar studio, not a finished store-connected try-on product.
