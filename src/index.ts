import { createColor } from "./lib/color";
import { Data, getData, setData } from "./lib/storage";
import {
	addTab,
	createTab,
	deleteTab,
	onTabClick,
	selectTab,
} from "./lib/tabs";

document.addEventListener("DOMContentLoaded", () => {
	let data: Data = getData();
	window.onblur = function () {
		setData(data);
	};
	window.onfocus = function () {
		data = getData();
	};
	const tabsContainer =
		document.querySelector<HTMLDivElement>("#tabs-container");
	const pad = document.querySelector<HTMLDivElement>("#pad");
	const plusButton = document.querySelector<HTMLButtonElement>("#plus");

	if (tabsContainer && pad && plusButton) {
		if (
			data.contents.length === 1 &&
			data.contents[0] === "<div>Delete me and write some notes</div>"
		) {
			data.contents[0] = "<div>Write some notes</div>";
			const tab = document.createElement("div");
			tab.classList.add("tab");
			tab.setAttribute("data-id", "0");
			const color = createColor();
			tab.style.backgroundColor = color;
			tabsContainer.appendChild(tab);
		}

		// Loop through data.contents and create a tab for each item
		data.contents.forEach((_, index) => {
			createTab({ id: index, pad, tabsContainer, data });
		});

		pad.addEventListener("input", () => {
			const selectedTab = data.selectedTab;
			data.contents[selectedTab] = pad.innerHTML;
			setData(data);
		});
		tabsContainer.addEventListener("click", (event) => {
			onTabClick({ event, pad, tabsContainer, data });
		});
		plusButton.addEventListener("click", () => {
			addTab({ pad, tabsContainer, data });
		});

		selectTab({ id: data.selectedTab, pad, tabsContainer, data });
		document.addEventListener("keydown", (event) => {
			if (event.ctrlKey && (event.code === "KeyN" || event.keyCode === 78)) {
				addTab({ pad, tabsContainer, data });
			}
		});
		document.addEventListener("keydown", (event) => {
			if (event.ctrlKey && (event.code === "KeyD" || event.keyCode === 68)) {
				deleteTab({ pad, tabsContainer, data });
			}
		});
	} else {
		console.error(pad, tabsContainer, plusButton);
		throw new Error("DOM Elements not found");
	}
});
