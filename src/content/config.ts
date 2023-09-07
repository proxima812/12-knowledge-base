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
      tags: z.array(z.string()),
      draft: z.boolean().default(false),
    }),
});

export const collections = { blog };
