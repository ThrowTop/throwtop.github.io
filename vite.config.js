import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [tailwindcss()],
  build: {
    assetsDir: "assets",
    rollupOptions: {
      output: {
        assetFileNames: "assets/[name]-[hash]-site[extname]",
        chunkFileNames: "assets/[name]-[hash]-site.js",
        entryFileNames: "assets/[name]-[hash]-site.js",
      },
    },
    sourcemap: false,
  },
});
