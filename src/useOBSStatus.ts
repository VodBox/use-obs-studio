import { useState, useEffect, useMemo } from "react";

const events: (keyof OBSStudioEventMap)[] = [
	"obsStreamingStarted",
	"obsStreamingStopped",
	"obsRecordingStarted",
	"obsRecordingStopped",
	"obsRecordingPaused",
	"obsRecordingUnpaused",
	"obsReplayBufferStarted",
	"obsReplayBufferStopped",
	"obsVirtualcamStarted",
	"obsVirtualcamStopped",
];

export function useOBSStatus(): OBSStatus | null {
	const [status, setStatus] = useState<OBSStatus | null>(null);

	useEffect(() => {
		if (!window.obsstudio) return;

		obsstudio.getStatus(setStatus);

		const updateCallback = () => {
			obsstudio.getStatus(setStatus);
		};

		events.forEach((event) => {
			window.addEventListener(event, updateCallback);
		});

		return () => {
			events.forEach((event) => {
				window.removeEventListener(event, updateCallback);
			});
		};
	}, []);

	return status;
}

export interface RecordingStatus {
	recording: boolean;
	recordingPaused: boolean;
}

export function useOBSRecording(): RecordingStatus {
	const [recording, setRecording] = useState<boolean>(false);
	const [paused, setPaused] = useState<boolean>(false);

	const res = useMemo(() => {
		return {
			recording,
			recordingPaused: paused,
		};
	}, [recording, paused]);

	useEffect(() => {
		if (!window.obsstudio) return;

		obsstudio.getStatus((status) => {
			setRecording(status.recording);
			setPaused(status.recordingPaused);
		});

		const setRecordingTrue = () => {
			setRecording(true);
			setPaused(false);
		};

		const setRecordingFalse = () => {
			setRecording(false);
			setPaused(false);
		};

		const setPausedTrue = () => setPaused(true);
		const setPausedFalse = () => setPaused(false);

		window.addEventListener("obsRecordingStarted", setRecordingTrue);
		window.addEventListener("obsRecordingStopped", setRecordingFalse);
		window.addEventListener("obsRecordingPaused", setPausedTrue);
		window.addEventListener("obsRecordingUnpaused", setPausedFalse);

		return () => {
			window.removeEventListener("obsRecordingStarted", setRecordingTrue);
			window.removeEventListener(
				"obsRecordingStopped",
				setRecordingFalse
			);
			window.removeEventListener("obsRecordingPaused", setPausedTrue);
			window.removeEventListener("obsRecordingUnpaused", setPausedFalse);
		};
	}, []);

	return res;
}

export function useOBSStreaming(): boolean {
	const [streaming, setStreaming] = useState<boolean>(false);

	useEffect(() => {
		if (!window.obsstudio) return;

		obsstudio.getStatus((status) => {
			setStreaming(status.streaming);
		});

		const setStreamingTrue = () => setStreaming(true);
		const setStreamingFalse = () => setStreaming(false);

		window.addEventListener("obsStreamingStarted", setStreamingTrue);
		window.addEventListener("obsStreamingStopped", setStreamingFalse);

		return () => {
			window.removeEventListener("obsStreamingStarted", setStreamingTrue);
			window.removeEventListener(
				"obsStreamingStopped",
				setStreamingFalse
			);
		};
	}, []);

	return streaming;
}

export function useOBSReplayBuffer(): boolean {
	const [replaybuffer, setReplayBuffer] = useState<boolean>(false);

	useEffect(() => {
		if (!window.obsstudio) return;

		obsstudio.getStatus((status) => {
			setReplayBuffer(status.replaybuffer);
		});

		const setReplayBufferTrue = () => setReplayBuffer(true);
		const setReplayBufferFalse = () => setReplayBuffer(false);

		window.addEventListener("obsReplayBufferStarted", setReplayBufferTrue);
		window.addEventListener("obsReplayBufferStopped", setReplayBufferFalse);

		return () => {
			window.removeEventListener(
				"obsReplayBufferStarted",
				setReplayBufferTrue
			);
			window.removeEventListener(
				"obsReplayBufferStopped",
				setReplayBufferFalse
			);
		};
	}, []);

	return replaybuffer;
}

export function useOBSVirtualcam(): boolean {
	const [virtualcam, setVirtualcam] = useState<boolean>(false);

	useEffect(() => {
		if (!window.obsstudio) return;

		obsstudio.getStatus((status) => {
			setVirtualcam(status.virtualcam);
		});

		const setVirtualcamTrue = () => setVirtualcam(true);
		const setVirtualcamFalse = () => setVirtualcam(false);

		window.addEventListener("obsVirtualcamStarted", setVirtualcamTrue);
		window.addEventListener("obsVirtualcamStopped", setVirtualcamFalse);

		return () => {
			window.removeEventListener(
				"obsVirtualcamStarted",
				setVirtualcamTrue
			);
			window.removeEventListener(
				"obsVirtualcamStopped",
				setVirtualcamFalse
			);
		};
	}, []);

	return virtualcam;
}
