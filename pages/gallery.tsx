import { ReactElement } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// layouts
import Layout from '../src/layouts';
// components
import { Page } from '../src/components';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { Image } from '../src/components';
import client, { urlFor } from '../src/utils/sanity';

// ----------------------------------------------------------------------

/*
2,2, index=1
index=2
index=3
2,2, index=4
index=5
index=6
2,2, index=7
index=8
index=9
2,2, index=10
index=11
index=12
*/

// const itemData = [
//   {
//     img: 'https://images.unsplash.com/photo-1551963831-b3b1ca40c98e',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1551782450-a2132b4ba21d',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1522770179533-24471fcdba45',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1444418776041-9c7e33cc5a9c',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1533827432537-70133748f5c8',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1558642452-9d2a7deb7f62',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1516802273409-68526ee1bdd6',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1518756131217-31eb79b20e8f',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1597645587822-e99fa5d45d25',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1567306301408-9b74779a11af',
//     rows: 2,
//     cols: 2,
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1471357674240-e1a485acb3e1',
//   },
//   {
//     img: 'https://images.unsplash.com/photo-1589118949245-7d38baf380d6',
//     rows: 2,
//     cols: 2,
//   },
// ];

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningContactUsPage(props: any) {
  return (
    <Page title="Contact Us - E-Learning">
      <RootStyle>
        {props.galleryPageSections.map((galleryPageSection: any) => (
          <>
            <Typography variant="h1" mt={10} mb={1.5} textAlign={'center'}>
              {galleryPageSection.gallerySectionTitle}
            </Typography>
            <ImageList
              variant="masonry"
              sx={{
                width: '80%',
              }}
            >
              {
                galleryPageSection
              .gallerySectionImages
                .map((item: any, index: any) => (
                  <ImageListItem
                    key={`image-list-${0}-item-${index}`}
                  >
                    <Image
                      sx={{
                        borderRadius: '15px',
                        objectFit: "contain"
                      }}
                      src={
                        urlFor(item)
                      }
                      alt={'an image'}
                    />
                  </ImageListItem>
                ))}
            </ImageList>
          </>
        ))}
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningContactUsPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const galleryQuery = `*[_type == "galleryPage"][0] {
      galleryPageTitle,
      galleryPageSections[]->
    }`;
  const galleryData = await client.fetch(galleryQuery);
  return {
    props: {
      ...galleryData,
    },
    revalidate: 5*600
    // 5 minutes
  };
}