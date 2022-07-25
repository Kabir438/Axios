import sanityClient from '@sanity/client';
import imageUrlBuilder from '@sanity/image-url'
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

const client = sanityClient({
  projectId: 'pdk7cdgq',
  dataset: 'random',
  token: 'skXZKRbdz8PdCzNBlwNTiItXdQp99iuVNUvF1K1l1zNdn1tRNTyeLFByMHPHG9AKT5rl0cGRHzKQiedsf2a89RDc3f29rO98YGufiT6ZgdzMtaDKapgiQOAALELNuVjn9VcOLHdAncCQDcRuQwxFarAgLIiCVlMxUBlS4dB8n6XGt2wShaHt',
  useCdn: false,
  apiVersion: '2021-10-21',
  ignoreBrowserTokenWarning: true,
});

export const builder = imageUrlBuilder(client);
export function urlFor(source: SanityImageSource) {
  return builder.image(source).url()
}

export default client;