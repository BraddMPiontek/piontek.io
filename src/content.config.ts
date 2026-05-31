import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

const blog = defineCollection({
  loader: glob({ base: './src/content/blog', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      title: z.string(),
      description: z.string(),
      pubDate: z.coerce.date(),
      updatedDate: z.coerce.date().optional(),
      heroImage: z.optional(image()),
      tags: z.array(z.string()).optional(),
      draft: z.boolean().optional(),
    }),
});

const concerts = defineCollection({
  loader: glob({ base: './src/content/concerts', pattern: '**/*.{md,mdx}' }),
  schema: ({ image }) =>
    z.object({
      date: z.coerce.date(),
      headliner: z.string(),
      headlinerUrl: z.string().url().optional(),
      support: z.array(
        z.object({
          name: z.string(),
          url: z.string().url().optional(),
          setlistUrl: z.string().url().optional(),
        })
      ).optional(),
      venue: z.string(),
      venueUrl: z.string().url().optional(),
      city: z.string(),
      state: z.string(),
      setlistUrl: z.string().url().optional(),
      coverImage: z.string().url().optional(),
      photos: z.array(z.string().url()).optional(),
      rating: z.number().min(1).max(5).optional(),
      relatedArtists: z.array(z.string()).optional(),
      videos: z.array(z.object({
        title: z.string(),
        url: z.string().url(),
      })).optional(),
      draft: z.boolean().optional(),
    }),
});

export const collections = { blog, concerts };
