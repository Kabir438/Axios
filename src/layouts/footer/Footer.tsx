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
  Box,
  styled,
  TooltipProps,
  tooltipClasses,
  Zoom,
} from '@mui/material';
// components
import { Logo, SocialsButton } from '../../components';
import { useEffect, useState } from 'react';

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
  const [src, setSrc] = useState<string>("")
  useEffect(() => {
    const xhr = new XMLHttpRequest();
    xhr.open("GET", "https://kabirchawla.com/seo-img.png");
    xhr.responseType = "blob";
    xhr.onload = () => {
      const urlCreator = window.URL || window.webkitURL;
      const imageUrl = urlCreator.createObjectURL(xhr.response);
      setSrc(imageUrl);
    }
    xhr.send();
  }, [])

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
                An initiative by IIT alumni, Axios career academy offers solutions for tutoring of students in IBDP, A levels, IGCSE, JEE, CBSE and ICSE.
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
          <Typography variant="body2" sx={{display: "inline"}}>
            This website is made by{` `}
            <CustomTooltip
              arrow
              placement='top'
              sx={{
                width: "50rem",
                maxWidth: "unset",
                cursor: "pointer"
              }}
              title={
                  <div
                    onClick={() => window.open("https://kabirchawla.com/?from=axios", "_blank")}
                    style={{
                      placeItems: "center",
                      maxWidth: "unset",
                      padding: "0px !important",
                      margin: "0px !important",
                      display: "grid",
                      cursor: "pointer",
                      width: "40rem"
                    }}
                  >
                   <img draggable={false} style={{
                     width: "100%",
                     borderRadius: "8px",
                     height: "min-content"
                   }} alt={"Preview of kabirchawla.com"} src={src} />
                  </div>
              }
            >
              <Typography variant="body1" sx={{display: "inline"}}>
                <a style={{
                  color: "#2042fe"
                }} target="_blank" href="https://kabirchawla.com">kabirchawla.com</a>
              </Typography>
            </CustomTooltip>
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