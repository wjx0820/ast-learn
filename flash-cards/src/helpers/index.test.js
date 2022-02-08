import {
  OPERATORS,
  getRandomOperator,
  getRandomInt,
  calculateEquation,
  generateEquation,
} from "./";

describe("helpers", () => {
  describe("#getRandomOperator", () => {
    it("should return a valid operator", () => {
      expect(OPERATORS).toContain(getRandomOperator());
    });
  });

  describe("#getRandomInt", () => {
    it("should return a random integer within range", () => {
      expect(getRandomInt(0, 0)).toBe(0);
      expect(getRandomInt(42, 42)).toBe(42);

      const int = getRandomInt(0, 42);
      expect(int).toBeGreaterThanOrEqual(0);
      expect(int).toBeLessThanOrEqual(42);
    });
  });

  describe("#calculateEquation", () => {
    it("should return the answer to the equation", () => {
      expect(calculateEquation(2, "+", 40)).toBe(42);
      expect(calculateEquation(42, "-", 40)).toBe(2);
      expect(calculateEquation(42, "x", 2)).toBe(84);
      expect(calculateEquation(34, "/", 17)).toBe(2);
    });

    it("should throw when passed an unhandled operator", () => {
      expect(() => calculateEquation(1, "*", 1)).toThrow(
        "Unhandled operator: *"
      );
    });
  });

  describe("#generateEquation", () => {
    it("should return a valid equation", () => {
      expect(generateEquation()).toEqual(
        expect.objectContaining({
          left: expect.any(Number),
          operator: expect.stringMatching(
            new RegExp(OPERATORS.map((op) => `\\${op}`).join("|"), "gi")
          ),
          right: expect.any(Number),
          answer: expect.any(Number),
        })
      );
    });
  });
});
