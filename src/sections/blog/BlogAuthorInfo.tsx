// @mui
import { Stack, Typography, Avatar } from '@mui/material';
// @types
import { Author } from '../../../pages/blog';
import { urlFor } from '../../utils/sanity';

// ----------------------------------------------------------------------

type Props = {
  author: Author;
};

export default function BlogAuthorInfo({ author }: Props) {
  const { name, role, about, quotes, picture } = author;

  return (
    <Stack direction="row" spacing={{ xs: 3, md: 4 }} sx={{ py: 8 }}>
      <Avatar src={urlFor(picture)} sx={{ width: 96, height: 96 }} />

      <Stack spacing={2}>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
          spacing={2}
        >
          <Stack spacing={0.5}>
            <Typography variant="h4">{name}</Typography>
            <Typography variant="body3" sx={{ color: 'text.secondary' }}>
              {role}
            </Typography>
          </Stack>
        </Stack>

        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {about}
        </Typography>
        <Typography variant="caption" sx={{ color: 'text.disabled' }}>
          {quotes}
        </Typography>
      </Stack>
    </Stack>
  );
}
