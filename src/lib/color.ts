import { Data, getData, setData } from "./storage";

export function createColor() {
	const data: Data = getData();
	const lastHue = data.lastHue;
	let hue =
		lastHue !== null ? lastHue + 23 : Math.floor(Math.random() * 16) * 23;
	hue %= 360;
	data.lastHue = hue;
	setData(data);
	return `hsl(${hue}, 100%, 50%)`;
}
