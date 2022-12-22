// @mui
import { Stack, StackProps } from '@mui/material';
// @types
import { AuthorProps } from '../../@types/author';
// hooks
import { useResponsive } from '../../hooks';
// components
import { SearchInput } from '../../components';
//
import BlogSidebarAuthor from './BlogSidebarAuthor';
import BlogSidebarCategories from './BlogSidebarCategories';
import BlogSidebarPopularTags from './BlogSidebarPopularTags';
import BlogSidebarRecentPosts from './BlogSidebarRecentPosts';
import { BlogPost } from '../../../pages/blog';
import { ChangeEventHandler } from 'react';

// ----------------------------------------------------------------------

interface Props extends Omit<StackProps, 'onChange'> {
  author?: AuthorProps;
  recentPosts: {
    list: BlogPost[];
    path: string;
  };
  categories: string[];
  popularTags: string[];
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

export default function BlogSidebar({ author, value, onChange, recentPosts, sx, categories, popularTags, ...other }: Props) {
  const isDesktop = useResponsive('up', 'md');

  return (
    <>
      {author && isDesktop && <BlogSidebarAuthor author={author} />}

      {isDesktop && <SearchInput value={value} onChange={onChange} />}

      <Stack
        spacing={5}
        sx={{
          pt: { md: 5 },
          pb: { xs: 8, md: 0 },
          ...sx,
        }}
        {...other}
      >
        <BlogSidebarCategories categories={categories} />
        <BlogSidebarRecentPosts recentPosts={recentPosts} />
        <BlogSidebarPopularTags popularTags={popularTags} />
      </Stack>
    </>
  );
}
