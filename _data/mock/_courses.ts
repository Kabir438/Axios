import _mock from './_mock';

// ----------------------------------------------------------------------


export const _courses = [...Array(12)].map((_, index) => ({
  id: _mock.id(index),
  slug: _mock.text.courseTitle(index),
  coverImg: _mock.image.course(index),
  description: _mock.text.description(index),
  teacher: "Pratik Sanone",
  teacherAvatar: _mock.image.avatar(index)
}));
