import { Router } from "@solidjs/router";
import { FileRoutes } from "@solidjs/start/router";
import { createSignal, Suspense } from "solid-js";

import { Toaster } from "solid-sonner";
import { settings } from "./settings/settings";
import "./app.css";

export const [theme, setTheme] = createSignal(settings.get('theme').theme)

export default function App() {
  return (
    <Router
      root={props => (
        <>
          <Suspense>
            {props.children}
            <Toaster theme={theme()} richColors />
          </Suspense>
        </>
      )}
    >
      <FileRoutes />
    </Router>
  );
}
