// @mui
import { Stack } from '@mui/material';
// Items
import ElearningCourseItem from './ElearningCourseItem';
// search
import { CourseProps } from '../../../@types/e-learning';

// ----------------------------------------------------------------------

type Props = {
  courses: CourseProps[];
  loading?: boolean;
};

export default function ElearningCourseList({ courses }: Props) {
  console.log(courses)
  return (
    <>
      <Stack spacing={4} mb={5}>
        {
          courses.map((course, index) => (
              <div key={`course-${index}`}>
                <ElearningCourseItem course={course} />
              </div>
            ))
        }
      </Stack>
    </>
  );
}