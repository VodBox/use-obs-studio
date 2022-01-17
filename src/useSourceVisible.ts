import { useState, useEffect } from "react";

let isVisible = true;
let isActive = true;

export function useSourceVisible(): boolean {
	const [visible, setVisible] = useState<boolean>(true);

	useEffect(() => {
		const update = () => {
			setVisible(isVisible);
		};

		window.addEventListener("obsSourceVisibleChanged", update);

		return () => {
			window.removeEventListener("obsSourceVisibleChanged", update);
		};
	}, []);

	return visible;
}

export function useSourceActive(): boolean {
	const [active, setActive] = useState<boolean>(true);

	useEffect(() => {
		const update = () => {
			setActive(isActive);
		};

		window.addEventListener("obsSourceVisibleChanged", update);
		window.addEventListener("obsSourceActiveChanged", update);

		return () => {
			window.removeEventListener("obsSourceVisibleChanged", update);
			window.removeEventListener("obsSourceActiveChanged", update);
		};
	}, []);

	return active;
}

window.addEventListener("obsSourceActiveChanged", (event) => {
	isActive = event.detail.active;
});

window.addEventListener("obsSourceVisibleChanged", (event) => {
	isVisible = event.detail.visible;
	isActive = isVisible && isActive;
});
