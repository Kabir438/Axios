// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Grid, Box } from '@mui/material';
// components
import { Image } from '../../../components';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '../../../utils/sanity';

// ----------------------------------------------------------------------

const RootStyle = styled(Stack)(({ theme }) => ({
  padding: theme.spacing(0, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(0, 0),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningLandingIntroduce({
  data,
}: {
  data: {
    secondImage: SanityImageSource;
    secondTitle: string;
    secondBody: string;
    secondPointer1: string;
    secondPointer2: string;
    secondPointer3: string;
    secondPointer4: string;
  };
}) {
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={3}
          alignItems={{ md: 'center' }}
          justifyContent={{ md: 'space-between' }}
        >
          <Grid item xs={12} md={6} lg={5} display={{ xs: 'none', md: 'block' }}>
            <Image
              alt="about"
              src={urlFor(data.secondImage)}
              ratio="4/6"
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              {data.secondTitle}{' '}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {data.secondBody}
            </Typography>

            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 5, md: 10 }}
              sx={{ mt: { xs: 8, md: 10 } }}
            >
              <Stack spacing={3}>
                <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  {data.secondPointer1}
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  {data.secondPointer2}
                </Typography>
              </Stack>
            </Stack>
            <Stack
              direction={{ xs: 'column', md: 'row' }}
              spacing={{ xs: 5, md: 10 }}
              sx={{ mt: { xs: 8, md: 10 } }}
            >
              <Stack spacing={3}>
                <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  {data.secondPointer3}
                </Typography>
              </Stack>

              <Stack spacing={3}>
                <Box sx={{ width: 24, height: 3, bgcolor: 'primary.main' }} />
                <Typography sx={{ color: 'text.secondary' }}>
                  {data.secondPointer4}
                </Typography>
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
