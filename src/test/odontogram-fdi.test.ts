import { describe, expect, it } from "vitest";
import { getTeethFor, LOWER, UPPER } from "@/lib/mock-data";

describe("3D odontogram FDI mapping", () => {
  it("renders every permanent tooth exactly once across the two arches", () => {
    const numbers = [...UPPER, ...LOWER];

    expect(numbers).toHaveLength(32);
    expect(new Set(numbers).size).toBe(32);
    expect(numbers).toEqual([
      18, 17, 16, 15, 14, 13, 12, 11, 21, 22, 23, 24, 25, 26, 27, 28, 48, 47, 46, 45, 44, 43, 42,
      41, 31, 32, 33, 34, 35, 36, 37, 38,
    ]);
  });

  it("keeps each mesh identifier aligned with the clinical tooth record", () => {
    const teeth = getTeethFor("P-1001");

    for (const number of [...UPPER, ...LOWER]) {
      expect(teeth[number]?.number).toBe(number);
    }
  });
});
