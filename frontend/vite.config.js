import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [react()],
  ssr: {
    noExternal: true,
  },
  optimizeDeps: {
    exclude: ["mongoose"], // Exclude mongoose from client-side bundling
  },
  server: {
    commonjsOptions: {
      transformMixedEsModules: true,
    },
  },
});
