// next
// @mui
import { useTheme } from '@mui/material/styles';
import { Box, Stack, AppBar, Container } from '@mui/material';
// hooks
import { useOffSetTop, useResponsive, useSettings } from '../../hooks';
// routes
// config
import { HEADER_DESKTOP_HEIGHT } from '../../config';
import darkMode from "@iconify/icons-carbon/moon"
import lightMode from "@iconify/icons-carbon/sunny"
// components
import { Logo } from '../../components';
import { Iconify } from '../../components';
import { IconButtonAnimate } from '../../components/animate';
//
import { NavMobile, NavDesktop, navConfig } from '../nav';
import { ToolbarStyle, ToolbarShadowStyle } from './HeaderToolbarStyle';

// ----------------------------------------------------------------------

type Props = {
  transparent?: boolean;
};

export default function Header({ transparent }: Props) {
  const theme = useTheme();

  const { onToggleMode } = useSettings();

  const isDesktop = useResponsive('up', 'md');

  const isLight = theme.palette.mode === 'light';

  const isScrolling = useOffSetTop(HEADER_DESKTOP_HEIGHT);

  return (
    <AppBar sx={{ boxShadow: 0, bgcolor: 'transparent' }}>
      <ToolbarStyle disableGutters transparent={transparent} scrolling={isScrolling}>
        <Container
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
        >
          <Box sx={{ lineHeight: 0, position: 'relative' }}>
            <Logo onDark={transparent && !isScrolling} />
          </Box>

          {isDesktop && (
            <NavDesktop
              isScrolling={isScrolling}
              isTransparent={transparent}
              navConfig={navConfig}
            />
          )}

          <Box sx={{ flexGrow: 1 }} />

          <Stack spacing={2} direction="row" alignItems="center">
            <IconButtonAnimate color="inherit" sx={{
                ...(isScrolling && { color: 'text.primary' }),
              }}
                onClick={onToggleMode}
              >
              <Iconify icon={isLight ? lightMode : darkMode} sx={{ width: 20, height: 20 }} />
            </IconButtonAnimate>
          </Stack>

          {!isDesktop && (
            <NavMobile
              navConfig={navConfig}
              sx={{
                ml: 1,
                ...(isScrolling && { color: 'text.primary' }),
              }}
            />
          )}
        </Container>
      </ToolbarStyle>

      {isScrolling && <ToolbarShadowStyle />}
    </AppBar>
  );
}
