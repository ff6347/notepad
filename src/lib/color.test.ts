import { createColor } from "./color";
import { describe, it, expect } from "vitest";
describe("createColor", () => {
	it("should return a string in the format 'hsl(hue, 100%, 50%)'", () => {
		const color = createColor();
		expect(color).toMatch(/^hsl\(\d+, 100%, 50%\)$/);
	});

	it("should return a different color each time it's called", () => {
		const color1 = createColor();
		const color2 = createColor();
		expect(color1).not.toBe(color2);
	});

	it("should cycle thru the hues always with steps of 23 degrees", () => {
		const color = createColor();
		const color2 = createColor();
		expect(color).toMatch(/^hsl\(\d+, 100%, 50%\)$/);

		const hue = parseInt(color.match(/^hsl\((\d+), 100%, 50%\)$/)?.[1] ?? "0");

		const hue2 = parseInt(
			color2.match(/^hsl\((\d+), 100%, 50%\)$/)?.[1] ?? "0",
		);
		expect(hue).toBe(hue2 - 23);
	});
});
