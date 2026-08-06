import sitemap from "@astrojs/sitemap"
import { defineConfig } from "astro/config"

export default defineConfig({
  site: "https://alexboffey.co.uk",
  integrations: [sitemap()],
  devToolbar: {
    enabled: false,
  },
  markdown: {
    shikiConfig: {
      // Matches the portal palette: deep hued ground, orange as the one accent.
      theme: "vesper",
      wrap: false,
    },
  },
  build: {
    inlineStylesheets: "always",
  },
  vite: {
    build: {
      // The lattice shader is a string import; keep it out of the CSS graph.
      assetsInlineLimit: 2048,
    },
  },
})
