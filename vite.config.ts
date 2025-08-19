import { defineConfig } from "vite";

export default defineConfig({
  server: {
    proxy: {
      "/desktop": {
        target: "http://localhost:3001/",
      },
      "/lite": {
        target: "http://localhost:3002/",
      },
    },
  },
});
