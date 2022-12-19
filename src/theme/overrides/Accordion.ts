import { Theme } from '@mui/material/styles';

// ----------------------------------------------------------------------

export default function AccordionStyles(theme: Theme) {
  return {
    MuiAccordion: {
      styleOverrides: {
        root: {
          borderRadius: '0 !important',
          backgroundColor: 'transparent',

          '&:last-of-type': {
            borderBottom: `solid 1px ${theme.palette.divider}`,
            '&.Mui-expanded': {
              borderBottom: `solid 1px ${theme.palette.secondary.dark}`,
            },
          },
          '&.Mui-expanded': {
            margin: 0,
            color: theme.palette.secondary.light,
            'svg': {
              color: theme.palette.primary.light
            },
            '&:before': {
              backgroundColor: theme.palette.divider,
              opacity: 1
            }
          },
          '&.next': {
            '&:before': {
              backgroundColor: theme.palette.secondary.dark,
            }
          },
          '&.Mui-disabled': {
            backgroundColor: 'transparent',
          },
          '&:before': {
            backgroundColor: theme.palette.divider,
          }
        },
      },
    },
    MuiAccordionDetails: {
      styleOverrides: {
        root: {
          padding: theme.spacing(0, 0, 2.5, 0),
        },
        content: {
          transition: '0.25s all linear',
        }
      },
    },
    MuiAccordionSummary: {
      styleOverrides: {
        root: {
          padding: 0,
          '&.Mui-disabled': {
            opacity: 1,
            color: theme.palette.action.disabled,
          },
          '&.Mui-expanded': {
            color: theme.palette.primary.light,
          }
        },
        content: {
          alignItems: 'center',
          transition: '0.25s all linear',
          margin: theme.spacing(2.5, 0),
        },
      },
    },
  };
}
