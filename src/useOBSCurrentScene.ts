import { useState, useEffect } from "react";

export function useOBSCurrentScene(): OBSSceneInfo | null {
	const [scene, setScene] = useState<OBSSceneInfo | null>(null);

	useEffect(() => {
		if (!window.obsstudio) return;

		obsstudio.getCurrentScene(setScene);

		const sceneChange = (event: CustomEvent<OBSSceneInfo>) => {
			setScene(event.detail);
		};

		window.addEventListener("obsSceneChanged", sceneChange);

		return () => {
			window.removeEventListener("obsSceneChanged", sceneChange);
		};
	}, []);

	return scene;
}
