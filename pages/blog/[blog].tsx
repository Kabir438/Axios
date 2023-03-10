import { GetStaticProps } from 'next';
import client, { blocksToText, urlFor } from '../../src/utils/sanity';
import { getImageDimensions } from '@sanity/asset-utils';
import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Chip, Stack, Divider, Container, Typography } from '@mui/material';
// routes
// utils
// hooks
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// @types
// _data
// layouts
import Layout from '../../src/layouts';
// components
import { Page, Image, SocialsButton } from '../../src/components';
import { Breadcrumbs, ShareButton } from '../../src/components';
// sections
import {
  BlogAuthorInfo,
  BlogElearningLatestPosts,
  BlogPrevAndNextPost,
} from '../../src/sections/blog';
import { BlogPost } from '.';
import NextLink from 'next/link';
import { PortableText, PortableTextReactComponents } from '@portabletext/react';
import readingTime from 'reading-time';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

const portableTextComponents: Partial<PortableTextReactComponents> = {
  types: {
    break: () => <br className="lineBreak" />,
    image: (props) => {
      const { value, isInline } = props;
      const { width, height } = getImageDimensions(value);
      return (
        <Image
          sx={{
            aspectRatio: width / height,
            display: isInline ? 'inline-block' : 'block',
          }}
          src={urlFor(value)}
          alt={value.alt}
        />
      );
    },
    callToAction: ({ value, isInline }) =>
      isInline ? (
        <span
          style={{
            color: '#125bff',
          }}
        >
          <NextLink href={value.url}>
            {value.text}
            {value.url || 'ok bro'}
          </NextLink>
        </span>
      ) : (
        <div className="callToAction">{value.text}</div>
      ),
  },

  marks: {
    link: ({ children, value }) => {
      const rel = !value.href.startsWith('/') ? 'noreferrer noopener' : undefined;
      return (
        <NextLink rel={rel} href={value.href}>
          <span
            style={{
              color: '#125bff',
              cursor: "pointer"
            }}
          >
            {children}
          </span>
        </NextLink>
      );
    },
    normal: ({ children }) => (
      <p
        style={{
          textAlign: 'justify',
        }}
      >
        {children}
      </p>
    ),
  },
};

// ----------------------------------------------------------------------

type Props = {
  post: BlogPost;
  posts: {
    blogPosts: BlogPost[];
  };
};

export default function ElearningPostPage({ post, posts: { blogPosts: posts } }: Props) {
  const { slug, title, description, author, tags, blogContent: content } = post;

  const contentString = blocksToText(content)
  const tempDuration = contentString !== false && readingTime(contentString);
  const duration = tempDuration && `${Math.ceil(tempDuration.minutes)} min read`;

  const currentPost = posts.findIndex((post) => post.slug === slug);

  const prevPost = posts.find((_, index) => index === currentPost - 1);
  const nextPost = posts.find((_, index) => index === currentPost + 1);

  return (
    <Page title={`${title} - Post | E-Learning`}>
      <RootStyle>
        <Divider />

        <Container>
          <Breadcrumbs
            sx={{
              my: { xs: 3, md: 5 },
            }}
            links={[{ name: 'Home', href: '/' }, { name: 'Blog', href: '/blog' }, { name: title }]}
          />
        </Container>

        <Container>
          <Grid container spacing={3} justifyContent={{ md: 'center' }}>
            <Grid item xs={12} md={8}>
              <Stack
                spacing={3}
                sx={{
                  pb: 6,
                  textAlign: 'center',
                  pt: { xs: 6, md: 10 },
                }}
              >
                <Typography variant="h2" component="h1">
                  {title}
                </Typography>
                <Typography variant="h5" textAlign={'justify'}>
                  {description}
                </Typography>
              </Stack>

              <Stack direction="row-reverse" justifyContent="space-between" alignItems="center">
                <ShareButton links={{
                  facebook: "",
                  instagram: "",
                  linkedin: "",
                  twitter: "",
                }} />
                <Typography variant="body2" sx={{ color: 'text.disabled' }}>
                  {duration}
                </Typography>
              </Stack>

              <Divider />
              <Divider sx={{ mb: 6 }} />

              <Container
                sx={{
                  width: "100%",
                  padding: "0px !important",
                  "p": {
                    textAlign: "justify",
                  }
                }}
              >
                <PortableText value={content} components={portableTextComponents} />
              </Container>
              {/* <Markdown content={content} firstLetter /> */}

              <Stack direction="row" alignItems="center" flexWrap="wrap" sx={{ my: 6 }}>
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Tags:
                </Typography>
                {tags.map((tag) => (
                  <Chip key={tag} size="small" label={tag} sx={{ m: 0.5 }} onClick={() => {}} />
                ))}
              </Stack>

              <Stack direction="row" alignItems="center" flexWrap="wrap">
                <Typography variant="subtitle2" sx={{ mr: 1 }}>
                  Share:
                </Typography>
                <SocialsButton initialColor links={{
                  facebook: 'string',
                  instagram: 'string',
                  linkedin: 'string',
                  twitter: 'string',
                  googleBusiness: null
                }} simple={false} />
              </Stack>

              <Divider sx={{ mt: 8 }} />

              <BlogAuthorInfo author={author} />

              <Divider />

              {(prevPost || nextPost) && (
                <BlogPrevAndNextPost prevPost={prevPost} nextPost={nextPost} />
              )}
            </Grid>
          </Grid>
        </Container>

        <Divider />

        <BlogElearningLatestPosts posts={posts.slice(0, 3)} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningPostPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export const getStaticPaths = async () => {
  const blogPostQuery = `*[_type == "blogPage"][0] {
    blogPosts[]->{
      slug
    }
  }`;
  const blogPostData = await client.fetch(blogPostQuery);
  const blogSlugs = Array.from(
    new Set((blogPostData.blogPosts as { slug: string }[]).map((i) => i.slug))
  );
  return {
    paths: [
      ...blogSlugs.map((slug) => ({
        params: {
          blog: slug,
        },
      })),
    ],
    fallback: false,
  };
};

export const getStaticProps: GetStaticProps = async (context) => {
  const blogPostQuery = `*[_type == "blogPost" && slug == "${decodeURIComponent(
    String(context.params?.blog)
  )}"][0] {
    slug,
    title,
    author->{
        name,
        about,
        picture,
        quotes,
        role
    },
    category,
    coverImg,
    createdAt,
    description,
    tags[],
    blogContent
  }`;
  const blogQuery = `*[_type == "blogPage"][0] {
    blogPosts[]->{
       slug,
       title,
       author->{
          name,
          about,
          picture,
          quotes,
          role
       },
       category,
       coverImg,
       createdAt,
       description,
       tags[],
       blogContent
    }
  }`;
  const blogPostData = await client.fetch(blogPostQuery);
  const blogData = await client.fetch(blogQuery);
  return {
    props: {
      post: {
        ...blogPostData,
      },
      posts: {
        ...blogData,
      },
    },
  };
};
