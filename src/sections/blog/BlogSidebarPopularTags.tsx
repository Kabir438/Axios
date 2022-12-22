// next
import { useRouter } from 'next/router';
// @mui
import { Typography, Chip, Box } from '@mui/material';

// ----------------------------------------------------------------------

export default function BlogSidebarPopularTags({
  popularTags
}: {
  popularTags: string[];
}) {
  const router = useRouter();

  const onClick = (href: string) => {
    router.push(href);
  };

  return (
    <Box>
      <Typography variant="h4" sx={{ mb: 3 }}>
        Popular Tags
      </Typography>

      {popularTags.map((tag) => (
        <Chip key={tag} label={tag} sx={{ m: 0.5 }} onClick={() => onClick("/tag/" + tag)} />
      ))}
    </Box>
  );
}
