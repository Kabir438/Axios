import _mock from './_mock';

// ----------------------------------------------------------------------

export const _achievers = [...Array(8)].map((_, index) => ({
  id: _mock.id(index),
  name: _mock.name.fullName(index),
  degree: "B.Tech Computer Science",
  university: "Harvard",
  avatar: _mock.image.avatar(index),
  title:
    'IBDP Star achiever',
}));
