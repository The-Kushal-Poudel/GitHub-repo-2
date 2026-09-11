import { Helmet } from "react-helmet-async";
import PropTypes from "prop-types";

const DEFAULT_SITE_URL = "https://kushalpoudel2060.com.np";

function absoluteUrl(value, siteUrl) {
  if (!value) return siteUrl;
  if (/^https?:\/\//i.test(value)) return value;
  return `${siteUrl}${value.startsWith("/") ? value : `/${value}`}`;
}

export default function SEO({ title, description, keywords, type, url, image, imageAlt, schema, noIndex = false }) {
  const siteName = "Kushal Poudel Portfolio";
  const siteUrl = (import.meta.env.VITE_SITE_URL || DEFAULT_SITE_URL).replace(/\/$/, "");
  const defaultTitle = "Kushal Poudel | Full-Stack Developer";
  const defaultDescription = "Portfolio of Kushal Poudel, a full-stack developer building Laravel, Spring Boot and React products with strong backend architecture and polished interfaces.";
  const defaultImage = `${siteUrl}/images/pic3.webp`;
  const defaultKeywords = "Kushal Poudel, Full-Stack Developer, Laravel Developer, Spring Boot Developer, React Developer, Nepal Developer";

  const finalTitle = title ? `${title} | ${siteName}` : defaultTitle;
  const finalUrl = absoluteUrl(url || "/", siteUrl);
  const finalImage = image ? absoluteUrl(image, siteUrl) : defaultImage;
  const finalDescription = description || defaultDescription;
  const finalImageAlt = imageAlt || `${siteName} preview`;

  return (
    <Helmet>
      <html lang="en" />
      <title>{finalTitle}</title>
      <meta name="description" content={finalDescription} />
      <meta name="keywords" content={keywords || defaultKeywords} />
      <meta name="robots" content={noIndex ? "noindex, nofollow" : "index, follow, max-image-preview:large"} />
      <link rel="canonical" href={finalUrl} />

      <meta property="og:type" content={type || "website"} />
      <meta property="og:locale" content="en_US" />
      <meta property="og:title" content={finalTitle} />
      <meta property="og:description" content={finalDescription} />
      <meta property="og:image" content={finalImage} />
      <meta property="og:image:alt" content={finalImageAlt} />
      <meta property="og:url" content={finalUrl} />
      <meta property="og:site_name" content={siteName} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={finalTitle} />
      <meta name="twitter:description" content={finalDescription} />
      <meta name="twitter:image" content={finalImage} />
      <meta name="twitter:image:alt" content={finalImageAlt} />

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
  imageAlt: PropTypes.string,
  schema: PropTypes.object,
  noIndex: PropTypes.bool,
};
