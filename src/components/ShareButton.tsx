import { useState } from 'react';
//icon
import shareIcon from '@iconify/icons-carbon/share';
import logoLinkedin from '@iconify/icons-carbon/logo-linkedin';
import logoFacebook from '@iconify/icons-carbon/logo-facebook';
import logoTwitter from '@iconify/icons-carbon/logo-twitter';
import logoInstagram from '@iconify/icons-carbon/logo-instagram';
// @mui
import { MenuItem, SxProps, Popover } from '@mui/material';
// components
import { Iconify } from './';
import { IconButtonAnimate } from './animate';
import { SocialLinks } from '../@types/socials';
import { useRouter } from 'next/router';

// ----------------------------------------------------------------------

type LanguagePopoverProps = {
  sx?: SxProps;
  links: SocialLinks;
};

export default function ShareButton({ sx, links }: LanguagePopoverProps) {
  const [open, setOpen] = useState<HTMLElement | null>(null);
  const router = useRouter()

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setOpen(event.currentTarget);
  };

  // eslint-disable-next-line @typescript-eslint/ban-types
  const handleClose = (link?: string | {} | undefined) => {
    setOpen(null);
    if(link) {
      router.push(link)
    }
  };

  const SOCIALS = [
    {
      name: 'FaceBook',
      icon: logoFacebook,
      socialColor: '#1877F2',
    },
    {
      name: 'Instagram',
      icon: logoInstagram,
      socialColor: '#E02D69',
    },
    {
      name: 'Linkedin',
      icon: logoLinkedin,
      socialColor: '#007EBB',
    },
    {
      name: 'Twitter',
      icon: logoTwitter,
      socialColor: '#00AAEC',
    },
  ].map(i => {
    const name = i.name.toLowerCase() as 'twitter' | 'linkedin' | 'instagram' | 'facebook';
    const link = links[name];
    return {
      link,
      ...i
    }
  });

  return (
    <>
      <IconButtonAnimate
        onClick={handleOpen}
        sx={{
          ...(open && {
            color: 'primary.main',
          }),
          ...sx,
        }}
      >
        <Iconify icon={shareIcon} sx={{ width: 20, height: 20 }} />
      </IconButtonAnimate>

      <Popover
        open={Boolean(open)}
        onClose={handleClose}
        anchorEl={open}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        transformOrigin={{ vertical: 'top', horizontal: 'center' }}
        PaperProps={{
          sx: { width: 220, p: 1 },
        }}
      >
        {SOCIALS.map((option) => (
          <MenuItem key={option.name} onClick={() => handleClose(option.link)} sx={{ typography: 'body3' }}>
            <Iconify
              icon={option.icon}
              sx={{ width: 24, height: 24, mr: 2, color: option.socialColor }}
            />
            Share via {option.name}
          </MenuItem>
        ))}
      </Popover>
    </>
  );
}
