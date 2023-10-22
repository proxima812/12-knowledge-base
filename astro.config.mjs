import mdx from "@astrojs/mdx";
import react from "@astrojs/react";
import sitemap from "@astrojs/sitemap";
import tailwind from "@astrojs/tailwind";
import vercel from "@astrojs/vercel/serverless";
import keystatic from "@keystatic/astro";
import { defineConfig } from "astro/config";
import { settings } from "./src/config.ts";

import markdoc from "@astrojs/markdoc";

// https://astro.build/config
export default defineConfig({
  site: `${settings.site.url}`,
  integrations: [
    keystatic(),
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
    markdoc({ allowHTML: true }),
  ],
  output: "hybrid",
  adapter: vercel({
    webAnalytics: {
      enabled: true,
    },
  }),
});
