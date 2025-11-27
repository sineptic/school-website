import { defineConfig } from "vite";
import preact from "@preact/preset-vite";

// https://vitejs.dev/config/
export default defineConfig({
  // base: "/school-website/",
  plugins: [preact()],
  esbuild: {
    minifyIdentifiers: false,
    minifyWhitespace: false,
    minifySyntax: false,
    // to remove PURE comments
    jsxSideEffects: true,
  },
  build: {
    minify: "esbuild",
    rollupOptions: {
      output: {
        manualChunks(id) {
          if (id.includes("preact")) return "preact";

          if (id.includes("convex")) return "convex";

          if (id.includes("@tanstack")) {
            if (id.includes("router") || id.includes("@tanstack/history"))
              return "tanstack-router";

            if (id.includes("store")) return "tanstack-store";

            console.error("unknown tanstack library", id);
          }
          if (id.includes("tiny-warning")) return "tanstack-router";
          if (id.includes("tiny-invariant")) return "tanstack-router";
          if (id.includes("seroval")) return "tanstack-router";
          if (id.includes("use-sync-external-store")) return "tanstack-store";

          return undefined;
        },
      },
    },
  },
});
