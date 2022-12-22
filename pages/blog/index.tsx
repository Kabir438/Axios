import { ChangeEventHandler, ReactElement, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container } from '@mui/material';
// utils
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../../src/config';
// @types
// layouts
import Layout from '../../src/layouts';
// components
import { Page, SearchInput } from '../../src/components';
// sections
import {
  BlogSidebar,
  BlogElearningPostList,
  BlogElearningFeaturedPosts,
} from '../../src/sections/blog';
import client from '../../src/utils/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import Fuse from 'fuse.js';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export type BlogPost = {
  author: Author;
  blogContent: any;
  category: string;
  coverImg: SanityImageSource;
  createdAt: string;
  // "2022-12-20T05:47:04.421Z"
  description: string;
  slug: string;
  tags: string[];
  title: string;
};

export type Author = {
  about: string;
  name: string;
  picture: SanityImageSource;
  quotes: string;
  role: string;
};

type Props = {
  SEODescription: string;
  SEOImage: SanityImageSource;
  SEOKeywords: string[];
  SEOTitle: string;
  SEOURL: string;
  blogPosts: BlogPost[];
  author: Author;
  categories: string[];
  featuredPost: BlogPost;
  googleSiteVerificationId: string;
  popularTags: string[];
  twitterCreatorId: string;
  matches?: string;
};

export default function ElearningBlogPage(props: Props) {
  const [blogPosts, setBlogPosts] = useState(props.blogPosts);
  const [search, setSearch] = useState('');
  const fuse = new Fuse(props.blogPosts, {
    keys: ['title', 'description', 'author', 'tags', 'category'],
  })
  const handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement> = (event) => {
    const searchQuery = event.currentTarget.value;
    setSearch(searchQuery)
    const searchData = fuse.search(searchQuery.trim());
    const searchResult = searchData.map(i => ({
      ...i.item,
      matches: i.matches
    }));
    if(!searchResult.length && searchQuery.trim() === '') {
      setBlogPosts(props.blogPosts);
    } else {
      setBlogPosts(searchResult);
    }
    console.log(searchResult, "change")
  }
  return (
    <Page title="Blog - E-Learning">
      <RootStyle>
        <SearchInput
          sx={{
            mx: 2.5,
            display: { xs: 'flex', md: 'none' },
            my: { xs: 4, md: 0 },
          }}
          value={search}
          onChange={handleChange}
        />

        <BlogElearningFeaturedPosts post={props.featuredPost} />

        <Container
          sx={{
            mt: { xs: 4, md: 10 },
          }}
        >
          <Grid container spacing={{ md: 8 }}>
            <Grid item xs={12} md={8}>
              <BlogElearningPostList value={search} posts={blogPosts} />
            </Grid>

            <Grid item xs={12} md={4}>
              <BlogSidebar
                value={search}
                onChange={handleChange}
                categories={props.categories}
                popularTags={props.popularTags}
                recentPosts={{
                  list: props.blogPosts.slice(-4),
                  path: '/blog',
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningBlogPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const blogQuery = `*[_type == "blogPage"][0] {
    featuredPost->{
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
    }, 
    SEOTitle,
    SEODescription,
    SEOImage,
    SEOURL,
    twitterCreatorId,
    SEOKeywords,
    googleSiteVerificationId,
    categories,
    popularTags,
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
  const blogData = await client.fetch(blogQuery);
  return {
    props: {
      ...blogData,
    },
    revalidate: 5 * 60,
    // 5 minutes
  };
}
