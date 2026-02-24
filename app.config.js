import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";
import { execSync } from "child_process";

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
    plugins: [tailwindcss()],
    define: {
      __COMMIT_HASH__: JSON.stringify(commit),
    },
  }
});
