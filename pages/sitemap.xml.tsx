import { GetServerSideProps } from "next"

function generateSiteMap() {
  return `<?xml version="1.0" encoding="UTF-8"?>
   <urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
     <url>
       <loc>https://axioscareeracademy.com</loc>
     </url>
     <url>
       <loc>https://axioscareeracademy.com/about-us</loc>
     </url>
     <url>
       <loc>https://axioscareeracademy.com/contact-us</loc>
     </url>
     <url>
       <loc>https://axioscareeracademy.com/courses</loc>
     </url>
     <url>
       <loc>https://axioscareeracademy.com/gallery</loc>
     </url>
   </urlset>
 `;
}

export default function SiteMap() {
  return 
};

export const getServerSideProps: GetServerSideProps = async ({ res }) => {
  const sitemap = generateSiteMap();
  res.setHeader('Content-Type', 'text/xml');
  res.write(sitemap);
  res.end();
  return {
    props: {}
  }
}