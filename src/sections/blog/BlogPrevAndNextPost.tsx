// icons
import chevronLeft from '@iconify/icons-carbon/chevron-left';
import chevronRight from '@iconify/icons-carbon/chevron-right';
// next
import NextLink from 'next/link';
// @mui
import { Stack, Typography, Avatar, Grid, CardActionArea } from '@mui/material';
// components
import { Iconify } from '../../components';
import { BlogPost } from '../../../pages/blog';
import { urlFor } from '../../utils/sanity';

// ----------------------------------------------------------------------

type Props = {
  prevPost?: BlogPost;
  nextPost?: BlogPost;
};

export default function BlogPrevAndNextPost({ prevPost, nextPost }: Props) {
  const nextSlug = nextPost?.slug || '';
  const prevSlug = prevPost?.slug || '';

  const nextFrontmatter = nextPost;
  const prevFrontmatter = prevPost;

  return (
    <Grid container spacing={5} sx={{ py: 8 }}>
      <Grid item xs={12} md={6}>
        {prevPost && (
          <PostItem
            href={`/blog/${prevSlug}`}
            title={prevFrontmatter?.title}
            coverImg={prevFrontmatter?.coverImg && urlFor(prevFrontmatter?.coverImg)}
            icon={
              <Iconify
                icon={chevronLeft}
                sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0 }}
              />
            }
          />
        )}
      </Grid>

      <Grid item xs={12} md={6}>
        {nextSlug && (
          <PostItem
            href={`/blog/${nextSlug}`}
            isNext
            title={nextFrontmatter?.title}
            coverImg={nextFrontmatter?.coverImg && urlFor(nextFrontmatter.coverImg)}
            icon={
              <Iconify
                icon={chevronRight}
                sx={{ width: 24, height: 24, color: 'text.disabled', flexShrink: 0 }}
              />
            }
          />
        )}
      </Grid>
    </Grid>
  );
}

// ----------------------------------------------------------------------

type PostItemProps = {
  coverImg?: string;
  title?: string;
  icon?: JSX.Element;
  href?: string;
  isNext?: boolean;
};

function PostItem({ coverImg, title, icon, href, isNext }: PostItemProps) {
  return (
    <CardActionArea sx={{ borderRadius: 2 }}>
      <NextLink href={href || ''}>
        <Stack
          alignItems="center"
          direction={isNext ? 'row-reverse' : 'row'}
          spacing={2}
          sx={{
            p: 2.5,
            pl: 1,
            ...(isNext && {
              pr: 1,
            }),
          }}
        >
          {icon}
          <Avatar src={coverImg} sx={{ width: 64, height: 64 }} />
          <Stack
            spacing={0.5}
            sx={{
              ...(isNext && {
                textAlign: 'right',
              }),
            }}
          >
            <Typography variant="overline" sx={{ color: 'text.disabled' }}>
              {isNext ? 'Next Post' : 'Previous Post'}
            </Typography>
            <Typography variant="subtitle1">{title}</Typography>
          </Stack>
        </Stack>
      </NextLink>
    </CardActionArea>
  );
}
