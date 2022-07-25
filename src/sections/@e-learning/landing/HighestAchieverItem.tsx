// @mui
import { Typography, Stack, Avatar } from '@mui/material';
// @types
import { AchieversProps } from '../../../@types/achievers';
import { urlFor } from '../../../utils/sanity';

// ----------------------------------------------------------------------

type Props = {
  testimonial: AchieversProps;
  isSelected?: boolean;
};

export function HighestAchieversContentItem({ testimonial }: Props) {
  const { award } = testimonial;

  return (
    <Stack alignItems="center">
      <Typography
        sx={{
          mt: 2,
          mb: 5,
          lineHeight: 1.75,
          fontSize: { xs: 20, md: 24 },
          fontFamily: (theme) => theme.typography.h1.fontFamily,
        }}
      >
        {award}
      </Typography>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function HighestAchieversThumbnailItem({ testimonial, isSelected }: Props) {
  const { image } = testimonial;

  return (
    <Stack
      sx={{
        width: 100,
        height: 200,
        alignItems: 'center',
        justifyContent: 'center',
      }}
    >
      <Avatar
        src={
          urlFor(image)
        }
        sx={{
          width: 100,
          height: 100,
          opacity: 0.68,
          cursor: 'pointer',
          transition: (theme) => theme.transitions.create('all'),
          ...(isSelected && {
            opacity: 1,
            transform: 'scale(1.9)'
          }),
        }}
      />
    </Stack>
  );
}
