
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
}

export interface BlogCategory {
  name: string;
  slug: string;
  description: string;
}
