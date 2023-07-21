import { z } from 'zod';

export const AvailableURLParametersSchema = z.object({
  signalingData: z.string().optional(),
});

export type AvailableURLParameters = z.infer<
  typeof AvailableURLParametersSchema
>;

export const toUrl = (params: AvailableURLParameters) => {
  const url = new URL(window.location.href);

  Object.entries(params).forEach(([key, value]) => {
    url.searchParams.set(key, value);
  });

  return url;
};

export const fromUrl = (url: URL): AvailableURLParameters => {
  const params = Object.fromEntries(url.searchParams.entries());

  return AvailableURLParametersSchema.parse(params);
};
