// icons
import chevronRight from '@iconify/icons-carbon/chevron-right';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Box, Grid, Divider, Button } from '@mui/material';
// theme
import { ColorSchema } from '../../../theme/palette';
// assets
import { ElearningHeroIllustration } from '../../../assets';
// components
import { Iconify } from '../../../components';

import { data } from "../../../../pages/index"

// ----------------------------------------------------------------------

const RootStyle = styled(Stack)(({ theme }) => ({
  overflow: 'hidden',
  paddingTop: theme.spacing(0),
  paddingBottom: theme.spacing(10),
  [theme.breakpoints.up('md')]: {
    minHeight: '100vh',
    alignItems: 'center',
    justifyContent: 'center',
    paddingBottom: theme.spacing(15),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningLandingHero({
  pageData
}: {
  pageData: data
}) {
  return (
    <>
      <RootStyle>
        <Container>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6} lg={5}>
              <Stack
                sx={{
                  textAlign: { xs: 'center', md: 'unset' },
                }}
              >
                {
                  pageData.homePageTitle === "Online and Offline Classes From The Experts"
                  ?
                  <Typography variant="h1">
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      {' '}
                      Online{' '}
                    </Box>
                    and
                    <Box component="span" sx={{ color: 'text.disabled' }}>
                      {' '}
                      Offline{' '}
                    </Box>
                    <Box component="span" sx={{ color: 'primary.main', textDecoration: 'underline' }}>
                      Classes{' '}
                    </Box>
                    From The Experts
                  </Typography>
                  :
                  <Typography variant="h1">
                    {pageData.homePageTitle}
                  </Typography>
                }

                <Typography sx={{ color: 'text.secondary', mt: 3, mb: 5 }}>
                  {pageData.homePageSubtitle}
                </Typography>

                <Stack spacing={3} alignItems="center" direction={{ xs: 'column', md: 'row' }}>
                  <Button
                    size="large"
                    variant="contained"
                    endIcon={<Iconify icon={chevronRight} />}
                  >
                    Start
                  </Button>
                </Stack>

                <Divider sx={{ borderStyle: 'dashed', mt: 8, mb: 6 }} />

                <SummarySection
                  data={{
                    learners: pageData.learners,
                    numberOfCourses: pageData.numberOfCourses,
                    graduates: pageData.graduates,
                  }}
                />
              </Stack>
            </Grid>

            <Grid item xs={12} md={6} lg={7} sx={{ display: { xs: 'none', md: 'block' } }}>
              <ElearningHeroIllustration
                data={{
                  homePageMainImage: pageData.homePageMainImage,
                  homePageIllustrationGreenText: pageData.homePageIllustrationGreenText,
                  homePageIllustrationPurpleText: pageData.homePageIllustrationPurpleText,
                  homePageIllustrationBlueText: pageData.homePageIllustrationBlueText,
                  homePageIllustrationYellowText: pageData.homePageIllustrationYellowText,
                  homePageIllustrationWhiteText: pageData.homePageIllustrationWhiteText
                }}
              />
            </Grid>
          </Grid>
        </Container>
      </RootStyle>
    </>
  );
}

// ----------------------------------------------------------------------

function SummarySection({
  data
}: {
  data: {
    learners: string,
    numberOfCourses: string,
    graduates: string,
  }
}) {
  return (
    <Stack
      spacing={{ xs: 3, sm: 10 }}
      direction="row"
      justifyContent={{ xs: 'center', md: 'unset' }}
    >
      {SummaryItem(data.learners, 'Learners', 'warning')}
      {SummaryItem(data.numberOfCourses, 'Courses', 'error')}
      {SummaryItem(data.graduates, 'Graduates', 'success')}
    </Stack>
  );
}

function SummaryItem(total: string | number, label: string, color: ColorSchema) {
  return (
    <Stack spacing={0.5} sx={{ position: 'relative' }}>
      <Box
        sx={{
          top: 8,
          left: -4,
          width: 24,
          height: 24,
          zIndex: -1,
          opacity: 0.24,
          borderRadius: '50%',
          position: 'absolute',
          bgcolor: (theme) => theme.palette[color].main,
        }}
      />
      <Typography variant="h3">{total}{
        typeof total === 'string'
        ?
          total.charAt(total.length - 1) === "+"
          ?
          ""
          :
          "+"
        :
        "+"
      }</Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Stack>
  );
}
