// @mui
import { Stack, Typography } from '@mui/material';
//
import BlogPostItemMobile from './BlogPostItemMobile';
import { BlogPost } from '../../../pages/blog';

// ----------------------------------------------------------------------

type BlogSidebarRecentPosts = {
  recentPosts: {
    list: BlogPost[];
    path: string;
  };
};

export default function BlogSidebarRecentPosts({ recentPosts }: BlogSidebarRecentPosts) {
  const { list, path } = recentPosts;

  return (
    <Stack spacing={3}>
      <Typography variant="h4" gutterBottom>
        Recent Posts
      </Typography>
      {list.map((post, i) => (
        <BlogPostItemMobile key={post.slug + i} post={post} onSiderbar path={path} />
      ))}
    </Stack>
  );
}
