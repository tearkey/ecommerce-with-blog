
import React, { useState } from "react";
import PageLayout from "@/components/PageLayout";
import { Link } from "react-router-dom";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";
import type { BlogPost } from "@/types/blog";
import { useIsMobile } from "@/hooks/use-mobile";

// Sample blog posts data - in a real app with Supabase, this would come from the database
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Gaming Laptops in 2025",
    slug: "top-5-gaming-laptops-2025",
    excerpt: "Discover the most powerful gaming laptops that deliver exceptional performance for modern games.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl quis tincidunt ultricies.",
    featured_image: "https://images.unsplash.com/photo-1593642702821-c8da6771f0c6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    author: "Tech Reviewer",
    published_date: "2025-05-01",
    category: "Gaming",
    tags: ["laptops", "gaming", "tech-review"],
    is_published: true
  },
  {
    id: "2",
    title: "Building a Productivity Workstation: Essential Components",
    slug: "building-productivity-workstation-essential-components",
    excerpt: "Learn how to build the perfect workstation for maximum productivity and efficiency.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl quis tincidunt ultricies.",
    featured_image: "https://images.unsplash.com/photo-1547082299-de196ea013d6?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    author: "Office Setup Pro",
    published_date: "2025-04-15",
    category: "Productivity",
    tags: ["office-setup", "workstation", "productivity"],
    is_published: true
  },
  {
    id: "3",
    title: "Understanding Monitor Specifications for Different Use Cases",
    slug: "understanding-monitor-specifications-different-use-cases",
    excerpt: "A comprehensive guide to monitor specs and how to choose the right one for your needs.",
    content: "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam euismod, nisl quis tincidunt ultricies, nunc nisl ultricies nunc, quis ultricies nisl nisl quis tincidunt ultricies.",
    featured_image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    author: "Display Expert",
    published_date: "2025-03-21",
    category: "Monitors",
    tags: ["displays", "monitors", "buying-guide"],
    is_published: true
  }
];

const Blog = () => {
  const isMobile = useIsMobile();
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  
  // Get all unique categories
  const categories = [...new Set(blogPosts.map(post => post.category))];
  
  // Filter posts based on search and category
  const filteredPosts = blogPosts.filter(post => {
    const matchesSearch = searchQuery === "" || 
      post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      post.excerpt.toLowerCase().includes(searchQuery.toLowerCase());
      
    const matchesCategory = selectedCategory === null || post.category === selectedCategory;
    
    return matchesSearch && matchesCategory;
  });

  return (
    <PageLayout>
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
                  {post.tags.slice(0, 2).map(tag => (
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
