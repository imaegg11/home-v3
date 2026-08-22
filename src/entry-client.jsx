// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { settings } from "./settings/settings";

settings.preload();

mount(() => <StartClient />, document.getElementById("app"));

if (typeof window !== "undefined" && "serviceWorker" in navigator) {
	window.addEventListener("load", () => {
		navigator.serviceWorker.register("/sw.js").catch(() => {
			// Keep startup resilient if service worker registration fails.
		});
	});
}