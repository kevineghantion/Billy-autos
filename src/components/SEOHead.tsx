import { Helmet } from 'react-helmet-async';

interface SEOHeadProps {
  title?: string;
  description?: string;
  image?: string;
  url?: string;
}

const DEFAULT_TITLE = 'Billy Autos | #1 Luxury Dealership in Lebanon';
const DEFAULT_DESCRIPTION = 'Discover the finest collection of luxury and exotic vehicles in Lebanon. Ferrari, Lamborghini, Porsche, and more. VIP service guaranteed.';
const DEFAULT_IMAGE = '/og-image.jpg';

export function SEOHead({
  title = DEFAULT_TITLE,
  description = DEFAULT_DESCRIPTION,
  image = DEFAULT_IMAGE,
  url = 'https://billyautos.com',
}: SEOHeadProps) {
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />

      {/* Open Graph */}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={image} />
      <meta property="og:url" content={url} />
      <meta property="og:type" content="website" />

      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={image} />

      {/* Additional SEO */}
      <meta name="robots" content="index, follow" />
      <link rel="canonical" href={url} />
    </Helmet>
  );
}
