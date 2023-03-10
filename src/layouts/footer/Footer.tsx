/* eslint-disable react/jsx-no-target-blank */
// icons
// @mui
import {
  Grid,
  Link,
  Stack,
  Divider,
  Container,
  Typography,
  Tooltip,
  TooltipProps,
  Zoom,
  styled,
  tooltipClasses,
} from '@mui/material';
// components
import { Logo, SocialsButton } from '../../components';

// ----------------------------------------------------------------------

const CustomTooltip = styled(({ className, ...props }: TooltipProps) => (
  <Tooltip TransitionComponent={Zoom} {...props} classes={{ popper: className }} />
))({
  [`& .${tooltipClasses.tooltip}`]: {
    maxWidth: '40rem',
    boxSizing: 'content-box',
    padding: "7.5px !important"
  },
});

export default function Footer() {

  return (
    <>
      <Divider />
      <Container>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={2.5}
          justifyContent="space-between"
          sx={{ py: 3, textAlign: "center" }}
        >
          <Typography variant="body3" sx={{ color: "text.secondary" }}>
            © 2022. All rights reserved
          </Typography>
          <Stack direction="row" spacing={3} justifyContent="center">
            <Link
              variant="body3"
              href="/privacy-policy"
              sx={{ color: "text.secondary" }}
            >
              Privacy Policy
            </Link>
            <Link
              variant="body3"
              href="/terms-of-service"
              sx={{ color: "text.secondary" }}
            >
              Terms of Service
            </Link>
          </Stack>
        </Stack>
      </Container>
    </>
  );
}
