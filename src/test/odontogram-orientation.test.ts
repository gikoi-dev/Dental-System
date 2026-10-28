import { describe, expect, it } from "vitest";
import { getToothOrientation } from "@/components/app/odontogram-orientation";

describe("odontogram jaw orientation", () => {
  it("keeps maxillary teeth in the upper face plane", () => {
    expect(getToothOrientation(true)).toEqual({
      jaw: "maxillary",
      faceRotation: 0,
    });
  });

  it("faces mandibular teeth toward the opposing arch", () => {
    expect(getToothOrientation(false)).toEqual({
      jaw: "mandibular",
      faceRotation: 180,
    });
  });
});
