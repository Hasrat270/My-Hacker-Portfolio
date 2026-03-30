import { defineCollection, z } from "astro:content";

const writeups = defineCollection({
  schema: z.object({
    title: z.string(),
    date: z.string(),
    tags: z.array(z.string()),
    excerpt: z.string().optional(),
  }),
});

export const collections = {
  writeups,
};
