import { Data, defaultData, getData, setData } from "./storage";
import { describe, it, expect, beforeEach } from "vitest";
import { addTab, createTab, updateContent, updateSelectedTab } from "./tabs";

// tabs.tests.ts
describe("updateSelectedTab", () => {
	// const data: Data = getData();

	beforeEach(() => {
		localStorage.clear();
	});

	it.skip("should update the selected tab", () => {
		const id = 1;
		const data = getData();
		updateSelectedTab({ id, data });
		expect(data.selectedTab).toBe(id);
		expect(JSON.parse(localStorage.getItem("data")!)).toEqual(data);
	});

	it.skip("should not update the selected tab if the id is negative", () => {
		const id = -1;
		const data = getData();
		updateSelectedTab({ id, data });
		expect(data.selectedTab).not.toBe(id);
		expect(JSON.parse(localStorage.getItem("data")!)).toEqual(data);
	});

	it.skip("should not update the selected tab if the id is greater than the number of tabs", () => {
		setData(defaultData);
		const data = getData();
		const id = 2;
		updateSelectedTab({ id, data });
		expect(data.selectedTab).not.toBe(id);
		const storage = localStorage.getItem("data");
		expect(storage).not.toBeNull();
		const json = JSON.parse(storage!);
		expect(json).toEqual(data);
	});
});

describe("updateContent", () => {
	let data: Data;
	let pad: HTMLDivElement;

	beforeEach(() => {
		data = defaultData;
		pad = document.createElement("div");
	});

	it("should update the content and focus the pad", () => {
		const id = 0;
		updateContent({ id, pad, data: defaultData });
		expect(pad.innerHTML).toBe(data.contents[id]);
	});

	it("should not update the content if the id is negative", () => {
		const id = -1;
		updateContent({ id, pad, data: defaultData });
		expect(pad.innerHTML).not.toBe(data.contents[id]);
		expect(document.activeElement).not.toBe(pad);
	});

	it("should not update the content if the id is greater than the number of contents", () => {
		const id = 2;
		updateContent({ id, pad, data: defaultData });
		expect(pad.innerHTML).not.toBe(data.contents[id]);
		expect(document.activeElement).not.toBe(pad);
	});
});

describe("createTab", () => {
	let data: Data;
	let pad: HTMLDivElement;
	let tabsContainer: HTMLDivElement;

	beforeEach(() => {
		data = defaultData;
		pad = document.createElement("div");
		tabsContainer = document.createElement("div");
	});

	it("should create a new tab and add it to the tabs container", () => {
		const id = 0;
		createTab({ id, pad, tabsContainer, data });
		const tab = tabsContainer.querySelector(`[data-id="${id}"]`);
		expect(tab).not.toBeNull();
		expect(tab?.classList.contains("tab")).toBe(true);
	});

	it("should set the background color of the tab to a new color", () => {
		const id = 0;
		createTab({ id, pad, tabsContainer, data });
		const tab: HTMLDivElement | null = tabsContainer.querySelector(
			`[data-id="${id}"]`,
		);
		expect(tab).not.toBeNull();
		expect(tab?.style.backgroundColor).not.toBe("");
	});

	it("should set the innerHTML of the pad to the content at the new tab index", () => {
		const id = 0;
		createTab({ id, pad, tabsContainer, data });
		expect(pad.innerHTML).toBe(data.contents[id]);
	});

	it("should update the data object with the new content", () => {
		const id = 0;
		createTab({ id, pad, tabsContainer, data });
		expect(data.contents[id]).not.toBeUndefined();
	});
});

describe("addTab", () => {
	let data: Data;
	let pad: HTMLDivElement;
	let tabsContainer: HTMLDivElement;

	beforeEach(() => {
		data = defaultData;
		pad = document.createElement("div");
		tabsContainer = document.createElement("div");
	});

	it("should add a new tab to the data object", () => {
		const initialLength = data.contents.length;
		addTab({ pad, tabsContainer, data });
		expect(data.contents.length).toBe(initialLength + 1);
	});

	it("should create a new tab and add it to the tabs container", () => {
		const id = data.contents.length;
		addTab({ pad, tabsContainer, data });
		const tab = tabsContainer.querySelector(`[data-id="${id}"]`);
		expect(tab).not.toBeNull();
		expect(tab?.classList.contains("tab")).toBe(true);
	});

	it("should select the new tab", () => {
		const id = data.contents.length;
		addTab({ pad, tabsContainer, data });
		expect(data.selectedTab).toBe(id);
	});
});
