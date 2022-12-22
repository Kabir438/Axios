import { useState, useEffect } from 'react';
// icons
import menuIcon from '@iconify/icons-carbon/menu';
// next
import NextLink from 'next/link';
import { useRouter } from 'next/router';
// @mui
import { alpha, styled } from '@mui/material/styles';
import {
  Box,
  List,
  Drawer,
  ListItemText,
  ListItemButton,
  ListItemButtonProps,
} from '@mui/material';
// config
import { DRAWER_WIDTH } from '../../config';
// @types
import { NavProps, NavItemMobileProps } from '../../@types/layout';
// components
import { Logo, Scrollbar, Iconify } from '../../components';
import { IconButtonAnimate } from '../../components/animate';

// ----------------------------------------------------------------------

interface RootLinkStyleProps extends ListItemButtonProps {
  active?: boolean;
}

const RootLinkStyle = styled(ListItemButton, {
  shouldForwardProp: (prop) => prop !== 'active',
})<RootLinkStyleProps>(({ active, theme, selected }) => ({
  ...theme.typography.body2,
  height: 48,
  textTransform: 'capitalize',
  paddingLeft: theme.spacing(2.5),
  paddingRight: theme.spacing(2.5),
  color: theme.palette.text.primary,
  ...(active && {
    color: theme.palette.secondary.light,
    fontWeight: theme.typography.fontWeightMedium,
    backgroundColor: alpha(theme.palette.primary.dark, theme.palette.action.selectedOpacity*1.75),
  }),
  ...(selected && {
    color: theme.palette.primary.dark,
  }),
}));

// ----------------------------------------------------------------------

export default function NavMobile({ navConfig, sx }: NavProps) {
  const { pathname } = useRouter();
  const [drawerOpen, setDrawerOpen] = useState(false);
  // const [drawerOpen, setDrawerOpen] = useState(true);

  useEffect(() => {
    if (drawerOpen) {
      handleDrawerClose();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [pathname]);

  const handleDrawerOpen = () => {
    setDrawerOpen(true);
  };

  const handleDrawerClose = () => {
    setDrawerOpen(false);
  };

  return (
    <>
      <IconButtonAnimate color="inherit" onClick={handleDrawerOpen} sx={sx}>
        <Iconify icon={menuIcon} />
      </IconButtonAnimate>
      <Drawer
        open={drawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: { width: DRAWER_WIDTH, maxWidth: "80vw" },
        }}
      >
        <Scrollbar>
          <Box sx={{ px: 2.5, py: 3, lineHeight: 0 }}>
            <Logo columnResponsive />
          </Box>

          <List sx={{ px: 0 }}>
            {navConfig.map((link) => (
              <NavItemMobile key={link.title} item={link} />
            ))}
          </List>
        </Scrollbar>
      </Drawer>
    </>
  );
}

// ----------------------------------------------------------------------

function NavItemMobile({ item }: NavItemMobileProps) {
  const { pathname } = useRouter();

  const { title, path } = item;
  const isActiveRoot = pathname === path;
  return (
    <NextLink key={title} href={path} passHref>
      <RootLinkStyle active={isActiveRoot}>
        <ListItemText disableTypography primary={title} />
      </RootLinkStyle>
    </NextLink>
  );
}
