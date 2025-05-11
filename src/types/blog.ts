
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
  canonicalUrl?: string;
  noIndex?: boolean;
  structuredData?: string;
}

export interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string;
  content: string;
  featured_image: string;
  author: string;
  published_date: string;
  category: string;
  tags: string[];
  is_published: boolean;
  seo?: SEOMetadata;
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
  seo?: SEOMetadata;
}
