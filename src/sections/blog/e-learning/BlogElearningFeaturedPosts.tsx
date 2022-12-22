// next
import NextLink from 'next/link';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Stack, Avatar, Link } from '@mui/material';
// utils
import { fDate } from '../../../utils/formatTime';
// components
import { Image } from '../../../components';
import { BlogPost } from '../../../../pages/blog';
import { blocksToText, urlFor } from '../../../utils/sanity';
import readingTime from 'reading-time';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

const DotStyle = styled('span')(({ theme }) => ({
  width: 4,
  height: 4,
  borderRadius: '50%',
  backgroundColor: 'currentColor',
  margin: theme.spacing(0, 1),
}));

// ----------------------------------------------------------------------

type Props = {
  post: BlogPost;
};

export default function BlogElearningFeaturedPosts({ post }: Props) {
  const { slug, title, coverImg, description, author, createdAt, blogContent: content } = post;
  const contentString = blocksToText(content)
  const tempDuration = contentString !== false && readingTime(contentString);
  const duration = tempDuration && `${Math.ceil(tempDuration.minutes)} min read`;

  return (
    <RootStyle>
      <Container>
        <Stack direction={{ xs: 'column', md: 'row' }}>
          <Image src={urlFor(coverImg)} alt={title} sx={{ flexGrow: 1, height: 560, borderRadius: 2 }} />

          <Stack
            spacing={1}
            sx={{
              mx: 'auto',
              pl: { md: 8 },
              py: { xs: 3, md: 5 },
              maxWidth: { md: 408 },
            }}
          >
            <Stack
              direction="row"
              alignItems="center"
              sx={{ typography: 'caption', color: 'text.disabled' }}
            >
              {fDate(createdAt)}
              <DotStyle />
              {duration}
            </Stack>

            <NextLink
              passHref
              as={`blog/${slug}`}
              href={`blog/[${slug}]`}
            >
              <Link color="inherit" variant="h3">
                {title}
              </Link>
            </NextLink>

            <Typography sx={{ color: 'text.secondary', flexGrow: 1 }}>{description}</Typography>

            <Stack direction="row" alignItems="center" sx={{ pt: 1.5, typography: 'body2' }}>
              <Avatar src={urlFor(author.picture)} sx={{ mr: 1 }} />
              {author.name}
            </Stack>
          </Stack>
        </Stack>
      </Container>
    </RootStyle>
  );
}
