// icons
import eventIcon from '@iconify/icons-carbon/event';
import chatBot from '@iconify/icons-carbon/chat-bot';
import airportLocation from '@iconify/icons-carbon/airport-location';
import icon3dCurveAutoColon from '@iconify/icons-carbon/3d-curve-auto-colon';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Grid, Container, Stack } from '@mui/material';
// components
import { Iconify } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningAboutCoreValues({
  mainAboutTitle,
  mainAboutBody,
  customerSatisfaction,
  transparency,
  reputation,
  cooperation,
}: {
  mainAboutTitle: string,
  mainAboutBody: string,
  customerSatisfaction: string,
  transparency: string,
  reputation: string,
  cooperation: string,
}) {
  const CORE_VALUES = [
    {
      title: 'Customer Satisfaction',
      description: customerSatisfaction,
      icon: icon3dCurveAutoColon,
    },
    {
      title: 'Transparency',
      description: transparency,
      icon: chatBot,
    },
    {
      title: 'Reputation',
      description: reputation,
      icon: airportLocation,
    },
    {
      title: 'Cooperation',
      description: cooperation,
      icon: eventIcon,
    },
  ];
  return (
    <RootStyle>
      <Container>
        <Stack
          spacing={3}
          direction={{ xs: 'column', md: 'row' }}
          justifyContent={{ md: 'space-between' }}
          sx={{
            mb: { xs: 8, md: 15 },
            textAlign: { xs: 'center', md: 'left' },
          }}
        >
          <Typography variant="h2">{mainAboutTitle}</Typography>
          <Typography sx={{ color: 'text.secondary', maxWidth: { md: 540 } }}>
            {mainAboutBody}
          </Typography>
        </Stack>

        <Grid container spacing={8}>
          {CORE_VALUES.map((value) => {
            const { title, description, icon } = value;
            return (
              <Grid
                key={title}
                item
                xs={12}
                sm={6}
                md={3}
                sx={{
                  textAlign: { xs: 'center', md: 'left' },
                }}
              >
                <Iconify icon={icon} sx={{ color: 'primary.main', width: 48, height: 48 }} />
                <Typography variant="h5" sx={{ mt: 5, mb: 2 }}>
                  {title}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}> {description} </Typography>
              </Grid>
            );
          })}
        </Grid>
      </Container>
    </RootStyle>
  );
}
