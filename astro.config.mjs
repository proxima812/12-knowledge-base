import mdx from "@astrojs/mdx"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
import { settings } from "./src/config.ts"

import react from "@astrojs/react"

// https://astro.build/config
export default defineConfig({
  site: `${settings.site.url}`,
  compressHTML: true,
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx({
    drafts: true
  }), react()]
});