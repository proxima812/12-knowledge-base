import rss from "@astrojs/rss";
import { getCollection } from "astro:content";
import { settings } from "src/config";

export async function get() {
  const posts = await getCollection("blog");
  return rss({
    title: `${settings.site.title}`,
    description: `${settings.site.description}`,
    site: import.meta.env.SITE,
    items: posts.map((post) => ({
      ...post.data,
      link: `posts/${post.slug}/`,
    })),
  });
}
