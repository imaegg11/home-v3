import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

import { visualizer } from "rollup-plugin-visualizer";

const commit = execSync("git rev-parse HEAD")
  .toString()
  .trim();

export default defineConfig({
  ssr: false,
  server: {
    static: true,
    // baseURL: "/.output/public/"  
  },
  vite: {
    plugins: [
      tailwindcss(),
      visualizer({
        filename: "bundle-stats.html",
        gzipSize: true,
        brotliSize: true
      })
    ],
    define: {
      __COMMIT_HASH__: JSON.stringify(commit),
    },
  }
});
