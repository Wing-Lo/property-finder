import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// https://vitejs.dev/config/
export default defineConfig({
    plugins: [react()],
    test: {
        environment: "jsdom", // Use jsdom for simulating a browser environment
        globals: true,
        setupFiles: "./setupTests.jsx" // Path to your setup file
    }
});
