import React from "react";
import { Helmet } from "react-helmet-async";

const SITE_URL = "https://ecommerce-with-blog.lovable.app";
const SITE_NAME = "TechStore";
const DEFAULT_IMAGE = `${SITE_URL}/og-image.png`;

interface PageMetaProps {
  title: string;
  description: string;
  path?: string;
  image?: string;
  type?: "website" | "article" | "product";
}

/**
 * Per-route social + SEO metadata.
 * Renders page-specific og:title, og:description, og:url, og:type, og:image,
 * matching twitter:* tags, and a self-referencing canonical.
 */
const PageMeta: React.FC<PageMetaProps> = ({
  title,
  description,
  path,
  image,
  type = "website",
}) => {
  const routePath =
    path ??
    (typeof window !== "undefined" ? window.location.pathname : "/");
  const url = `${SITE_URL}${routePath.startsWith("/") ? routePath : `/${routePath}`}`;
  const rawImage = image || DEFAULT_IMAGE;
  const absoluteImage = rawImage.startsWith("http")
    ? rawImage
    : `${SITE_URL}${rawImage.startsWith("/") ? rawImage : `/${rawImage}`}`;
  const fullTitle = `${title} | ${SITE_NAME}`;

  return (
    <Helmet>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={url} />

      <meta property="og:type" content={type} />
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta property="og:image" content={absoluteImage} />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={absoluteImage} />
    </Helmet>
  );
};

export default PageMeta;