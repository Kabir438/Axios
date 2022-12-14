// icons
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Box, Grid } from '@mui/material';
// theme
import { ColorSchema } from '../../../theme/palette';
// assets
import { ElearningHeroIllustration } from '../../../assets';
// components

import { data } from '../../../../pages/index';
import Link from 'next/link';
import { Dispatch, SetStateAction, useEffect, useState } from 'react';

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

const scaleImage = (
  setScale: Dispatch<SetStateAction<number>>,
  setHeight: Dispatch<SetStateAction<number | null>>
) => {
  // lets say = 500
  const windowWidth = window.innerWidth;
  if (windowWidth < 790) {
    // lets say = 600
    const constWidth = 694;
    // lets say = 440
    const fit = windowWidth - 60;
    setScale(fit / constWidth);
    setHeight(fit);
  } else setScale(1);
};

export default function ElearningLandingHero({ pageData }: { pageData: data }) {
  const [scale, setScale] = useState<number>(1);
  const [height, setHeight] = useState<number | null>(null);
  useEffect(() => {
    scaleImage(setScale, setHeight);
    window.addEventListener('resize', () => scaleImage(setScale, setHeight));
  }, []);
  return (
    <>
      <RootStyle>
        <Container>
          <Grid
            sx={{
              flexDirection: {
                xs: 'column-reverse',
                sm: 'column-reverse',
                md: 'column-reverse',
                lg: 'row',
                xl: 'row',
              },
              alignItems: {
                xs: 'center',
                sm: 'center',
                md: 'center',
                lg: 'start',
                xl: 'start',
              },
            }}
            container
            spacing={3}
          >
            <Grid item xs={12} md={12} lg={5}>
              <br />
              <br />
              <br />
              <Stack
                sx={{
                  textAlign: { xs: 'center', lg: 'unset' },
                }}
              >
                {pageData.homePageTitle === 'Online and Offline Classes From The Experts' ? (
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
                    <Link href={`/courses`}>
                      <Box
                        component="span"
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'underline',
                          cursor: 'pointer',
                        }}
                      >
                        Classes{' '}
                      </Box>
                    </Link>
                    From The Experts
                  </Typography>
                ) : (
                  <Typography variant="h1">{pageData.homePageTitle}</Typography>
                )}

                <Typography sx={{ color: 'text.secondary', mt: 3, mb: 5 }}>
                  {pageData.homePageSubtitle}
                </Typography>

                <SummarySection
                  data={{
                    learners: pageData.learners,
                    numberOfCourses: pageData.numberOfCourses,
                    graduates: pageData.graduates,
                  }}
                />
              </Stack>
            </Grid>

            <Grid
              item
              xs={12}
              md={12}
              lg={7}
              style={{
                scale: `${scale}`,
                maxHeight: height ? height : undefined,
              }}
            >
              <ElearningHeroIllustration
                sx={{
                  transform: height ? 'translateX(-50%)' : undefined,
                  left: height ? '50%' : undefined,
                }}
                data={{
                  homePageMainImage: pageData.homePageMainImage,
                  homePageIllustrationGreenText: pageData.homePageIllustrationGreenText,
                  homePageIllustrationPurpleText: pageData.homePageIllustrationPurpleText,
                  homePageIllustrationBlueText: pageData.homePageIllustrationBlueText,
                  homePageIllustrationYellowText: pageData.homePageIllustrationYellowText,
                  homePageIllustrationWhiteText: pageData.homePageIllustrationWhiteText,
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
  data,
}: {
  data: {
    learners: string;
    numberOfCourses: string;
    graduates: string;
  };
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
      <Typography variant="h3">
        {total}
        {typeof total === 'string' ? (total.charAt(total.length - 1) === '+' ? '' : '+') : '+'}
      </Typography>
      <Typography variant="body2" sx={{ color: 'text.secondary' }}>
        {label}
      </Typography>
    </Stack>
  );
}
