// next
import NextLink from 'next/link';
// @mui
import { Stack, Avatar, Typography, Paper, Divider } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import { Image, TextMaxLine } from '../../../components';
import { BlogPost } from '../../../../pages/blog';
import { blocksToText, urlFor } from '../../../utils/sanity';
import readingTime from 'reading-time';

// ----------------------------------------------------------------------

type Props = {
  post: BlogPost;
};

export default function BlogElearningPostItem({ post }: Props) {
  const { slug, title, coverImg, description, author, createdAt, blogContent: content } = post;
  const contentString = blocksToText(content)
  const tempDuration = contentString !== false && readingTime(contentString);
  const duration = tempDuration && `${Math.ceil(tempDuration.minutes)} min read`;
  return (
    <Paper variant="outlined" sx={{ borderRadius: 2, overflow: 'hidden' }}>
      <Image src={urlFor(coverImg)} alt={title} ratio="1/1" />

      <Stack direction="row" spacing={3} sx={{ p: 3 }}>
        <Stack sx={{ textAlign: 'center' }}>
          <Typography variant="subtitle2">{fDate(createdAt, 'MMM')}</Typography>
          <Divider sx={{ mt: 1, mb: 0.5 }} />
          <Typography variant="h3">{fDate(createdAt, 'dd')}</Typography>
        </Stack>

        <Stack spacing={1}>
          <NextLink
            passHref
            as={`blog/${slug}`}
            href={`blog/[${slug}]`}
          >
            <TextMaxLine variant="h6" asLink persistent>
              {title}
            </TextMaxLine>
          </NextLink>

          <TextMaxLine variant="body2" persistent color="text.secondary">
            {description}
          </TextMaxLine>

          <Stack spacing={1.5} direction="row" alignItems="center" sx={{ pt: 1.5 }}>
            <Avatar src={urlFor(author.picture)} sx={{ width: 40, height: 40 }} />
            <Stack>
              <Typography variant="body2">{author.name}</Typography>
              <Typography variant="caption" sx={{ color: 'text.disabled' }}>
                {duration}
              </Typography>
            </Stack>
          </Stack>
        </Stack>
      </Stack>
    </Paper>
  );
}
