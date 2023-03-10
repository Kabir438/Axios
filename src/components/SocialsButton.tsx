// icons
import logoLinkedin from '@iconify/icons-carbon/logo-linkedin';
import logoFacebook from '@iconify/icons-carbon/logo-facebook';
import logoTwitter from '@iconify/icons-carbon/logo-twitter';
import logoInstagram from '@iconify/icons-carbon/logo-instagram';
// @mui
import { alpha } from '@mui/material/styles';
import { Stack, IconButton, Button, IconButtonProps, ButtonProps, Link } from '@mui/material';
// @types
import { SocialLinks } from '../@types/socials';
//
import Iconify from './Iconify';
import { IconifyIcon } from '@iconify/react';

// ----------------------------------------------------------------------

type Props = IconButtonProps & ButtonProps;

interface SocialsButtonProps extends Props {
  simple?: boolean;
  initialColor?: boolean;
  links?: SocialLinks;
}

export default function SocialsButton({
  initialColor = false,
  simple = true,
  links = {},
  sx,
  ...other
}: SocialsButtonProps) {
  const SOCIALS: {
    name: string;
    icon?: IconifyIcon;
    IconComponent?: () => JSX.Element;
    socialColor: string;
    path: string;
  }[] = [
    {
      name: 'FaceBook',
      icon: logoFacebook,
      socialColor: '#1877F2',
      path: links.facebook || 'https://www.facebook.com/axiosCA/',
    },
    {
      name: 'Instagram',
      icon: logoInstagram,
      socialColor: '#E02D69',
      path: links.instagram || 'https://www.instagram.com/axiosca/',
    },
    {
      name: 'Linkedin',
      icon: logoLinkedin,
      socialColor: '#007EBB',
      path: links.linkedin || '#linkedin-link',
    },
    {
      name: 'Twitter',
      icon: logoTwitter,
      socialColor: '#00AAEC',
      path: links.twitter || 'https://twitter.com/AxiosCA?t=2VYY8TxWCKmFOXgXrCiJIQ&s=09',
    },
    {
      name: 'Google Business',
      IconComponent: () => (
          <svg xmlns="http://www.w3.org/2000/svg" color='inherit' width="20" height="20">
            <path
              d="M10.496 1.998a.5.5 0 0 0-.074.006h-4.42c-.554 0-1.037.252-1.361.611-.324.36-.515.808-.625 1.272l-2 8.4a.5.5 0 0 0-.012.172.5.5 0 0 0-.002.045c0 1.445.759 2.784 1.996 3.51.001 0 .003 0 .004.002v13.488a.5.5 0 0 0 .5.5h24a.5.5 0 0 0 .5-.5V16.016l.002-.002a4.067 4.067 0 0 0 1.998-3.51.5.5 0 0 0-.002-.04.5.5 0 0 0 0-.003.5.5 0 0 0 0-.008.5.5 0 0 0-.012-.166l-2-8.4c-.11-.464-.3-.913-.625-1.272a1.836 1.836 0 0 0-1.361-.611h-4.42a.5.5 0 0 0-.09-.006.5.5 0 0 0-.07.006h-5.84a.5.5 0 0 0-.088-.006.5.5 0 0 0-.076.006H10.58a.5.5 0 0 0-.084-.006zM6.002 3.004h3.947l-.91 9H3.112l1.876-7.885c.082-.345.225-.645.395-.834a.754.754 0 0 1 .619-.281zm4.953 0h5.047v9h-5.955l.908-9zm6.047 0h5.047l.908 9h-5.955v-9zm6.053 0h3.947c.277 0 .447.093.617.281.17.189.314.49.397.834l1.877 7.885h-5.928l-.91-9zm-19.922 10H8.869c-.152.884-.594 1.693-1.371 2.148a2.948 2.948 0 0 1-2.994 0c-.777-.455-1.219-1.264-1.371-2.148zm7 0H15.869c-.152.884-.594 1.693-1.371 2.148a2.948 2.948 0 0 1-2.994 0c-.777-.455-1.219-1.264-1.371-2.148zm7 0H22.869c-.152.884-.594 1.693-1.371 2.148a2.948 2.948 0 0 1-2.994 0c-.777-.455-1.219-1.264-1.371-2.148zm7 0H29.869c-.152.884-.594 1.693-1.371 2.148a2.948 2.948 0 0 1-2.994 0c-.777-.455-1.219-1.264-1.371-2.148zM9.5 14.457c.345.636.856 1.18 1.498 1.557a3.957 3.957 0 0 0 4.006 0 4.028 4.028 0 0 0 1.496-1.557c.345.636.856 1.18 1.498 1.557a3.957 3.957 0 0 0 4.006 0 4.028 4.028 0 0 0 1.496-1.557c.345.636.856 1.18 1.498 1.557.92.54 2 .676 3.004.414v12.576h-23V16.428a3.954 3.954 0 0 0 3.002-.414A4.028 4.028 0 0 0 9.5 14.457zm13.592 6.547a3.018 3.018 0 0 0-2.213.877 3.006 3.006 0 0 0-.477 3.623 3.004 3.004 0 0 0 3.375 1.396 3.003 3.003 0 0 0 2.225-2.896.5.5 0 0 0-.5-.5h-2.5a.5.5 0 1 0 0 1h1.83c-.187.668-.616 1.245-1.312 1.432a1.996 1.996 0 0 1-2.25-.932 1.998 1.998 0 0 1 .316-2.416 1.998 1.998 0 0 1 2.416-.317.5.5 0 0 0 .5-.867 2.994 2.994 0 0 0-1.41-.4z"
              color={'inherit'}
              fontFamily="sans-serif"
              fontWeight="400"
              overflow="visible"
              stroke='currentColor'
              style={{
                lineHeight: 'normal',
                textIndent: '0',
                textAlign: 'start',
                textDecorationLine: 'none',
                textDecorationStyle: 'solid',
                textDecorationColor: '#000',
                textTransform: 'none',
                // blockProgression: "tb",
                whiteSpace: 'normal',
                isolation: 'auto',
                mixBlendMode: 'normal',
                transform: "scale(0.65)",
                // solidColor: "#000",
                // solidOpacity: "1"
              }}
            />
          </svg>
        ),
      socialColor: '#00AAEC',
      path: links.googleBusiness || 'https://g.co/kgs/rAsu45',
    },
  ];

  return (
    <Stack direction="row" flexWrap="wrap" alignItems="center">
      {SOCIALS.map((social, i) => {
        const { name, icon, path, socialColor, IconComponent } = social;
        if(name === 'Google Business' && links.googleBusiness === null) return <></>
        return simple ? (
          <Link key={`${name}-${i}`} target="_blank" href={path}>
            <IconButton
              color="inherit"
              sx={{
                ...(initialColor && {
                  color: socialColor,
                  '&:hover': {
                    bgcolor: alpha(socialColor, 0.08),
                  },
                }),
                ...sx,
              }}
              {...other}
            >
              {icon && <Iconify icon={icon} sx={{ width: 20, height: 20 }} />}
              {IconComponent && <IconComponent />}
            </IconButton>
          </Link>
        ) : (
          <Button
            key={name}
            href={path}
            color="inherit"
            variant="outlined"
            size="small"
            startIcon={icon ? <Iconify icon={icon} /> : IconComponent ? <IconComponent /> : <div />}
            sx={{
              m: 0.5,
              flexShrink: 0,
              ...(initialColor && {
                color: socialColor,
                borderColor: socialColor,
                '&:hover': {
                  borderColor: socialColor,
                  bgcolor: alpha(socialColor, 0.08),
                },
              }),
              ...sx,
            }}
            {...other}
          >
            {name}
          </Button>
        );
      })}
    </Stack>
  );
}
