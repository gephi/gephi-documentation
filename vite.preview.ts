import { defineConfig } from "vite";

export default defineConfig({
  root: "./build",
  server: {
    hmr: false,
    port: 5174,
  },
});
