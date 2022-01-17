import { useState, useEffect } from "react";

export enum ControlLevel {
	NONE,
	READ_OBS,
	READ_USER,
	BASIC,
	ADVANCED,
	ALL,

	READ_ONLY = READ_USER,
}

export function useOBSControlLevel(): ControlLevel | null {
	const [level, setLevel] = useState<ControlLevel | null>(null);

	useEffect(() => {
		const version = getVersion();

		if (!version) return;

		if (version[0] > 2 || version[1] > 16) {
			obsstudio.getControlLevel((level) => {
				setLevel(level);
			});

			return;
		}

		obsstudio.getControlLevel((level) => {
			setLevel(level ? ++level : level);
		});
	}, []);

	return level;
}

type Version = [number, number, number];

function getVersion(): Version | null {
	if (!window.obsstudio) return null;

	return window.obsstudio.pluginVersion.split(".").map(parseInt) as Version;
}
