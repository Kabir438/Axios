// @mui
import { styled, alpha } from '@mui/material/styles';
import { Grid, Container, Typography, Button } from '@mui/material';
// components
import { Image } from '../../../components';
import { useRouter } from 'next/router';
import Routes from '../../../routes';
import { urlFor } from '../../../utils/sanity';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(10, 0),
  backgroundColor: alpha(theme.palette.primary.main, 0.08),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningAboutHero({
  coursesHeaderTitle,
  coursesHeaderBody,
  coursesImage
}: {
  coursesHeaderTitle: string,
  coursesHeaderBody: string,
  coursesImage: SanityImageSource
}) {
  const router = useRouter()
  return (
    <RootStyle>
      <Container>
        <Grid container spacing={{ xs: 8, md: 3 }} justifyContent="space-between">
          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Typography variant="h1">{coursesHeaderTitle}</Typography>
            <Typography sx={{ mt: 3, mb: 6 }}>
              {coursesHeaderBody}
            </Typography>

            <Button variant="contained" size="large" onClick={() => router.replace(Routes.courses)}>
              Browse Courses
            </Button>
          </Grid>

          <Grid item xs={12} md={6} lg={6}>
            <Image
              alt="courses-online"
              src={
                urlFor(coursesImage)
              }
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
