import { ReactElement, useEffect, useState } from 'react';
// @mui
import { styled } from '@mui/material/styles';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
// layouts
import Layout from '../src/layouts';
// components
import { Page, Player } from '../src/components';
import { ImageList, ImageListItem, Typography } from '@mui/material';
import { Image } from '../src/components';
import client from '../src/utils/sanity';
import ReactPlayer from 'react-player';
import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-carbon/pause-filled';
import pauseIcon from '@iconify/icons-carbon/play-filled-alt';
import { useTheme } from '@emotion/react';

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
    <Page title="Gallery | Axios Career Academy">
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
              {galleryPageSection.gallerySectionImages.map((item: any, index: any) => {
                console.log(item, item._type === 'image');
                return (
                  <ImageListItem key={`image-list-${0}-item-${index}`}>
                    {item._type === 'image' ? (
                      <Image
                        sx={{
                          borderRadius: '15px',
                          objectFit: 'contain',
                        }}
                        src={item.asset.url}
                        alt={'an image'}
                      />
                    ) : (
                      <PlayerItem url={item.asset.url} />
                    )}
                  </ImageListItem>
                );
              })}
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
    galleryPageSections[]->{
      gallerySectionTitle,
      gallerySectionImages[]{
        _type,
        asset->{
          url
        },
      }
    }
  }`;
  const galleryData = await client.fetch(galleryQuery);
  return {
    props: {
      ...galleryData,
    },
    revalidate: 5 * 60,
    // 5 minutes
  };
}
const PlayerItem = ({ url }: { url: string }) => {
  const [play, setPlay] = useState(true);
  const theme = useTheme();
  console.log(theme)
  return (
    <div
      style={{
        position: 'relative',
      }}
      className="player-wrapper"
    >
      <Player
        style={{
          borderRadius: '15px',
          overflow: 'hidden',
        }}
        playing={play}
        muted
        loop
        url={url}
      />
      <div
        className='player-overlay'
        style={{
          position: 'absolute',
          width: '100%',
          height: '100%',
          top: 0,
          left: 0,
          placeItems: 'center',
          display: 'grid',
        }}
      >
        <button
          className='player-button'
          onClick={() => setPlay(!play)}
          style={{
            background: (theme as any)?.palette?.primary?.main,
            display: 'grid',
            placeItems: 'center',
            width: 'max-content',
            aspectRatio: '1 / 1',
            borderRadius: '10000px',
            padding: '0.75rem',
            border: "0px",
            cursor: "pointer",
            color: "white"
          }}
        >
          <Icon width={32} height={32} icon={!play ? pauseIcon : playIcon} />
        </button>
      </div>
    </div>
  );
};
