export interface Data {
	contents: string[];
	lastHue: number;
	selectedTab: number;
}

export const defaultData: Data = {
	contents: ["<div>Delete me and write some notes</div>"],
	lastHue: 0,
	selectedTab: 0,
};
export function getData() {
	const storage = localStorage.getItem("data");
	if (storage === null) {
		return defaultData;
	}
	try {
		const json = JSON.parse(storage);
		if (isData(json)) {
			return json;
		}
		throw new Error("data from storage does not natch schema");
	} catch (error) {
		return defaultData;
	}
}

export function isData(data: unknown): data is Data {
	if (typeof data !== "object" || data === null) {
		return false;
	}
	const { contents, lastHue, selectedTab } = data as Data;
	if (
		!Array.isArray(contents) ||
		typeof lastHue !== "number" ||
		typeof selectedTab !== "number"
	) {
		return false;
	}
	return contents.every((item) => typeof item === "string");
}
// write a setData function
export function setData(data: Data) {
	if (isData(data)) {
		localStorage.setItem("data", JSON.stringify(data));
	}
}
