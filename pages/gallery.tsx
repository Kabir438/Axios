import { ReactElement, useState } from 'react';
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
import client, { urlFor } from '../src/utils/sanity';
import { Icon } from '@iconify/react';
import playIcon from '@iconify/icons-carbon/pause-filled';
import pauseIcon from '@iconify/icons-carbon/play-filled-alt';
import { useTheme } from '@emotion/react';
import SEO from '../src/components/SEO';

// ----------------------------------------------------------------------

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
              {galleryPageSection.gallerySectionImages.map((item: any, index: any) => (
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
    galleryPageSections[]->{
      gallerySectionTitle,
      gallerySectionImages[]{
        _type,
        asset->{
          url
        },
      }
    },
    SEOTitle,
    SEODescription,
    SEOImage,
    SEOURL,
    twitterCreatorId,
    SEOKeywords[],
    googleSiteVerificationId
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
