import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [preact()],
  esbuild: {
    minifyIdentifiers: false,
    minifyWhitespace: false,
    minifySyntax: true,
    // to remove PURE comments
    jsxSideEffects: true,
  },
  build: {
    minify: "esbuild",
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
