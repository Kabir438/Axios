// @mui
import { Pagination, Box, Typography } from '@mui/material';
//
import BlogElearningPostItem from './BlogElearningPostItem';
import { BlogPost } from '../../../../pages/blog';
import { useState } from 'react';

// ----------------------------------------------------------------------

type Props = {
  posts: BlogPost[];
  value: string;
};

export default function BlogElearningPostList({ posts, value }: Props) {
  const numberOfPages = Math.ceil(posts.length/8)
  const [page, setPage] = useState(1)
  return (
    <>
      <Box
        sx={{
          display: 'grid',
          rowGap: { xs: 4, md: 5 },
          columnGap: 4,
          gridTemplateColumns: {
            xs: 'repeat(1, 1fr)',
            sm: 'repeat(2, 1fr)',
          },
        }}
      >
        {posts.slice(0+(page-1)*8, 8+(page-1)*8).map((post, i) => (
          <BlogElearningPostItem key={post.slug + i} post={post} />
        ))}
        {
          posts.length === 0 && (
            <>
              <Typography variant="h3">No Results Found for:</Typography>
              <Typography variant="h4">{value}</Typography>
            </>
          )
        }
      </Box>

      {
        numberOfPages > 1 && <Pagination
          page={page}
          onChange={(_, value) => setPage(value)}
          count={numberOfPages}
          color="primary"
          size="large"
          sx={{
            py: { xs: 8, md: 10 },
            '& .MuiPagination-ul': {
              justifyContent: 'center',
            },
          }}
        />
      }
    </>
  );
}
