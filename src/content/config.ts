import { defineCollection, z } from "astro:content";

const blog = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().max(90),
      description: z.string().max(160),
      image: image().optional(),
      pubDate: z
        .string()
        .or(z.date())
        .transform((val) => new Date(val)),
      // modDate: z.string().or(z.date()).transform((val) => new Date(val)).optional(),
      tags: z.array(z.string()).optional(),
      favorite: z.boolean().default(false).optional(),
      draft: z.boolean().default(false).optional(),
    }),
});

const blocks = defineCollection({
  schema: ({ image }) =>
    z.object({
      heading: z.string(),
      text: z.string(),
      imgSrc: image(),
    }),
});

const tags = defineCollection({
  schema: z.object({
    name: z.string().optional(),
  }),
});

const communities = defineCollection({
  schema: ({ image }) =>
    z.object({
      title: z.string().default("Анонимные "),
      logoImage: image(),
      soon: z.string(),
      colorBg: z.string(),
      links: z.array(z.string()).optional(),
    }),
});

export const collections = { blog, tags, communities, blocks };
