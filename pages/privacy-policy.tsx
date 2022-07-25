import { ReactElement } from 'react';
// icons
// @mui
import { styled } from '@mui/material/styles';
import { Typography } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
import client from '../src/utils/sanity';

// ----------------------------------------------------------------------


const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  paddingLeft: "40px",
  paddingRight: "40px",
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function PrivacyPolicy(props: any) {
  return (
    <Page title="Support">
      <RootStyle>
        <Typography 
            sx={{
                px: "100px",
                mb: "30px"
            }} 
            variant="h1"
        >Privacy Policy</Typography>
        <Typography 
            sx={{
                px: "100px",
                pb: "50px"
            }} 
            textAlign="justify"
            variant="h6"
        >{props.privacyPolicy}</Typography>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

PrivacyPolicy.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const PrivacyPolicyQuery = `*[_type == "legal"][0] {
      privacyPolicy
    }`;
  const PrivacyPolicyData = await client.fetch(PrivacyPolicyQuery);
  return {
    props: {
      ...PrivacyPolicyData,
    },
  };
}