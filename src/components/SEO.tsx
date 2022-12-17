import Head from 'next/head';

export default function SEO({
  title,
  description,
  imageURL,
  twitterCreatorId,
  keywords,
  googleSiteVerificationId
}: {
  title?: string;
  description?: string;
  imageURL?: string;
  twitterCreatorId?: string;
  keywords?: string[];
  googleSiteVerificationId?: string;
}) {
  return (
    <Head>
      <meta name="keywords" content={keywords && keywords.map(i => i.trim()).join(", ")}/>
      <meta name="description" content={description} />
      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {/* <meta property="og:image" content={!imageURL ? undefined : imageURL} /> */}
      <meta property="og:url" content="https://axioscareeracademy.com" />
      <meta property="og:type" content="website" />
      <meta property="og:locale" content="en_US" />
      <meta property="og:site_name" content="Axios Career Academy" />
      {/* Twitter */}
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      {/* <meta name="twitter:image" content={!imageURL ? undefined : imageURL} /> */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:creator" content={twitterCreatorId} />
      <meta name="twitter:site:id" content={twitterCreatorId} />
      {/* Google Verification */}
      <meta name="google-site-verification" content={googleSiteVerificationId} />
    </Head>
  );
}
