
export interface SEOMetadata {
  title: string;
  description: string;
  keywords: string[];
  ogTitle?: string;
  ogDescription?: string;
  ogImage?: string;
  twitterTitle?: string;
  twitterDescription?: string;
  twitterImage?: string;
  twitterCard?: "summary" | "summary_large_image" | "app" | "player";
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: string; // JSON-LD structured data as string
}

export interface SEOSettings {
  siteName: string;
  siteDescription: string;
  defaultOgImage: string;
  twitterUsername?: string;
  googleSiteVerification?: string;
  bingSiteVerification?: string;
}
