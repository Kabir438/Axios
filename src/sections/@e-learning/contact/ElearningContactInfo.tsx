// icons
import locationIcon from '@iconify/icons-carbon/location';
import mobileIcon from '@iconify/icons-carbon/mobile';
import emailIcon from '@iconify/icons-carbon/email';
// next
import dynamic from 'next/dynamic';
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Grid, Link, Divider } from '@mui/material';
// components
import { SocialsButton, Iconify, TextIconLabel } from '../../../components';
//
const ContactMap = dynamic(() => import('../../../components/map/ContactMap'));

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  backgroundColor: theme.palette.background.neutral,
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(10, 0),
  },
}));

// ----------------------------------------------------------------------

export default function ElearningContactInfo({
  contactUsTitle,
  email,
  phoneNumber, 
  locations,
  followUsTitle, 
  facebookLink, 
  instagramLink, 
  linkedInLink, 
  twitterLink, 
  googleBusinessLink, 
}: {
  contactUsTitle: string,
  email: string,
  phoneNumber: string, 
  locations: {
    address: string;
    latitude: number;
    longitude: number;
    googleMapsLink: string;
  }[],
  followUsTitle: string, 
  facebookLink: string | null, 
  instagramLink: string | null, 
  linkedInLink: string | null, 
  twitterLink: string | null, 
  googleBusinessLink: string | null, 
}) {
  return (
    <RootStyle>
      <Container>
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid item xs={12} md={6} lg={4}>
            <Typography
              variant="h2"
              sx={{
                mb: 5,
                textAlign: { xs: 'center', md: 'left' },
              }}
            >
              {contactUsTitle}
            </Typography>

            <Stack spacing={3} alignItems={{ xs: 'center', md: 'flex-start' }}>
              <Stack spacing={1}>
                <TextIconLabel
                  icon={<Iconify icon={emailIcon} sx={{ mr: 1, width: 24, height: 24 }} />}
                  value="Email"
                  sx={{ typography: 'subtitle2' }}
                />
                <Link color="inherit" variant="body2" href="mailto:hello@example.com">
                  {email}
                </Link>
              </Stack>

              <Stack spacing={1}>
                <TextIconLabel
                  icon={<Iconify icon={mobileIcon} sx={{ mr: 1, width: 24, height: 24 }} />}
                  value="Phone"
                  sx={{ typography: 'subtitle2' }}
                />

                <Typography variant="body2">{phoneNumber}</Typography>
              </Stack>

              <Stack spacing={1}>
                <TextIconLabel
                  icon={<Iconify icon={locationIcon} sx={{ mr: 1, width: 24, height: 24 }} />}
                  value="Address"
                  sx={{ typography: 'subtitle2' }}
                />
                {
                  locations.map((location, index) => (
                    <Typography key={`adress-${index}`} variant="body2">
                      {location.address}
                    </Typography>
                  ))
                }
              </Stack>

              <Divider sx={{ borderStyle: 'dashed', width: 1 }} />

              <Stack spacing={1} alignItems={{ xs: 'center', md: 'flex-start' }}>
                <Typography variant="overline">{followUsTitle}</Typography>
                <SocialsButton
                  links={{
                    facebook: facebookLink ?? undefined,
                    instagram: instagramLink ?? undefined,
                    linkedin: linkedInLink ?? undefined,
                    twitter: twitterLink ?? undefined,
                    googleBusiness: googleBusinessLink ?? undefined
                  }}
                  sx={{ color: 'text.primary' }}
                />
              </Stack>
            </Stack>
          </Grid>

          <Grid item xs={12} md={6} lg={7}>
            <ContactMap 
              locations={locations}
              sx={{ borderRadius: 2 }} 
            />
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
