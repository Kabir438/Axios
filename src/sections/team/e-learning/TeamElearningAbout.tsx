// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Box } from '@mui/material';
//
import TeamElearningMember from './TeamElearningMember';
import { teacher } from '../../../../pages';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  members: teacher[];
  teachersTitle: string;
};

export default function TeamElearningAbout({ members, teachersTitle }: Props) {
  return (
    <RootStyle>
      <Container>
        <Typography
          variant="h2"
          sx={{
            textAlign: 'center',
            mb: { xs: 8, md: 10 },
          }}
        >
          {teachersTitle}
        </Typography>

        <Box
          sx={{
            display: 'grid',
            rowGap: { xs: 4, md: 5 },
            columnGap: 3,
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {members.map((member) => (
            <TeamElearningMember key={member._id} member={member} />
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
