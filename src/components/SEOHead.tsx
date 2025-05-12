
import React, { useEffect } from 'react';
import { Helmet } from 'react-helmet-async';
import type { SEOMetadata } from '@/types/seo';

interface SEOHeadProps {
  metadata: Partial<SEOMetadata>;
  type?: 'website' | 'article' | 'product';
  url?: string;
  siteName?: string;
}

const SEOHead = ({ metadata, type = 'website', url, siteName = 'TechStore' }: SEOHeadProps) => {
  const {
    title,
    description,
    keywords,
    ogTitle,
    ogDescription,
    ogImage,
    twitterTitle,
    twitterDescription,
    twitterImage,
    twitterCard,
    canonicalUrl,
    noIndex,
    structuredData
  } = metadata;

  const pageUrl = url || window.location.href;
  
  // Update the document title
  useEffect(() => {
    if (title) {
      document.title = `${title} | ${siteName}`;
    }
  }, [title, siteName]);

  return (
    <Helmet>
      {title && <title>{title} | {siteName}</title>}
      {description && <meta name="description" content={description} />}
      {keywords && keywords.length > 0 && (
        <meta name="keywords" content={keywords.join(', ')} />
      )}
      
      {/* Canonical URL */}
      {canonicalUrl && <link rel="canonical" href={canonicalUrl} />}
      
      {/* Robots meta tag for search engines */}
      {noIndex ? (
        <meta name="robots" content="noindex, nofollow" />
      ) : (
        <meta name="robots" content="index, follow" />
      )}
      
      {/* Open Graph / Facebook */}
      <meta property="og:type" content={type} />
      <meta property="og:url" content={pageUrl} />
      <meta property="og:site_name" content={siteName} />
      {(ogTitle || title) && <meta property="og:title" content={ogTitle || title} />}
      {(ogDescription || description) && (
        <meta property="og:description" content={ogDescription || description} />
      )}
      {ogImage && <meta property="og:image" content={ogImage} />}
      
      {/* Twitter */}
      <meta name="twitter:card" content={twitterCard || "summary_large_image"} />
      {(twitterTitle || ogTitle || title) && (
        <meta name="twitter:title" content={twitterTitle || ogTitle || title} />
      )}
      {(twitterDescription || ogDescription || description) && (
        <meta name="twitter:description" content={twitterDescription || ogDescription || description} />
      )}
      {(twitterImage || ogImage) && (
        <meta name="twitter:image" content={twitterImage || ogImage} />
      )}
      
      {/* JSON-LD Structured Data */}
      {structuredData && (
        <script type="application/ld+json">
          {structuredData}
        </script>
      )}
    </Helmet>
  );
};

export default SEOHead;
