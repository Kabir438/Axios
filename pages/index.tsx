import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// @types
import { SanityImageSource } from '@sanity/image-url/lib/types/types';
// layouts
import Layout from '../src/layouts';
// components
import { Page, ErrorScreen } from '../src/components';
// sections
import { TeamElearningLanding } from '../src/sections/team';
import { TestimonialsElearning } from '../src/sections/testimonials';
import {
  ElearningLandingHero,
  ElearningLandingIntroduce,
  ElearningLandingFeaturedCourses,
  HighestAchievers
} from '../src/sections/@e-learning';
import client from '../src/utils/sanity';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

export type testimonial = {
  image: SanityImageSource;
  name: string;
  review: string;
  role: string;
  rating: 1 | 2 | 3 | 4 | 5;
  _createdAt: string;
  _id: string;
  _rev: string;
  _type: string;
  _updatedAt: string;
}

export type data = {
  homePageTitle: string;
  homePageSubtitle: string;
  homePageMainImage: SanityImageSource;
  homePageIllustrationGreenText: string;
  homePageIllustrationPurpleText: string;
  homePageIllustrationBlueText: string;
  homePageIllustrationYellowText: string;
  homePageIllustrationWhiteText: string;
  learners: string;
  numberOfCourses: string;
  graduates: string;
}

// ----------------------------------------------------------------------

export default function ElearningLandingPage(props: any) {
  if (!props.homePageTitle) {
    return <ErrorScreen />;
  }

  return (
    <Page title="Landing - E-Learning">
      <RootStyle>
        <ElearningLandingHero
          pageData={{
            homePageTitle: props.homePageTitle,
            homePageSubtitle: props.homePageSubtitle,
            homePageMainImage: props.homePageMainImage,
            homePageIllustrationGreenText: props.homePageIllustrationGreenText,
            homePageIllustrationPurpleText: props.homePageIllustrationPurpleText,
            homePageIllustrationBlueText: props.homePageIllustrationBlueText,
            homePageIllustrationYellowText: props.homePageIllustrationYellowText,
            homePageIllustrationWhiteText: props.homePageIllustrationWhiteText,
            learners: props.learners,
            numberOfCourses: props.numberOfCourses,
            graduates: props.graduates,
          }}
        />

        <ElearningLandingIntroduce
          data={{
            secondImage: props.secondImage,
            secondTitle: props.secondTitle,
            secondBody: props.secondBody,
            secondPointer1: props.secondPointer1,
            secondPointer2: props.secondPointer2,
          }}
        />

        <TeamElearningLanding
         teachersTitle={props.teachersTitle}
         teachersBody={props.teachersBody}
         members={props.teachers} />

        <HighestAchievers achievers={props.achievers} />

        <ElearningLandingFeaturedCourses coursesTitle={props.feauturedCoursesTitle} coursesSubtitle={props.feauturedCoursesSubtitle} courses={props.courses} />

        {props.testimonials && props.testimonialsTitle && <TestimonialsElearning title={props.testimonialsTitle} testimonials={props.testimonials} />}
      </RootStyle>
    </Page>
  );
}

export type teacher = {
  image: SanityImageSource
  name: string
  role: string
  degree: string;
  alumni: string
  facebookHandle: string | null;
  instagramHandle: string | null;
  linkedinHandle: string | null;
  twitterHandle: string | null;
  _id: string;
}

// ----------------------------------------------------------------------

ElearningLandingPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

// ----------------------------------------------------------------------

export async function getStaticProps() {
  const homeQuery = `*\[_type == "home"\][0] {
    title,
    homePageTitle,
    homePageSubtitle,
    homePageMainImage,
    homePageIllustrationGreenText,
    homePageIllustrationPurpleText,
    homePageIllustrationBlueText,
    homePageIllustrationYellowText,
    homePageIllustrationWhiteText,
    learners,
    numberOfCourses,
    graduates,
    secondImage,
    secondTitle,
    secondBody,
    secondPointer1,
    secondPointer2,
    teachersTitle,
    teachersBody,
    teachers[]->,
    achieversTitle,
    achievers[]->,
    feauturedCoursesTitle,
    feauturedCoursesSubtitle,
    courses[]->{
      _id,
      image,
      description,
      title,
      teachers[]->{
        name,
        image
      }
    },
    testimonialsTitle,
    testimonials[]->
  }`;
  const homeData = await client.fetch(homeQuery);
  return {
    props: {
      ...homeData
    },
  };
}
