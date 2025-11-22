import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  build: {
    minify: false,
    rollupOptions: {
      output: {
        manualChunks(id) {
          // FIXME
          // NOTE: removing project name, that contains 'preact' in name(filepath)
          id = id.substring(42);
          if (id.includes("preact")) {
            return "preact";
          }
          if (id.includes("convex")) {
            return "convex";
          }
          return undefined;
        },
      },
    },
  },
});
