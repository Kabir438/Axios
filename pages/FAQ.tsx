import { styled } from '@mui/material/styles';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
import { Page } from '../src/components';
import { Accordion, AccordionDetails, AccordionSummary, Typography } from '@mui/material';
import client from '../src/utils/sanity';
import chevronDown from '@iconify/icons-carbon/chevron-down';
import { Icon } from '@iconify/react';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
}));

const data = [
  {
    question: 'Question1',
    answer: 'Answer1 Answer1 Answer1 Answer1',
  },
  {
    question: 'Question2',
    answer: 'Answer2 Answer2 Answer2 Answer2',
  },
  {
    question: 'Question3',
    answer: 'Answer3 Answer3 Answer3 Answer3',
  },
];

export default function FAQ(props: any) {
  return (
    <Page title="FAQ | Axios Career Academy">
      <RootStyle>
        <Typography variant="h1" mt={10} mb={1.5} textAlign={'center'}>
          {props.title}
        </Typography>
        <div>
          {data.map(({ question, answer }, i) => (
            <Accordion key={`accordion-${i}`} sx={{
                width: '40rem'
            }}>
              <AccordionSummary
                expandIcon={<Icon icon={chevronDown} />}
                aria-controls="panel2a-content"
                id="panel2a-header"
              >
                <Typography>{question}</Typography>
              </AccordionSummary>
              <AccordionDetails>
                <Typography>{answer}</Typography>
              </AccordionDetails>
            </Accordion>
          ))}
        </div>
      </RootStyle>
    </Page>
  );
}

export async function getStaticProps() {
  const FAQQuery = `*[_type == "FAQPage"][0] {
        SEOTitle,
        SEODescription,
        SEOImage,
        SEOURL,
        twitterCreatorId,
        SEOKeywords[],
        googleSiteVerificationId,
        pageHeading,
        FAQItems[]->{
            FAQDescription,
            FAQItemAnswer,
            FAQItemQuestion
        }
    }`;
  const FAQData = await client.fetch(FAQQuery);
  return {
    props: {
      ...FAQData,
    },
    revalidate: 5 * 60,
    // 5 minutes
  };
}
