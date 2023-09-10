import rss from "@astrojs/rss"
import { JSDOM } from 'jsdom'
import { settings } from "src/config"

function htmlToText(html) {
    const dom = new JSDOM(html);
    return dom.window.document.body.textContent || "";
}

export async function get() {
    const response = await fetch(import.meta.env.KEY + `/rest/v1/${settings.site.api_item}`, {
    headers: {
      apikey: import.meta.env.KEY_ANON,
    },
    });
  
  const items = await response.json();
  return rss({
    title: `${settings.site.title}`,
    description: `${settings.site.description}`,
    site: import.meta.env.SITE,
    items: items.map((post) => ({
      title: post.name,
      description: htmlToText(post.description),
      pubDate: post.created_at,
      link: `/alerts/${post.id}`,
    })),
  });
}
