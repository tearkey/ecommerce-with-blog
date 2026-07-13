
import React from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import DOMPurify from "dompurify";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { ArrowLeft } from "lucide-react";
import { getBlogPostBySlug, getBlogPosts } from "@/lib/blog";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@/types/blog";

const BlogPostPage = () => {
  const { slug } = useParams<{ slug: string }>();
  const navigate = useNavigate();
  
  // Fetch the blog post by slug
  const { 
    data: post, 
    isLoading, 
    error 
  } = useQuery({
    queryKey: ['blogPost', slug],
    queryFn: () => {
      if (!slug) throw new Error("Slug is required");
      return getBlogPostBySlug(slug);
    },
    retry: 1,
    meta: {
      onError: (err: Error) => {
        console.error("Error fetching blog post:", err);
      }
    }
  });
  
  // Fetch related posts (same category)
  const { data: relatedPosts = [] } = useQuery({
    queryKey: ['relatedPosts', post?.category],
    queryFn: () => getBlogPosts({ 
      category: post?.category,
      limit: 3
    }),
    // Only fetch related posts if we have the main post
    enabled: !!post,
  });

  // Loading state
  if (isLoading) {
    return (
      <PageLayout showBreadcrumbs={false}>
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-3xl mx-auto">
            <Skeleton className="h-8 w-40 mb-6" />
            <Skeleton className="aspect-video w-full mb-8" />
            <div className="space-y-2 mb-6">
              <div className="flex gap-2 mb-4">
                <Skeleton className="h-6 w-20" />
                <Skeleton className="h-6 w-20" />
              </div>
              <Skeleton className="h-12 w-full" />
              <Skeleton className="h-6 w-48" />
            </div>
            <div className="space-y-4">
              {Array.from({ length: 10 }).map((_, i) => (
                <Skeleton key={i} className="h-16 w-full" />
              ))}
            </div>
          </div>
        </div>
      </PageLayout>
    );
  }
  
  // Error or post not found
  if (error || !post) {
    return (
      <PageLayout showBreadcrumbs={false}>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-2xl font-bold">Blog Post Not Found</h1>
          <p className="mt-4">Sorry, the blog post you're looking for doesn't exist.</p>
          <Button asChild className="mt-6">
            <Link to="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </PageLayout>
    );
  }
  
  // Filter out the current post from related posts
  const filteredRelatedPosts = relatedPosts.filter(related => related.id !== post.id).slice(0, 2);
  
  return (
    <PageLayout showBreadcrumbs={false}>
      <div className="container mx-auto px-4 py-8">
        {/* Custom breadcrumbs for blog posts to avoid duplication */}
        <nav aria-label="breadcrumb" className="mb-8">
          <ol className="flex flex-wrap items-center gap-1.5 break-words text-sm text-muted-foreground sm:gap-2.5">
            <li className="inline-flex items-center gap-1.5">
              <Link to="/" className="transition-colors hover:text-foreground">
                <span className="sr-only">Home</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-4 w-4"><path d="m3 9 9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/><polyline points="9 22 9 12 15 12 15 22"/></svg>
              </Link>
            </li>
            <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <Link to="/blog" className="transition-colors hover:text-foreground">
                Blog
              </Link>
            </li>
            <li role="presentation" aria-hidden="true" className="[&>svg]:size-3.5">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-chevron-right"><path d="m9 18 6-6-6-6"/></svg>
            </li>
            <li className="inline-flex items-center gap-1.5">
              <span role="link" aria-disabled="true" aria-current="page" className="font-normal text-foreground">{post.title}</span>
            </li>
          </ol>
        </nav>
        
        <Button variant="outline" size="sm" asChild className="mb-6">
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        
        <div className="max-w-3xl mx-auto">
          {/* Hero Image */}
          <div className="aspect-video overflow-hidden rounded-lg mb-8">
            <img 
              src={post.featured_image} 
              alt={post.title}
              className="w-full h-full object-cover"
            />
          </div>
          
          {/* Post Header */}
          <div className="mb-8">
            <div className="flex flex-wrap gap-2 mb-4">
              <Badge>{post.category}</Badge>
              {Array.isArray(post.tags) && post.tags.map(tag => (
                <Badge variant="outline" key={tag}>
                  {tag}
                </Badge>
              ))}
            </div>
            
            <h1 className="text-3xl md:text-4xl font-bold mb-4">{post.title}</h1>
            
            <div className="flex items-center text-sm text-muted-foreground">
              <span>By {post.author}</span>
              <span className="mx-2">•</span>
              <span>{new Date(post.published_date).toLocaleDateString()}</span>
            </div>
          </div>
          
          {/* Post Content */}
          <div 
            className="prose max-w-none"
            dangerouslySetInnerHTML={{ __html: DOMPurify.sanitize(post.content ?? "") }}
          />
          
          {/* Post Footer */}
          <div className="border-t mt-12 pt-6">
            <div className="flex justify-between items-center">
              <span className="text-sm text-muted-foreground">
                Published on {new Date(post.published_date).toLocaleDateString()}
              </span>
              <div className="flex gap-2">
                <Button size="sm" variant="outline">Share</Button>
                <Button size="sm">Subscribe</Button>
              </div>
            </div>
          </div>
          
          {/* Related Posts */}
          {filteredRelatedPosts.length > 0 && (
            <div className="mt-12">
              <h3 className="text-xl font-bold mb-6">Related Posts</h3>
              <div className="grid sm:grid-cols-2 gap-6">
                {filteredRelatedPosts.map(related => (
                  <Card key={related.id} className="overflow-hidden">
                    <Link to={`/blog/${related.slug}`} className="block">
                      <div className="aspect-video">
                        <img 
                          src={related.featured_image} 
                          alt={related.title}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <Badge className="mb-2">{related.category}</Badge>
                        <h4 className="font-bold">{related.title}</h4>
                        <p className="text-sm text-muted-foreground mt-2 line-clamp-2">
                          {related.excerpt}
                        </p>
                      </div>
                    </Link>
                  </Card>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPostPage;
