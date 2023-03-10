// icons
import quotesIcon from '@iconify/icons-carbon/quotes';
// @mui
import { Stack, Avatar } from '@mui/material';
import { testimonial } from '../../../../pages';
// components
import { Iconify, TextMaxLine } from '../../../components';
import { urlFor } from '../../../utils/sanity';

// ----------------------------------------------------------------------

type Props = {
  testimonial: testimonial;
  isSelected?: boolean;
};

export function TestimonialsElearningContentItem({ testimonial }: Props) {
  const { review } = testimonial;

  return (
    <Stack alignItems="center">
      <Iconify
        icon={quotesIcon}
        sx={{ width: 48, height: 48, opacity: 0.48, color: 'primary.main' }}
      />
      <TextMaxLine
        lineHeight={10}
        line={10}
        sx={{
          mt: 2,
          mb: 5,
          minHeight: "420px",
          // display: "flex",
          // flexDirection: "column",
          // justifyContent: "center",
          lineHeight: 1.75,
          fontSize: { xs: 20, md: 24 },
          fontFamily: (theme) => theme.typography.h1.fontFamily,
        }}
      >
        {review}
      </TextMaxLine>
    </Stack>
  );
}

// ----------------------------------------------------------------------

export function TestimonialsElearningThumbnailItem({ testimonial, isSelected }: Props) {
  const { image } = testimonial;

  
    return (
      <Stack
        sx={{
          width: 96,
          height: 96,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Avatar
          src={
            urlFor(image)
            // image
          }
          sx={{
            width: 48,
            height: 48,
            opacity: 0.48,
            cursor: 'pointer',
            transition: (theme) => theme.transitions.create('all'),
            ...(isSelected && {
              opacity: 1,
              transform: 'scale(2)',
            }),
          }}
        />
      </Stack>
    );
}
