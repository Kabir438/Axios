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
import {
  ElearningAboutHero,
  ElearningAbout,
  ElearningAboutCoreValues,
} from '../src/sections/@e-learning';
import client, { urlFor } from '../src/utils/sanity';
import { TeamElearningAbout } from '../src/sections/team';
import { TestimonialsElearning } from '../src/sections/testimonials';
import SEO from '../src/components/SEO';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningAboutUsPage(props: any) {
  return (
    <Page title="About Us | Axios Career Academy">
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
        <ElearningAboutHero 
          {
            ...{
              coursesHeaderTitle: props.coursesHeaderTitle,
              coursesHeaderBody: props.coursesHeaderBody,
              coursesImage: props.coursesImage
            }
          }
        />

        <ElearningAbout
          {
            ...{
                aboutTitle: props.aboutTitle,
                aboutBody: props.aboutBody,
                aboutImage: props.aboutImage,
                learnersNumber: props.learnersNumber,
                learnersBody: props.learnersBody,
                coursesNumber: props.coursesNumber,
                coursesBody: props.coursesBody,
                graduatesNumber: props.graduatesNumber,
                graduatesBody: props.graduatesBody,
            }
          }
        />

        <ElearningAboutCoreValues
          {
            ...{
              mainAboutTitle: props.mainAboutTitle,
              mainAboutBody: props.mainAboutBody,
              customerSatisfaction: props.customerSatisfaction,
              transparency: props.transparency,
              reputation: props.reputation,
              cooperation: props.cooperation,
            }
          }
        />

        <TeamElearningAbout 
          teachersTitle={props.teachersTitle}
          members={props.teachers} 
        />

        <TestimonialsElearning title={""} testimonials={props.testimonials} />
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningAboutUsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const homeQuery = `*[_type == "about-us"][0] {
     coursesHeaderTitle,
     coursesHeaderBody,
     coursesImage,
     aboutTitle,
     aboutBody,
     aboutImage,
     learnersNumber,
     learnersBody,
     coursesNumber,
     coursesBody,
     graduatesNumber,
     graduatesBody,
     mainAboutTitle,
     mainAboutBody,
     customerSatisfaction,
     transparency,
     reputation,
     cooperation,
     teachersTitle,
     teachers[]->,
     testimonialsTitle,
     testimonials[]->,
     SEOTitle,
     SEODescription,
     SEOImage,
     SEOURL,
     twitterCreatorId,
     SEOKeywords[],
     googleSiteVerificationId
  }`;
  const aboutData = await client.fetch(homeQuery);
  return {
    props: {
      ...aboutData,
    },
    revalidate: 5*60
    // 5 minutes
  };
}
