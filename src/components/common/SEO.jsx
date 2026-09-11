import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

export default function SEO({ title, description, keywords, type, url, image, schema }) {
  const siteName = "Kushal Poudel Portfolio";
  const defaultTitle = "Kushal Poudel | Full-Stack Developer";
  const defaultDescription = "Portfolio of Kushal Poudel, a full-stack developer building Laravel, Spring Boot and React products with strong backend architecture and polished interfaces.";
  const defaultUrl = "https://kushalpoudel2060.com.np/";
  const defaultImage = "https://kushalpoudel2060.com.np/images/pic3.webp";
  const defaultKeywords = "Kushal Poudel, Full-Stack Developer, Laravel Developer, Spring Boot Developer, React Developer, Nepal Developer";

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalUrl = url ? `https://kushalpoudel2060.com.np${url}` : defaultUrl;
  const finalImage = image ? (image.startsWith("http") ? image : `https://kushalpoudel2060.com.np${image}`) : defaultImage;

  return (
    <Helmet>
      <title>{finalTitle}</title>
      <meta name="description" content={description || defaultDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <link rel="canonical" href={finalUrl} />
      <meta property="og:type" content={type || "website"} />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={description || defaultDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteName} />
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={description || defaultDescription} />
      <meta name="twitter:image" content={finalImage} />
      {schema && <script type="application/ld+json">{JSON.stringify(schema)}</script>}
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
