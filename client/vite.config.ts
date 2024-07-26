
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

//define vite config
export default defineConfig({

  server: {
    port: 5174
  },

  plugins: [react(), svgr()],
  build: {
    outDir: "build",
    assetsDir: "assets",
    emptyOutDir: true,
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
    },
  },
});
