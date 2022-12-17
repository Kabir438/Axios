import { memo } from 'react';
// next
import NextLink from 'next/link';
// @mui
import { Box, BoxProps, Typography } from '@mui/material';
import useMediaQuery from "@mui/material/useMediaQuery";

// ----------------------------------------------------------------------

interface LogoProps extends BoxProps {
  onDark?: boolean;
  isSimple?: boolean;
  columnResponsive?: boolean;
}


function Logo({ columnResponsive, sx }: LogoProps) {
  const smallText = useMediaQuery('(max-width:413px)');
  const smallerText = useMediaQuery('(max-width:380px)');
  const noText = useMediaQuery('(max-width:340px)');

  // const PRIMARY_MAIN = theme.palette.primary.main;
  // const LIGHT_COLOR = theme.palette.common.white;
  // const DARK_COLOR = theme.palette.grey[800];

  return (
    <NextLink href="/" passHref>
      <Box
        sx={{
          width: "max-content",
          lineHeight: 0,
          cursor: 'pointer',
          flexDirection: columnResponsive ? "column" : "row",
          display: 'inline-flex',
          ...sx,
        }}
      >
        <img
          src={`/logo.png`}
          alt={`logo`}
          width={223/5}
          height={255/5}
          style={{
            marginRight: "10px"
          }}
        />
        <Typography variant="h3" alignItems={'center'} style={{
          fontSize: (smallText ? (smallerText ? "1rem" : "1.25rem") : "1.5rem"),
          display: columnResponsive ? "flex" : (noText ? "none" : "flex"),
        }}>{`Axios Career Academy`}</Typography>
      </Box>
    </NextLink>
  );
}

export default memo(Logo);
