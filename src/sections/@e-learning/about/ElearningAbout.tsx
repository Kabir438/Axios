// @mui
import { styled } from '@mui/material/styles';
import { Grid, Container, Typography, Box, Stack } from '@mui/material';
// utils
import { fShortenNumber } from '../../../utils/formatNumber';
// components
import { Image, CountUpNumber } from '../../../components';
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
import { urlFor } from '../../../utils/sanity';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningAbout({
  aboutTitle,
  aboutBody,
  aboutImage,
  learnersNumber,
  learnersBody,
  coursesNumber,
  coursesBody,
  graduatesNumber,
  graduatesBody,
}: {
  aboutTitle: string,
  aboutBody: string,
  aboutImage: SanityImageSource,
  learnersNumber: number,
  learnersBody: string,
  coursesNumber: number,
  coursesBody: string,
  graduatesNumber: number,
  graduatesBody: string,
}) {
  const SUMMARY = [
    {
      name: 'Learners',
      number: learnersNumber,
      description: learnersBody
    },
    {
      name: 'Courses',
      number: coursesNumber,
      description: coursesBody
    },
    {
      name: 'Graduates',
      number: graduatesNumber,
      description:graduatesBody
    },
  ];
  return (
    <RootStyle>
      <Container>
        <Grid
          container
          spacing={{ xs: 2, md: 8 }}
          sx={{
            textAlign: { xs: 'center', md: 'left' },
          }}
        >

          <Grid item xs={12} md={6}>
            <Typography variant="h3" sx={{ mb: 3 }}>
              {aboutTitle}
            </Typography>
            <Typography sx={{ color: 'text.secondary' }}>
              {aboutBody}
            </Typography>
          </Grid>
        </Grid>

        <Grid
          container
          spacing={8}
          direction={{ md: 'row-reverse' }}
          justifyContent={{ md: 'space-between' }}
          sx={{
            pt: { xs: 8, md: 10 },
          }}
        >
          <Grid item xs={12} md={6} lg={6}>
            <Image
              alt="about"
              src={
                urlFor(aboutImage)
              }
              ratio="3/4"
              sx={{ borderRadius: 2 }}
            />
          </Grid>

          <Grid
            item
            xs={12}
            md={6}
            lg={5}
            sx={{
              textAlign: { xs: 'center', md: 'left' },
            }}
          >
            <Stack spacing={{ xs: 5, md: 10 }}>
              {SUMMARY.map((value) => (
                <Box key={value.name}>
                  <Typography variant="h4" sx={{ color: 'text.disabled', opacity: 0.48 }}>
                    {value.name}
                  </Typography>

                  <Typography variant="h2" sx={{ mt: 1, mb: 2 }}>
                    <CountUpNumber
                      start={value.number / 2}
                      end={value.number}
                      formattingFn={(value: number) => fShortenNumber(value)}
                    />
                    +
                  </Typography>

                  <Typography sx={{ color: 'text.secondary' }}>{value.description}</Typography>
                </Box>
              ))}
            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
