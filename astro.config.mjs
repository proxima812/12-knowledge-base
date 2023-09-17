import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import { defineConfig } from "astro/config";
import { settings } from "./src/config.ts";

// https://astro.build/config
export default defineConfig({
  site: `${settings.site.url}`,
  integrations: [
    tailwind({
      config: {
        applyBaseStyles: false,
      },
    }),
    mdx({
      drafts: true,
    }),
    react(),
    sitemap({
      filter: (page) => page !== `${settings.site.url}/auth`,
      filter: (page) => page !== `${settings.site.url}/sheets`,
    }),
  ],
  output: "server",
  adapter: vercel(),
});
