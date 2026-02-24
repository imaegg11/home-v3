import { defineConfig } from "@solidjs/start/config";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  ssr: false,
  server: {
    static: true,
    // baseURL: "/.output/public/"  
  },
  vite: {
    plugins: [tailwindcss()]
  }
});
