import { defineCollection, z } from 'astro:content';
import { glob } from 'astro/loaders';

// Editorial bodies live in MDX; structured/factual data lives in src/data/*.
// The slug must match the corresponding platform/state slug.

const reviews = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/reviews' }),
  schema: z.object({
    platform: z.string(), // slug in platforms.ts
    verdict: z.string(),
    pros: z.array(z.string()),
    cons: z.array(z.string()),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]), // platform slugs
    lastUpdated: z.string(),
  }),
});

const states = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/states' }),
  schema: z.object({
    state: z.string(), // slug in states.ts
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    avoid: z.array(z.string()).default([]),
    lastUpdated: z.string(),
  }),
});

const guides = defineCollection({
  loader: glob({ pattern: '**/*.mdx', base: './src/content/guides' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    order: z.number().default(99),
    faqs: z.array(z.object({ q: z.string(), a: z.string() })).default([]),
    related: z.array(z.string()).default([]), // platform slugs
    datePublished: z.string(),
    lastUpdated: z.string(),
  }),
});

export const collections = { reviews, states, guides };
