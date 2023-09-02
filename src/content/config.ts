import { defineCollection, z } from "astro:content";

const blog = defineCollection({
 // Type-check frontmatter using a schema
 schema: z.object({
  title: z.string().max(80),
  description: z.string().max(150),
  pubDate: z
   .string()
   .or(z.date())
   .transform((val) => new Date(val)),
  tags: z.array(z.string()),
  draft: z.boolean().default(false),
 }),
});

export const collections = { blog };
