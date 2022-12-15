import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
// sections
import { ElearningContactInfo, ElearningContactForm } from '../src/sections/@e-learning';
import client, { urlFor } from '../src/utils/sanity';
import SEO from '../src/components/SEO';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningContactUsPage(props: any) {
  return (
    <Page title="Contact Us | Axios Career Academy">
      <SEO
        {
          ...{
            title: props.SEOTitle,
            description: props.SEODescription,
            imageURL: urlFor(props.SEOImage),
            url: props.SEOURL,
            twitterCreatorId: props.twitterCreatorId,
            keywords: props.SEOKeywords,
            googleSiteVerificationId: props.googleSiteVerificationId
          }
        }
      />
      <RootStyle>
        <ElearningContactInfo
          {
            ...{
              contactUsTitle: props.contactUsTitle,
              email: props.email,
              phoneNumber: props.phoneNumber,
              locations: props.locations,
              followUsTitle: props.followUsTitle, 
              facebookLink: props.facebookLink, 
              instagramLink: props.instagramLink, 
              linkedInLink: props.linkedInLink, 
              twitterLink: props.twitterLink, 
              googleBusinessLink: props.googleBusinessLink
            }
          }
        />

        <ElearningContactForm
          {
            ...{
              contactImage: props.contactImage, 
              contactTitle: props.contactTitle, 
              contactBody: props.contactBody,
            }
          }
        />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningContactUsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const contactUsQuery = `*[_type == "contactUsPage"][0] {
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
    contactImage, 
    contactTitle, 
    contactBody,
    SEOTitle,
    SEODescription,
    SEOImage,
    SEOURL,
    twitterCreatorId,
    SEOKeywords[],
    googleSiteVerificationId
  }`;
  const contactUsData = await client.fetch(contactUsQuery);
  return {
    props: {
      ...contactUsData,
    },
    revalidate: 5*60
    // 5 minutes
  };
}