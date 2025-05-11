
import { supabase } from './supabase';
import type { BlogPost, BlogCategory } from '../types/blog';

// Blog post related helpers
export const getBlogPosts = async (
  options: {
    category?: string;
    tag?: string;
    searchQuery?: string;
    publishedOnly?: boolean;
    limit?: number;
    offset?: number;
  } = {}
) => {
  const { category, tag, searchQuery, publishedOnly = true, limit = 100, offset = 0 } = options;
  
  let query = supabase
    .from('blog_posts')
    .select('*');
  
  if (publishedOnly) {
    query = query.eq('is_published', true);
  }
  
  if (category) {
    query = query.eq('category', category);
  }
  
  // Apply limit and offset for pagination
  query = query.range(offset, offset + limit - 1);
  
  // Order by most recent first
  query = query.order('published_date', { ascending: false });
  
  const { data, error } = await query;
  
  if (error) throw error;
  
  // Handle tag and search filtering client-side if needed
  let filteredData = data || [];
  
  if (tag) {
    filteredData = filteredData.filter(post => 
      Array.isArray(post.tags) && post.tags.includes(tag)
    );
  }
  
  if (searchQuery) {
    const searchLower = searchQuery.toLowerCase();
    filteredData = filteredData.filter(post => 
      post.title.toLowerCase().includes(searchLower) || 
      post.excerpt.toLowerCase().includes(searchLower) || 
      post.content.toLowerCase().includes(searchLower)
    );
  }
  
  return filteredData as BlogPost[];
};

export const getBlogPostBySlug = async (slug: string) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .select('*')
    .eq('slug', slug)
    .single();
  
  if (error) throw error;
  return data as BlogPost;
};

export const createBlogPost = async (post: Omit<BlogPost, 'id'>) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .insert([{
      ...post,
      published_date: post.published_date || new Date().toISOString().split('T')[0],
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as BlogPost;
};

export const updateBlogPost = async (id: string, updates: Partial<BlogPost>) => {
  const { data, error } = await supabase
    .from('blog_posts')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as BlogPost;
};

export const deleteBlogPost = async (id: string) => {
  const { error } = await supabase
    .from('blog_posts')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// Blog category related helpers
export const getBlogCategories = async () => {
  const { data, error } = await supabase
    .from('blog_categories')
    .select('*')
    .order('name');
  
  if (error) throw error;
  return data as BlogCategory[];
};

export const createBlogCategory = async (category: Omit<BlogCategory, 'id'>) => {
  const { data, error } = await supabase
    .from('blog_categories')
    .insert([{
      ...category,
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
    }])
    .select()
    .single();
  
  if (error) throw error;
  return data as BlogCategory;
};

export const updateBlogCategory = async (id: string, updates: Partial<BlogCategory>) => {
  const { data, error } = await supabase
    .from('blog_categories')
    .update({
      ...updates,
      updated_at: new Date().toISOString()
    })
    .eq('id', id)
    .select()
    .single();
  
  if (error) throw error;
  return data as BlogCategory;
};

export const deleteBlogCategory = async (id: string) => {
  const { error } = await supabase
    .from('blog_categories')
    .delete()
    .eq('id', id);
  
  if (error) throw error;
  return true;
};

// SEO Related API Endpoints
export const getGlobalSEOSettings = async () => {
  const { data, error } = await supabase
    .from('seo_settings')
    .select('*')
    .single();
  
  if (error) throw error;
  return data;
};

export const updateGlobalSEOSettings = async (settings: any) => {
  const { data, error } = await supabase
    .from('seo_settings')
    .update(settings)
    .eq('id', 1) // Assuming there's only one global settings row
    .select()
    .single();
    
  if (error) throw error;
  return data;
};

// Generate structured data for blog posts
export const generateArticleStructuredData = (post: BlogPost) => {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    "headline": post.title,
    "description": post.excerpt,
    "image": post.featured_image,
    "datePublished": post.published_date,
    "author": {
      "@type": "Person",
      "name": post.author
    },
    "publisher": {
      "@type": "Organization",
      "name": "TechStore",
      "logo": {
        "@type": "ImageObject",
        "url": window.location.origin + "/logo.png"
      }
    },
    "mainEntityOfPage": {
      "@type": "WebPage",
      "@id": window.location.href
    }
  };
  
  return JSON.stringify(structuredData);
};
