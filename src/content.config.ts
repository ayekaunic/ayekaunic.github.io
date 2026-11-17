import { defineCollection } from 'astro:content';
import { z } from 'astro/zod';
import { glob } from 'astro/loaders';
const thoughts = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/thoughts' }), schema: z.object({ title: z.string(), date: z.string(), draft: z.boolean().default(false), heroQuote: z.string().trim().optional() }) });
const recommendations = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/recommendations' }), schema: z.object({ title: z.string() }) });
const work = defineCollection({ loader: glob({ pattern: '**/*.md', base: './src/content/work' }) });
export const collections = { thoughts, recommendations, work };
