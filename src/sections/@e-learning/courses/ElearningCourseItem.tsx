// next
import NextLink from 'next/link';
// @mui
import { Stack, Card, Box, Typography, Avatar, AvatarGroup, Tooltip } from '@mui/material';
// @types
import { CourseProps } from '../../../@types/e-learning';
// components
import {
  Image,
  TextMaxLine,
} from '../../../components';
// search
import Fuse from "fuse.js";
import { urlFor } from '../../../utils/sanity';

// ----------------------------------------------------------------------

type Props = {
  course: CourseProps;
  vertical?: boolean;
  match?: readonly Fuse.FuseResultMatch[] | undefined;
};

export default function ElearningCourseItem({ course, vertical }: Props) {
  const {
    title,
    teachers,
    image,
    description,
  } = course;
  return (
    <Card
      sx={{
        display: { sm: 'flex' },
        boxShadow: (theme) => theme.customShadows.z16,
        '&:hover': {
          boxShadow: (theme) => theme.customShadows.z24,
        },
        ...(vertical && {
          flexDirection: 'column',
        }),
      }}
    >
      <Box sx={{ flexShrink: { sm: 0 } }}>
        <Image
          alt={title}
          src={
            urlFor(image)
          }
          sx={{
            height: 1,
            objectFit: 'cover',
            width: { sm: 240 },
            ...(vertical && {
              width: { sm: 1 },
            }),
          }}
        />
      </Box>

      <Stack spacing={3} sx={{ p: 3 }}>
        <Stack
          spacing={{
            xs: 3,
            sm: vertical ? 3 : 1,
          }}
        >

          <Stack spacing={1}>
            <NextLink
              passHref
              href={"/contact-us"}
            >
              <TextMaxLine variant="h4" line={1} asLink>
                {title}
              </TextMaxLine>
            </NextLink>
            <Typography variant="body1">
              {description}
            </Typography>
          </Stack>
          <Stack direction="row" sx={{
            alignItems: "center"
          }}>
            <Typography mr={1.5}>
              Taught By:
            </Typography>
            <AvatarGroup max={4}>
              {
                teachers.map((teacher, index) => (
                  teachers.length !== 1
                  ?
                  <Tooltip title={teacher.name} key={`teacher-${index}`}>
                      <Avatar
                        src={urlFor(teacher.image)}
                        alt={teacher.name}
                      />
                  </Tooltip>
                  :
                  <Avatar
                    key={`teacher-${index}`}
                    src={urlFor(teacher.image)}
                    alt={teacher.name}
                    sx={{
                      mr: "5px"
                    }}
                  />
                ))
              }
            </AvatarGroup>
            {teachers.length === 1 && <Typography>{teachers[0].name}</Typography>}
          </Stack>
        </Stack>

      </Stack>
    </Card>
  );
}
