import { defineConfig } from "vite";

export default defineConfig({
  server: {
    hmr: false,
    proxy: {
      "/desktop": "http://localhost:3001/",
      "/lite": "http://localhost:3002/",
    },
  },
});
