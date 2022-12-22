// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Stack } from '@mui/material';
// utils
import { fDate } from '../../utils/formatTime';
// components
import { Image, TextMaxLine } from '../../components';
import { BlogPost } from '../../../pages/blog';
import { blocksToText, urlFor } from '../../utils/sanity';
import readingTime from 'reading-time';

// ----------------------------------------------------------------------

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

type BlogPostItemMobileProps = {
  post: BlogPost;
  onSiderbar?: boolean;
  path: string;
};

export default function BlogPostItemMobile({ post, onSiderbar }: BlogPostItemMobileProps) {
  const { slug, title, coverImg, createdAt, blogContent: content } = post;
  const contentString = blocksToText(content)
  const tempDuration = contentString !== false && readingTime(contentString);
  const duration = tempDuration && `${Math.ceil(tempDuration.minutes)} min read`;

  const as = `blog/${slug}`;
  const href = `blog/[slug]`;

  return (
    <Stack
      spacing={2}
      direction="row"
      alignItems={{ xs: 'flex-start', md: 'unset' }}
      sx={{ width: 1 }}
    >
      <Image
        alt={title}
        src={urlFor(coverImg)}
        sx={{
          width: 80,
          height: 80,
          flexShrink: 0,
          borderRadius: 1.5,
        }}
      />

      <Stack spacing={onSiderbar ? 0.5 : 1}>
        <NextLink passHref as={as} href={href}>
          <TextMaxLine variant={onSiderbar ? 'subtitle2' : 'h6'} asLink>
            {title}
          </TextMaxLine>
        </NextLink>

        <Stack
          direction="row"
          flexWrap="wrap"
          alignItems="center"
          sx={{ typography: 'caption', color: 'text.disabled' }}
        >
          {fDate(createdAt)}
          <DotStyle />
          {duration}
        </Stack>
      </Stack>
    </Stack>
  );
}
