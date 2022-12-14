// @mui
import { Typography, Card, Box, Stack } from '@mui/material';
import { teacher } from '../../../../pages';
// components
import { Image, SocialsButton, BgOverlay } from '../../../components';
import { urlFor } from "../../../utils/sanity"

// ----------------------------------------------------------------------

type Props = {
  member: teacher;
};

export default function TeamElearningMember({ member }: Props) {
  const { name, role, degree, alumni, image, facebookHandle, instagramHandle, linkedinHandle, twitterHandle, googleBusinessHandle } = member;

  return (
    <Card>
      <Stack spacing={0.5} sx={{ textAlign: 'center', pt: 3, pb: 1.5 }}>
        <Typography variant="h4">{name}</Typography>
        <Typography px="10px" variant="h6">{degree}</Typography>
        <Typography px="10px" variant="body2">{alumni}</Typography>
        <Typography variant="body3" sx={{ color: 'text.disabled' }}>
          {role}
        </Typography>
      </Stack>

      <Box sx={{ position: 'relative' }}>
        <Shape />

        <BgOverlay
          sx={{
            opacity: 0,
            transition: (theme) =>
              theme.transitions.create('opacity', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.short,
              }),
            '&:hover': { opacity: 1 },
          }}
        >
          <Box
            sx={{
              width: 1,
              zIndex: 9,
              bottom: 24,
              display: 'flex',
              position: 'absolute',
              justifyContent: 'center',
            }}
          >
            <SocialsButton color="primary" links={{
              facebook: facebookHandle ?? undefined,
              instagram: instagramHandle ?? undefined,
              linkedin: linkedinHandle ?? undefined,
              twitter: twitterHandle ?? undefined,
              googleBusiness: googleBusinessHandle ?? undefined
            }} />
          </Box>
        </BgOverlay>
        <Image src={
          urlFor(image)
          // image
          } alt={name} ratio="1/1" />
      </Box>
    </Card>
  );
}

// ----------------------------------------------------------------------

function Shape() {
  return (
    <Box
      sx={{
        top: 0,
        width: 1,
        height: 8,
        zIndex: 9,
        position: 'absolute',
        color: 'background.paper',
      }}
    >
      <svg xmlns="http://www.w3.org/2000/svg" width="1080" height="32" viewBox="0 0 1080 32">
        <path fill="currentColor" d="M1080 32L0 0h1080v32z" />
      </svg>
    </Box>
  );
}
