import { createColor } from "./color";
import { Data, setData } from "./storage";

export function updateSelectedTab({ id, data }: { id: number; data: Data }) {
	// check if id is a valid array index
	if (id < 0 || id >= data.contents.length) {
		return;
	}
	// check if there is an item in the array data.contents that matches the id
	const tab = data.contents[id];
	if (tab === undefined) {
		return;
	}
	data.selectedTab = id;
	setData(data);
}

export function updateContent({
	id,
	pad,
	data,
}: {
	data: Data;
	id: number;
	pad: HTMLDivElement;
}) {
	pad.innerHTML = data.contents[id];
	pad.focus();
}

export function selectTab({
	id,
	pad,
	tabsContainer,
	data,
}: {
	data: Data;
	id: number;
	pad: HTMLDivElement;
	tabsContainer: HTMLDivElement;
}) {
	updateSelectedTab({ id, data });
	updateContent({ id, pad, data });
	Array.from(tabsContainer.children).forEach((tab) =>
		tab.classList.toggle(
			"selected",
			tab.getAttribute("data-id") === id.toString(),
		),
	);
}

export function createTab({
	id,
	pad,
	tabsContainer,
	data,
}: {
	id: number;
	pad: HTMLDivElement;
	tabsContainer: HTMLDivElement;
	data: Data;
}) {
	const color = createColor();
	const tab = document.createElement("div");
	tab.classList.add("tab");
	tab.setAttribute("data-id", `${id}`);

	const minusButton = document.createElement("button");
	minusButton.classList.add("minus-button");
	minusButton.textContent = "-";
	minusButton.style.borderBottom = `5px solid ${color}`;
	minusButton.addEventListener("click", () => {
		const stringId = tab.getAttribute("data-id");
		if (stringId === null) {
			return;
		}
		const tabId = parseInt(stringId);

		if (tabId === null || isNaN(tabId)) {
			return;
		}
		tab.remove();
		data.contents.splice(tabId, 1);
		if (tabId === data.selectedTab) {
			selectTab({
				id: Math.min(tabId, data.contents.length - 1),
				pad,
				tabsContainer,
				data,
			});
		} else if (tabId < data.selectedTab) {
			selectTab({ id: data.selectedTab - 1, pad, tabsContainer, data });
		}
		setData(data);
	});

	tab.appendChild(minusButton);
	tabsContainer.appendChild(tab);

	tab.style.backgroundColor = color;
	pad.innerHTML = data.contents[id];
	setData(data);
}

export function addTab({
	pad,
	tabsContainer,
	data,
}: {
	pad: HTMLDivElement;
	tabsContainer: HTMLDivElement;
	data: Data;
}) {
	const id = data.contents.length;
	data.contents.push("");
	setData;
	createTab({ id, pad, tabsContainer, data });
	selectTab({ id, pad, tabsContainer, data });
}

export function onTabClick({
	event,
	pad,
	tabsContainer,
	data,
}: {
	data: Data;
	event: MouseEvent;
	pad: HTMLDivElement;
	tabsContainer: HTMLDivElement;
}) {
	const target = event.target as HTMLElement;
	const stringId = target.getAttribute("data-id");
	if (stringId !== null) {
		const id = parseInt(stringId);
		if (isNaN(id)) {
			return;
		}
		selectTab({ id, pad, tabsContainer, data });
	}
}

export function deleteTab({
	pad,
	tabsContainer,
	data,
}: {
	data: Data;
	pad: HTMLDivElement;
	tabsContainer: HTMLDivElement;
}) {
	const selectedTab = tabsContainer?.querySelector(".selected") as HTMLElement;
	if (selectedTab) {
		const tabId = parseInt(selectedTab.getAttribute("data-id") || "");
		if (!isNaN(tabId)) {
			selectedTab.remove();
			data.contents.splice(tabId, 1);
			if (tabId === data.selectedTab) {
				selectTab({
					data,
					id: Math.min(tabId, data.contents.length - 1),
					pad,
					tabsContainer,
				});
			} else if (tabId < data.selectedTab) {
				selectTab({ id: data.selectedTab - 1, pad, tabsContainer, data });
			}
			setData(data);
		}
	} else {
		throw new Error("No selected tab");
	}
}
