import { styled } from '@mui/material/styles';
import { HEADER_MOBILE_HEIGHT, HEADER_DESKTOP_HEIGHT } from '../src/config';
import { Page } from '../src/components';
import { Stack, Typography } from '@mui/material';
import client, { urlFor } from '../src/utils/sanity';
import chevronDown from '@iconify/icons-carbon/chevron-down';
import { Icon } from '@iconify/react';
import { ReactElement, useState } from 'react';
import Layout from '../src/layouts';
import SEO from '../src/components/SEO';
import { Accordion, AccordionSummary, AccordionDetails } from '../src/components/Accordion';

const RootStyle = styled('div')(({ theme }) => ({
  paddingTop: HEADER_MOBILE_HEIGHT,
  display: 'flex',
  flexDirection: 'column',
  justifyContent: 'start',
  alignItems: 'center',
  [theme.breakpoints.up('md')]: {
    paddingTop: HEADER_DESKTOP_HEIGHT,
  },
  minHeight: '100vh',
  height: 'max-content',
  gap: '4rem',
  paddingBottom: "5rem"
}));

type FAQItems = {
  FAQDescription: string;
  FAQItemAnswer: string;
  FAQItemQuestion: string;
}[]

export default function FAQ(props: any) {
  const [expanded, setExpanded] = useState<string | false>(false);
  console.log(props)
  const handleChange = (panel: string) => (event: React.SyntheticEvent, isExpanded: boolean) => {
    setExpanded(isExpanded ? panel : false);
  };
  return (
    <Page title="FAQ | Axios Career Academy">
      <SEO
        {
          ...{
            title: props.SEOTitle,
            description: props.SEODescription,
            imageURL: urlFor(props.SEOImage),
            url: props.SEOURL,
            twitterCreatorId: props.twitterCreatorId,
            keywords: props.SEOKeywords,
            googleSiteVerificationId: props.googleSiteVerificationId
          }
        }
      />
      <RootStyle>
        <Typography variant="h1" mt={10} mb={1.5} textAlign={'center'}>
          {props.pageHeading}
        </Typography>
        <Stack sx={{
          padding: "0px",
          display: 'flex',
          flexDirection: 'column',
        }}>
          {(props.FAQItems as FAQItems).map(({ FAQItemQuestion: question, FAQItemAnswer: answer, FAQDescription }, i) => (
            <Accordion id={`${FAQDescription.replaceAll(" ", "_")}${i}`} key={`accordion-${i}`} expanded={expanded === `panel${i}`} className={expanded === `panel${i - 1}` ? 'next' : ''} onChange={handleChange(`panel${i}`)} sx={{
                width: '40rem',
                maxWidth: '80vw'
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
        </Stack>
      </RootStyle>
    </Page>
  );
}

export async function getStaticProps() {
  const FAQQuery = `*[_type == "FAQPage"][0] {
        pageHeading,
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

FAQ.getLayout = function getLayout(page: ReactElement) {
  return <Layout>{page}</Layout>;
};