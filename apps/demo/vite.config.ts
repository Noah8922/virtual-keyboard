import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

// GitHub Pages(https://noah8922.github.io/virtual-keyboard/)에 올릴 때는 하위 경로가 필요하다
export default defineConfig({
  plugins: [react()],
  base: process.env.GITHUB_PAGES ? "/virtual-keyboard/" : "/",
});
