# Verification — 2026-10-10

Browser tested locally using the public Google MediaPipe sample portrait. Reconstruction completed in 5.1 seconds on this device. Selected a hoodie, saved a named avatar, reloaded the page, and reopened the avatar with its face and selected wardrobe intact. Walk preview and export dialog worked. Actual downloaded GLB passed structural validation: 1,376,524 bytes, 468 face vertices, 898 face triangles, nonzero depth, five embedded PNG textures, 22-joint skin, Idle and Walk clips. Four server tests passed.

Garment/hair fit and single-photo head likeness remain prototype quality. No ARKit or Mixamo interoperability claim is made. Mobile layout exists, but camera hardware, mobile inference and external engine retargeting have not been validated. The existing private hosting sign-in previously returned invalid_auth_step; local verification does not establish hosted authentication success.

## Avatar fit revision

Rebuilt garments as clipped, indexed surfaces of the anatomical human base; removed disconnected shoulder cylinders and separate trouser tubes. Added shared-vertex normals, horizontal hems and relaxed trouser legs. Fitted the scalp to the head, resized the photo face and replaced the detached cranium with a smooth anatomical rear head shell. Mobile body controls are visible. Six automated tests pass, including garment continuity and hem bounds. Browser checked front, side, tee/hoodie selection and walking preview. Single-image likeness and facial expression remain approximate.
