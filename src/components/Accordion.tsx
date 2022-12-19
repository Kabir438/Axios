import MuiAccordion, { AccordionProps } from '@mui/material/Accordion';
import MuiAccordionSummary, {
  AccordionSummaryProps,
} from '@mui/material/AccordionSummary';
import MuiAccordionDetails from '@mui/material/AccordionDetails';
import { styled } from '@mui/material/styles';
import { Icon } from '@iconify/react';
import chevronDown from "@iconify/icons-carbon/chevron-down";
import AccordionStyles from '../theme/overrides/Accordion';

export const Accordion = styled((props: AccordionProps) => (
  <MuiAccordion disableGutters elevation={0} square {...props} />
))(({ theme }) => AccordionStyles(theme).MuiAccordion.styleOverrides.root);

export const AccordionSummary = styled((props: AccordionSummaryProps) => (
  <MuiAccordionSummary
    expandIcon={<Icon icon={chevronDown} style={{ fontSize: '0.9rem' }} />}
    {...props}
  />
))(({ theme }) => (AccordionStyles(theme).MuiAccordionSummary.styleOverrides.root));

export const AccordionDetails = styled(MuiAccordionDetails)(({ theme }) => (AccordionStyles(theme).MuiAccordionDetails.styleOverrides.root));
