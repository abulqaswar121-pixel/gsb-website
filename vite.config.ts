import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// Plain Vite + React SPA — standard layout used by Lovable.
// `host` + `allowedHosts` are enabled so the dev server and preview work inside
// hosted sandboxes (Lovable's preview and the Arena live preview proxy).
export default defineConfig({
  plugins: [react()],
  server: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    allowedHosts: true,
  },
  preview: {
    host: "0.0.0.0",
    port: 8080,
    strictPort: false,
    allowedHosts: true,
  },
  build: {
    outDir: "dist",
    sourcemap: false,
  },
});
