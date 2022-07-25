// @mui
import { Stack, Drawer, Box } from '@mui/material';
// config
import { DRAWER_WIDTH, HEADER_DESKTOP_HEIGHT } from '../../../config';
// @type
//
import { SearchInput } from '../../../components';
import { Dispatch, SetStateAction } from 'react';

// ----------------------------------------------------------------------

type Props = {
  mobileOpen: boolean;
  onMobileClose: VoidFunction;
  search: string;
  setSearch: Dispatch<SetStateAction<string>>
};

export default function ElearningCourseBarFilters({ mobileOpen, onMobileClose, search, setSearch }: Props) {
  const renderFilters = (
    <Stack spacing={2.5}>
      <SearchInput value={search} onChange={(e) => setSearch(e.target.value)} />
    </Stack>
  );

  return (
    <>
      {/* -- Desktop -- */}
      <Box
        sx={{
          width: DRAWER_WIDTH,
          flexShrink: 0,
          display: {
            xs: 'none',
            md: 'block',
          },
          top: { md: HEADER_DESKTOP_HEIGHT },
          position: { md: 'sticky' },
        }}
      >
        {renderFilters}
      </Box>

      {/* -- Mobile -- */}
      <Drawer
        anchor="right"
        open={mobileOpen}
        onClose={onMobileClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            pt: 5,
            px: 3,
            width: DRAWER_WIDTH,
          },
        }}
      >
        {renderFilters}
      </Drawer>
    </>
  );
}
