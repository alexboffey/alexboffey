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
      // Never inline: Astro inlines any script under this size, and the CSP in
      // public/_headers (script-src 'self') blocks inline scripts, which killed
      // the trailing cursor on Cloudflare. The shader is a ?raw import, so it is
      // unaffected.
      assetsInlineLimit: 0,
    },
  },
})
