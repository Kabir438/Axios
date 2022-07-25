// icons
// @mui
import {
  Grid,
  Link,
  Stack,
  Divider,
  Container,
  Typography,
} from '@mui/material';
// components
import { Logo, SocialsButton } from '../../components';

// ----------------------------------------------------------------------

export default function Footer() {

  return (
    <>
      <Divider />
      <Container sx={{ py: { xs: 8, md: 10 } }}>
        <Grid container spacing={3} justifyContent={{ md: 'space-between' }}>
          <Grid item xs={12} md={4}>
            <Stack spacing={{ xs: 3, md: 5 }}>
              <Stack alignItems="flex-start" spacing={3}>
                <Logo />
                <Typography variant="body3" sx={{ color: 'text.secondary' }}>
                  The starting point for your next project based on easy-to-customize Material-UI ©
                  helps you build apps faster and better.
                </Typography>
              </Stack>

              <Stack spacing={2}>
                <Typography variant="h6">Social</Typography>
                <SocialsButton />
              </Stack>
            </Stack>
          </Grid>
        </Grid>
      </Container>

      <Divider />

      <Container>
        <Stack
          direction={{ xs: 'column', md: 'row' }}
          spacing={2.5}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: 'center' }}
        >
          <Typography variant="body3" sx={{ color: 'text.secondary' }}>
            © 2022. All rights reserved
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Link variant="body3" href="/privacy-policy" sx={{ color: 'text.secondary' }}>
              Privacy Policy
            </Link>
            <Link variant="body3" href="/terms-of-service" sx={{ color: 'text.secondary' }}>
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}