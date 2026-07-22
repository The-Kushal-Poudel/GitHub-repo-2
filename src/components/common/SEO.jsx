import { Helmet } from 'react-helmet-async';
import PropTypes from 'prop-types';

export default function SEO({ title, description, keywords, type, url, image, schema }) {
  const siteName = "Kushal Poudel Portfolio";
  const defaultTitle = "Kushal Poudel | Backend Java & Laravel Developer";
  const defaultDescription = "Portfolio of Kushal Poudel, a backend Java and full-stack Laravel developer from Kathmandu building clean, fast web applications with PHP, SQL, React, and Tailwind CSS.";
  const defaultImage = "https://thekushalpoudel.com.np/images/og-image.jpg";
  const defaultUrl = "https://thekushalpoudel.com.np/";
  const defaultKeywords = "Kushal Poudel, Backend Java Developer, Laravel Developer, PHP Developer, React Developer, Kathmandu Developer";

  const seo = {
    title: title ? `${title} | ${siteName}` : defaultTitle,
    description: description || defaultDescription,
    image: image ? (image.startsWith('http') ? image : `https://thekushalpoudel.com.np${image}`) : defaultImage,
    url: url ? `https://thekushalpoudel.com.np${url}` : defaultUrl,
    type: type || 'website',
    keywords: keywords || defaultKeywords,
  };

  return (
    <Helmet>
      {/* Standard metadata tags */}
      <title>{seo.title}</title>
      <meta name="description" content={seo.description} />
      <meta name="keywords" content={seo.keywords} />
      <link rel="canonical" href={seo.url} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={seo.type} />
      <meta property="og:title" content={seo.title} />
      <meta property="og:description" content={seo.description} />
      <meta property="og:image" content={seo.image} />
      <meta property="og:url" content={seo.url} />
      <meta property="og:site_name" content={siteName} />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={seo.title} />
      <meta name="twitter:description" content={seo.description} />
      <meta name="twitter:image" content={seo.image} />
      <meta name="twitter:url" content={seo.url} />

      {/* Structured Data (JSON-LD) */}
      {schema && (
        <script type="application/ld+json">
          {JSON.stringify(schema)}
        </script>
      )}
    </Helmet>
  );
}

SEO.propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  keywords: PropTypes.string,
  type: PropTypes.string,
  url: PropTypes.string,
  image: PropTypes.string,
  schema: PropTypes.object,
};
