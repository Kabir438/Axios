import { useState, ReactElement, useEffect, useMemo } from 'react';
// icons
import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { styled } from '@mui/material/styles';
import { Container, Stack, Typography, Button, Box } from '@mui/material';
// config
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT, DRAWER_WIDTH } from '../src/config';
// layouts
import Layout from '../src/layouts';
// components
import { Page, ErrorScreen, Iconify } from '../src/components';
// sections
import { ElearningCourseList, ElearningCourseBarFilters } from '../src/sections/@e-learning';
// search
import Fuse from "fuse.js"
import client, { urlFor } from '../src/utils/sanity';
import { CourseProps } from '../src/@types/e-learning';
import SEO from '../src/components/SEO';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

// ----------------------------------------------------------------------

export default function ElearningCoursesPage(props: any) {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [ search, setSearch ] = useState("");
  const [courses] = useState(props.courses);
  const [ courseDisplay, setCourseDisplay ] = useState<CourseProps[]>(courses);

  const fuse = useMemo(() => new Fuse(courses, {
    keys: [
      "title",
      "description",
    ]
  }), [courses]);

  useEffect(() => {
    if(search.trim()) {
      const searchResult = fuse.search(search.trimStart());
      const temp: any = searchResult.map((i) => i.item)
      setCourseDisplay(temp);
    } else {
      setCourseDisplay(courses);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search])

  const handleMobileOpen = () => {
    setMobileOpen(true);
  };

  const handleMobileClose = () => {
    setMobileOpen(false);
  };

  if (!props.courses) {
    return <ErrorScreen />;
  }

  return (
    <Page title="Courses | Axios Career Academy">
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
        <Container>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            sx={{
              my: 5,
              mb: { md: 8 },
            }}
          >
            <Typography variant="h2">{props.coursesTitle}</Typography>

            <Button
              color="inherit"
              variant="contained"
              startIcon={<Iconify icon={searchIcon} sx={{ width: 18, height: 18 }} />}
              onClick={handleMobileOpen}
              sx={{
                display: { md: 'none' },
              }}
            >
              Search
            </Button>
          </Stack>

          <Stack direction={{ xs: 'column', md: 'row' }}>
            <ElearningCourseBarFilters search={search} setSearch={setSearch} mobileOpen={mobileOpen} onMobileClose={handleMobileClose} />

            <Box
              sx={{
                flexGrow: 1,
                pl: { md: 8 },
                width: { md: `calc(100% - ${DRAWER_WIDTH}px)` },
              }}
            >
              <ElearningCourseList 
                courses={courseDisplay}
                // courses={courses}
                loading={false} />
            </Box>
          </Stack>
        </Container>
      </RootStyle>
    </Page>
  );
}

// ----------------------------------------------------------------------

ElearningCoursesPage.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};

export async function getStaticProps() {
  const coursesQuery = `*[_type == "coursesPage"][0] {
    coursesTitle,
    courses[]->{
      image,
      description,
      title,
      teachers[]->,
    },
    SEOTitle,
    SEODescription,
    SEOImage,
    SEOURL,
    twitterCreatorId,
    SEOKeywords[],
    googleSiteVerificationId
  }`;
  const coursesData = await client.fetch(coursesQuery);
  return {
    props: {
      ...coursesData,
    },
    revalidate: 5*60
    // 5 minutes
  };
}