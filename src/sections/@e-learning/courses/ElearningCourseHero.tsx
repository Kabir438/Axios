// icons
// @mui
import { styled } from '@mui/material/styles';
import { Typography, Stack, Container, Grid, Avatar, Link } from '@mui/material';
// routes
import Routes from '../../../routes';
// utils
// @types
import { CourseProps } from '../../../@types/e-learning';
// _data
import _mock from '../../../../_data/mock';
// components
import { PlayerWithImage } from '../../../components/player';
import { Breadcrumbs, TextIconLabel } from '../../../components';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: theme.spacing(5),
  paddingBottom: theme.spacing(10),
  backgroundColor: theme.palette.background.neutral,
}));

// ----------------------------------------------------------------------

type Props = {
  course: CourseProps;
};

export default function ElearningCourseHero({ course }: Props) {
  const {
    slug,
    coverImg,
    description,
    teacher,
  } = course;

  return (
    <RootStyle>
      <Container>
        <Breadcrumbs
          links={[
            { name: 'Home', href: '/' },
            { name: 'Courses', href: Routes.courses },
            { name: course.slug || '' },
          ]}
          sx={{ mb: 8 }}
        />

        <Grid
          container
          rowSpacing={{ xs: 6, md: 0 }}
          columnSpacing={{ md: 10 }}
          direction="row-reverse"
        >
          <Grid item xs={12} md={5}>
            <PlayerWithImage imgPath={coverImg} videoPath={_mock.video} ratio="3/4" />
          </Grid>

          <Grid item xs={12} md={7}>
            <Stack spacing={3}>
              <Stack spacing={2} alignItems="flex-start">
                <Typography variant="h3" component="h1">
                  {slug}
                </Typography>
                <Typography sx={{ color: 'text.secondary' }}>{description}</Typography>
              </Stack>

              <TextIconLabel
                icon={<Avatar src={teacher} />}
                value={
                  <>
                    <Typography variant="body2" sx={{ ml: 1, mr: 0.5 }}>
                      {teacher}
                    </Typography>
                    {teacher?.length > 0 && (
                      <Link underline="always" color="text.secondary" variant="body2">
                        + {teacher?.length} teacher
                      </Link>
                    )}
                  </>
                }
              />

            </Stack>
          </Grid>
        </Grid>
      </Container>
    </RootStyle>
  );
}
