
import React, { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import PageLayout from "@/components/PageLayout";
import PageMeta from "@/components/PageMeta";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import { getBlogPosts, getBlogCategories } from "@/lib/blog";
import { useIsMobile } from "@/hooks/use-mobile";
import { Skeleton } from "@/components/ui/skeleton";
import type { BlogPost } from "@/types/blog";

const Blog = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Fetch blog posts
  const { data: posts, isLoading: postsLoading, error: postsError } = useQuery({
    queryKey: ['blogPosts', { category: selectedCategory }],
    queryFn: () => getBlogPosts({ 
      category: selectedCategory || undefined,
      publishedOnly: true 
    }),
  });
  
  // Fetch categories
  const { data: categoriesData } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: getBlogCategories,
    // If fetching categories fails, we'll fall back to the ones from the posts
  });
  
  // If we don't have categories from the API, extract them from posts
  const categories = categoriesData?.map(c => c.name) || 
    [...new Set((posts || []).map(post => post.category))];
  
  // Filter posts based on search
  const filteredPosts = posts?.filter(post => {
    return searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
  }) || [];

  // Loading states
  if (postsLoading) {
    return (
      <PageLayout>
        <PageMeta
          title="Blog"
          description="Tech reviews, buying guides, and industry news from the TechStore blog."
          path="/blog"
        />
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Blog</h1>
          
          <div className="mb-8 space-y-4">
            <Skeleton className="h-10 w-full" />
            <div className="flex flex-wrap gap-2">
              {Array.from({ length: 5 }).map((_, i) => (
                <Skeleton key={i} className="h-8 w-20" />
              ))}
            </div>
          </div>
          
          <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
            {Array.from({ length: 6 }).map((_, i) => (
              <Card key={i} className="overflow-hidden">
                <Skeleton className="h-48 w-full" />
                <div className="p-6">
                  <Skeleton className="h-6 w-24 mb-4" />
                  <Skeleton className="h-8 w-full mb-4" />
                  <Skeleton className="h-20 w-full mb-4" />
                  <Skeleton className="h-4 w-32" />
                </div>
              </Card>
            ))}
          </div>
        </div>
      </PageLayout>
    );
  }

  // Error state
  if (postsError) {
    return (
      <PageLayout>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-8">Blog</h1>
          <div className="p-4 border border-destructive/30 bg-destructive/10 rounded-md">
            <p>Failed to load blog posts. Please try again later.</p>
            <Button className="mt-4" onClick={() => window.location.reload()}>
              Retry
            </Button>
          </div>
        </div>
      </PageLayout>
    );
  }

  return (
    <PageLayout>
      <PageMeta
        title="Blog"
        description="Tech reviews, buying guides, and industry news from the TechStore blog."
        path="/blog"
      />
      <div className="container mx-auto px-4 py-8">
        <h1 className="text-3xl font-bold mb-8">Blog</h1>
        
        {/* Search and Filter Section */}
        <div className="mb-8 space-y-4">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input 
              placeholder="Search blog posts..." 
              className="pl-10"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          
          <div className="flex flex-wrap gap-2">
            <Button 
              variant={selectedCategory === null ? "default" : "outline"}
              onClick={() => setSelectedCategory(null)}
              size="sm"
            >
              All
            </Button>
            {categories.map(category => (
              <Button
                key={category}
                variant={selectedCategory === category ? "default" : "outline"}
                onClick={() => setSelectedCategory(category)}
                size="sm"
              >
                {category}
              </Button>
            ))}
          </div>
        </div>
        
        {/* Blog Posts Grid */}
        <div className={`grid gap-6 ${isMobile ? 'grid-cols-1' : 'sm:grid-cols-2 lg:grid-cols-3'}`}>
          {filteredPosts.map((post) => (
            <Card key={post.id} className="flex flex-col h-full overflow-hidden">
              <Link to={`/blog/${post.slug}`} className="block">
                <div className="aspect-video overflow-hidden">
                  <img 
                    src={post.featured_image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform hover:scale-105 duration-300"
                  />
                </div>
              </Link>
              <CardContent className="flex-grow p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  <Badge>{post.category}</Badge>
                  {Array.isArray(post.tags) && post.tags.slice(0, 2).map(tag => (
                    <Badge variant="outline" key={tag}>
                      {tag}
                    </Badge>
                  ))}
                </div>
                <Link to={`/blog/${post.slug}`} className="block group">
                  <h2 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">
                    {post.title}
                  </h2>
                </Link>
                <p className="text-muted-foreground mb-4 line-clamp-3">{post.excerpt}</p>
                <div className="text-sm text-muted-foreground">
                  <span>{post.author}</span>
                  <span className="mx-2">•</span>
                  <span>{new Date(post.published_date).toLocaleDateString()}</span>
                </div>
              </CardContent>
              <CardFooter className="pt-0 pb-6 px-6">
                <Button variant="outline" className="w-full" asChild>
                  <Link to={`/blog/${post.slug}`}>
                    Read More
                  </Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
        
        {filteredPosts.length === 0 && (
          <div className="text-center py-12">
            <p className="text-muted-foreground">No blog posts found matching your criteria.</p>
            {(searchQuery || selectedCategory) && (
              <Button 
                variant="outline" 
                className="mt-4"
                onClick={() => {
                  setSearchQuery("");
                  setSelectedCategory(null);
                }}
              >
                Clear Filters
              </Button>
            )}
          </div>
        )}
      </div>
    </PageLayout>
  );
};

export default Blog;
