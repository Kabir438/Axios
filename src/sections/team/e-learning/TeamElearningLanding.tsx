// @mui
import { styled } from '@mui/material/styles';
import { Typography, Container, Stack, Box } from '@mui/material';
//
import TeamElearningMember from './TeamElearningMember';
import { teacher } from '../../../../pages';

// ----------------------------------------------------------------------

const RootStyle = styled('div')(({ theme }) => ({
  textAlign: 'center',
  padding: theme.spacing(8, 0),
  [theme.breakpoints.up('md')]: {
    padding: theme.spacing(15, 0),
  },
}));

// ----------------------------------------------------------------------

type Props = {
  members: teacher[];
  teachersTitle: string;
  teachersBody: string;
  
};

export default function TeamElearningLanding({ members, teachersTitle, teachersBody }: Props) {
  return (
    <RootStyle>
      <Container>
        <Stack spacing={3} sx={{ maxWidth: 480, mx: 'auto' }}>
          <Typography variant="h2">{teachersTitle}</Typography>
          <Typography sx={{ color: 'text.secondary' }}>
            {teachersBody}
          </Typography>
        </Stack>

        <Box
          sx={{
            py: { xs: 8, md: 10 },
            display: 'grid',
            gap: { xs: 4, md: 3 },
            gridTemplateColumns: {
              xs: 'repeat(1, 1fr)',
              sm: 'repeat(2, 1fr)',
              md: 'repeat(4, 1fr)',
            },
          }}
        >
          {members.map((member, index) => (
            <TeamElearningMember key={`member-${index}`} member={member} />
          ))}
        </Box>
      </Container>
    </RootStyle>
  );
}
