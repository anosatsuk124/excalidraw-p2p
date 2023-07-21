import { z } from 'zod';

export const License = z.object({
  name: z.string(),
  licenseType: z.string(),
  author: z.string(),
  link: z.string().url().optional(),
  installedFrom: z.string().url().optional(),
});

export const Licenses = z.array(License);

export type Licenses = z.infer<typeof Licenses>;
export type License = z.infer<typeof License>;
