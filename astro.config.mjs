import mdx from "@astrojs/mdx"
import react from "@astrojs/react"
import sitemap from "@astrojs/sitemap"
import tailwind from "@astrojs/tailwind"
import { defineConfig } from "astro/config"
import { settings } from "./src/config.ts"

import vercel from "@astrojs/vercel/serverless"

// https://astro.build/config
export default defineConfig({
  site: `${settings.site.url}`,
  integrations: [tailwind({
    config: {
      applyBaseStyles: false
    }
  }), mdx({
    drafts: true
  }), react(), sitemap({
    filter: page => page !== `${settings.site.url}/auth`
  })],
  adapter: vercel(),
  output: 'hybrid',
});