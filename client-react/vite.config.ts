
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import svgr from "vite-plugin-svgr";
import path from "path";

//define vite config
export default defineConfig({
  server: {
    port: 5175,
    strictPort: true
  },

  plugins: [react(), svgr()],
  optimizeDeps: {
    // exclude: [
    //   '@mui/x-date-pickers/DatePicker',
    //   '@mui/x-date-pickers/DateTimePicker',
    //   '@mui/x-date-pickers/TimePicker'
    // ],
  },
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


