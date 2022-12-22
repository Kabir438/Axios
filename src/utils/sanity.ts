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
export function urlFor(source: SanityImageSource, video?: boolean) {
  if(video) {
    return source.toString()
    // builder.url(sou)
  }
  return builder.image(source).url()
}

const defaults = {nonTextBehavior: 'remove'}

export function blocksToText(blocks: any[], opts = {}) {
  try {
    const options = Object.assign({}, defaults, opts)
    return blocks
      .map(block => {
        if (block._type !== 'block' || !block.children) {
          return options.nonTextBehavior === 'remove' ? '' : `[${block._type} block]`
        }
  
        return block.children.map((child: any) => child.text).join('')
      })
      .join('\n\n')
  } catch(e) {
    return false
  }
}

export default client;