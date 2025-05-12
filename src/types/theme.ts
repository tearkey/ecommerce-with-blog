
import { SEOMetadata } from './seo';

export interface ThemeTemplate {
  id: string;
  name: string;
  type: TemplateType;
  content: string;
  isActive: boolean;
  conditions?: TemplateCondition[];
  lastModified: string;
  createdAt: string;
}

export type TemplateType = 
  | 'header' 
  | 'footer' 
  | 'single_post' 
  | 'error_404' 
  | 'single_product' 
  | 'products_archive' 
  | 'posts_archive'
  | 'cart_page';

export interface TemplateCondition {
  id: string;
  type: 'include' | 'exclude';
  rule: ConditionRule;
  value: string | string[];
}

export type ConditionRule = 
  | 'all' 
  | 'category' 
  | 'tag' 
  | 'author'
  | 'taxonomy'
  | 'product_category'
  | 'product_tag';
