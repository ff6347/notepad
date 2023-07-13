import { describe, it, expect, beforeEach } from "vitest";
import { Data, getData, isData, setData } from "./storage";

describe("getData", () => {
	it("should return an object with the expected properties", () => {
		const data = getData();
		expect(data).toMatchObject({
			contents: expect.any(Array),
			lastHue: expect.any(Number),
			selectedTab: expect.any(Number),
		});
	});

	it("should return default data if localStorage is empty", () => {
		localStorage.clear();
		const data = getData();
		expect(data).toEqual({
			contents: ["<div>Delete me and write some notes</div>"],
			lastHue: 0,
			selectedTab: 0,
		});
	});

	it("should return parsed data from localStorage", () => {
		const testData = {
			contents: ["<div>Test data</div>"],
			lastHue: 23,
			selectedTab: 1,
		};
		localStorage.setItem("data", JSON.stringify(testData));
		const data = getData();
		expect(data).toEqual(testData);
	});
});

describe("setData", () => {
	beforeEach(() => {
		localStorage.clear();
	});
	it("should store the data in localStorage", () => {
		const testData = {
			contents: ["<div>Test data</div>"],
			lastHue: 23,
			selectedTab: 1,
		};
		setData(testData);
		const storedData = JSON.parse(localStorage.getItem("data")!);
		expect(storedData).toEqual(testData);
	});

	it("should update the data in localStorage", () => {
		const testData1 = {
			contents: ["<div>Test data 1</div>"],
			lastHue: 23,
			selectedTab: 1,
		};
		setData(testData1);
		const testData2 = {
			contents: ["<div>Test data 2</div>"],
			lastHue: 42,
			selectedTab: 0,
		};
		setData(testData2);
		const storedData = JSON.parse(localStorage.getItem("data")!);
		expect(storedData).toEqual(testData2);
	});

	it("should not store invalid data in localStorage", () => {
		const invalidData = { foo: "bar" };
		setData(invalidData as unknown as Data);
		const storedData = localStorage.getItem("data");
		expect(storedData).toBeNull();
	});
});

describe("isData", () => {
	it("should return true for valid data", () => {
		const validData = {
			contents: ["<div>Valid data</div>"],
			lastHue: 23,
			selectedTab: 1,
		};
		expect(isData(validData)).toBe(true);
	});

	it("should return false for invalid data", () => {
		const invalidData = { foo: "bar" };
		expect(isData(invalidData)).toBe(false);
	});

	it("should return false for data with missing properties", () => {
		const missingData = {
			contents: ["<div>Missing data</div>"],
			lastHue: 23,
		};
		expect(isData(missingData)).toBe(false);
	});

	it("should return false for data with invalid property types", () => {
		const invalidTypeData = {
			contents: ["<div>Invalid type data</div>"],
			lastHue: "not a number",
			selectedTab: "not a number",
		};
		expect(isData(invalidTypeData)).toBe(false);
	});

	it("should return false for data with invalid contents", () => {
		const invalidContentsData = {
			contents: ["<div>Invalid contents data</div>", 42],
			lastHue: 23,
			selectedTab: 1,
		};
		expect(isData(invalidContentsData)).toBe(false);
	});
});
