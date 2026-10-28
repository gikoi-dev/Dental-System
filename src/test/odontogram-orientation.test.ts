import { describe, expect, it } from "vitest";
import { getToothOrientation } from "@/components/app/odontogram-orientation";

describe("odontogram jaw orientation", () => {
  it("keeps maxillary teeth in the upper face plane", () => {
    expect(getToothOrientation(true, Math.PI / 2)).toEqual({
      jaw: "maxillary",
      faceRotation: 0,
      archRotation: 0,
    });
  });

  it("faces mandibular teeth toward the opposing arch", () => {
    expect(getToothOrientation(false, Math.PI / 2 - 0.5)).toEqual({
      jaw: "mandibular",
      faceRotation: 0,
      archRotation: -17.76,
    });
  });
});
