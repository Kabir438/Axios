import searchIcon from '@iconify/icons-carbon/search';
// @mui
import { InputAdornment, FilledInput, FilledInputProps as TempFilledInputProps } from '@mui/material';
//
import Iconify from './Iconify';
import { ChangeEventHandler } from 'react';

// interface FilledInputProps extends TempFilledInputProps {
  // value: string;
  // handleChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
// }

interface Props extends TempFilledInputProps {
  value: string;
  onChange: ChangeEventHandler<HTMLTextAreaElement | HTMLInputElement>;
}

// ----------------------------------------------------------------------

export default function SearchInput({ sx, value, onChange, ...other }: Props) {
  return (
    <FilledInput
      value={value}
      onChange={onChange}
      fullWidth
      startAdornment={
        <InputAdornment position="start">
          <Iconify icon={searchIcon} sx={{ width: 24, height: 24, color: 'text.disabled' }} />
        </InputAdornment>
      }
      placeholder="Search..."
      sx={{
        '& .MuiFilledInput-input': { py: '18px' },
        ...sx,
      }}

      {...other}
    />
  );
}
