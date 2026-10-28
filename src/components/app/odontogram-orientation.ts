export function getToothOrientation(upper: boolean) {
  return {
    jaw: upper ? "maxillary" : "mandibular",
    faceRotation: upper ? 0 : 180,
  } as const;
}
