import React from 'react';
import GoogleMapReact from 'google-map-react';
// @mui
import { BoxProps, Box, SxProps } from '@mui/material';
import Marker from './Marker';

// ----------------------------------------------------------------------

interface Props extends BoxProps {
  sx?: SxProps;
  locations: {
    address: string;
    latitude: number;
    longitude: number;
    googleMapsLink: string;
  }[]
}

export default function ContactMap({ sx, locations, ...other }: Props) {
  return (
    <Box sx={{ height: 480, overflow: 'hidden', ...sx }} {...other}>
      <GoogleMapReact
        bootstrapURLKeys={{ key: "AIzaSyBqLfqHgU-hMDHhorIB_t7xPleMpT9scqo" as string }}
        center={{
          lat: locations[0].latitude,
          lng: locations[0].longitude
        }}
        zoom={12}
        options={{
          // styles: MapStyle,
          // disableDefaultUI: true,
        }}
      >
          {
            locations.map((location, index) => (
                <Marker
                  lat={location.latitude}
                  lng={location.longitude}
                  key={`location-${index}`}
                  title={location.address}
                  onOpen={() => {
                    window.open(location.googleMapsLink, "_blank")
                  }}
                />
            ))
          }
      </GoogleMapReact>
    </Box>
  );
}
