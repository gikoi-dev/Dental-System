export function getToothOrientation(upper: boolean, archAngle: number) {
  const centerAngle = Math.PI / 2;
  const tangentDegrees = ((archAngle - centerAngle) * 180) / Math.PI;

  return {
    jaw: upper ? "maxillary" : "mandibular",
    faceRotation: 0,
    archRotation: Number(((upper ? -1 : 1) * tangentDegrees * 0.62).toFixed(2)),
  } as const;
}
