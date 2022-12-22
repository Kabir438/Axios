// next
import NextLink from 'next/link';
// @mui
import { Stack, Link, Typography, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function BlogSidebarCategories({
  categories
}: {
  categories: string[];
}) {
  return (
    <Stack spacing={1}>
      <Typography variant="h4" gutterBottom>
        Categories
      </Typography>
      {categories.map((category) => (
        <CategoryItem key={category} category={{
          name: category,
          path: '/category/' + category
        }} />
      ))}
    </Stack>
  );
}

// ----------------------------------------------------------------------

type CategoryItemProps = {
  category: {
    name: string;
    path: string;
  };
};

function CategoryItem({ category }: CategoryItemProps) {
  const { name, path } = category;

  return (
    <Stack key={name} direction="row" alignItems="center">
      <Box sx={{ width: 6, height: 6, mr: 2, bgcolor: 'primary.main', borderRadius: '50%' }} />
      <NextLink href={path} passHref>
        <Link variant="body2" color="inherit">
          {name}
        </Link>
      </NextLink>
    </Stack>
  );
}
