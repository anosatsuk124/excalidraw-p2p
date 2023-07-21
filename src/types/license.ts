import { z } from 'zod';

export const License = z.array(
  z.object({
    name: z.string(),
    licenseType: z.string(),
    author: z.string(),
    link: z.string().url().optional(),
    installedFrom: z.string().url().optional(),
  })
);

export type License = z.infer<typeof License>;
