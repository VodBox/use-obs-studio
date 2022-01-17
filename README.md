# use-obs-studio

React hooks for working with the [obs-browser](https://github.com/obsproject/obs-browser#js-bindings) JS bindings.

## Install

```sh
npm install use-obs-studio
```

## Usage

### `useOBSControlLevel`

-   Returns the control permission level of the Browser Source, as set by the user.

```tsx
import { useOBSControlLevel, ControlLevel } from "use-obs-studio";

/**
 * enum ControlLevel {
 *     NONE,
 *     READ_OBS,
 *     READ_USER,
 *     BASIC,
 *     ADVANCED,
 *     ALL,
 *
 *     READ_ONLY = READ_USER,
 * }
 */

export function ControlLevel() {
	const level: ControlLevel | null = useOBSControlLevel();

	return <h1>Control Level: {level ?? "Unknown"}</h1>;
}
```

### `useOBSCurrentScene`

-   Subscribes to receiving the current scene.

```tsx
import { useOBSCurrentScene } from "use-obs-studio";

export function CurrentScene() {
	const scene = useOBSCurrentScene();

	return (
		<div>
			<h1>Scene: {scene ? scene.name : ""}</h1>
			<p>Width: {scene ? scene.width : ""}</p>
			<p>Height: {scene ? scene.height : ""}</p>
		</div>
	);
}
```

### `useOBSStatus`

-   Subscribes to receiving the current output status of OBS.

```tsx
import { useOBSStatus } from "use-obs-studio";

export function CurrentStatus() {
	const status = useOBSStatus();

	return (
		<div>
			<p>Recording: {status.recording ? "Yes" : "No"}</p>
			<p>Recording Paused: {status.recordingPaused ? "Yes" : "No"}</p>
			<p>Streaming: {status.streaming ? "Yes" : "No"}</p>
			<p>Replay Buffer: {status.replaybuffer ? "Yes" : "No"}</p>
			<p>Virtualcam: {status.virtualcam ? "Yes" : "No"}</p>
		</div>
	);
}
```

### `useOBSRecording`

-   Subscribes to receiving the current recording status of OBS.

```tsx
import { useOBSRecording } from "use-obs-studio";

export function CurrentRecording() {
	const status = useOBSRecording();

	return (
		<div>
			<p>Recording: {status.recording ? "Yes" : "No"}</p>
			<p>Recording Paused: {status.recordingPaused ? "Yes" : "No"}</p>
		</div>
	);
}
```

### `useOBSStreaming`

-   Subscribes to receiving the current streaming status of OBS.

```tsx
import { useOBSStreaming } from "use-obs-studio";

export function CurrentStreaming() {
	const streaming = useOBSStreaming();

	return (
		<div>
			<p>Streaming: {streaming ? "Yes" : "No"}</p>
		</div>
	);
}
```

### `useOBSReplayBuffer`

-   Subscribes to receiving the current replay buffer status of OBS.

```tsx
import { useOBSReplayBuffer } from "use-obs-studio";

export function CurrentReplayBuffer() {
	const replaybuffer = useOBSReplayBuffer();

	return (
		<div>
			<p>Replay Buffer: {replaybuffer ? "Yes" : "No"}</p>
		</div>
	);
}
```

### `useOBSVirtualcam`

-   Subscribes to receiving the current virtualcam status of OBS.

```tsx
import { useOBSVirtualcam } from "use-obs-studio";

export function CurrentVirtualcam() {
	const virtualcam = useOBSVirtualcam();

	return (
		<div>
			<p>Virtualcam: {virtualcam ? "Yes" : "No"}</p>
		</div>
	);
}
```

### `useSourceVisible`

-   Subscribes to receive the current visibility status of the source in OBS.

```tsx
import { useSourceVisible } from "use-obs-studio";

export function SourceVisible() {
	const visible = useSourceVisible();

	return <h1>Source Visible: {visible ? "Yes" : "No"}</h1>;
}
```

### `useSourceActive`

-   Subscribes to receive the current active status of the source in OBS (whether it is currently visible in the program feed/output).

```tsx
import { useSourceActive } from "use-obs-studio";

export function SourceActive() {
	const active = useSourceActive();

	return <h1>Source Active: {active ? "Yes" : "No"}</h1>;
}
```

## License

MIT © Dillon Pentz (VodBox)