// @refresh reload
import { mount, StartClient } from "@solidjs/start/client";
import { settings } from "./settings/settings";

settings.preload();

mount(() => <StartClient />, document.getElementById("app"));