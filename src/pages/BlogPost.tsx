
import React from "react";
import { useParams, Link } from "react-router-dom";
import PageLayout from "@/components/PageLayout";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowLeft } from "lucide-react";
import { Breadcrumbs } from "@/components/Breadcrumbs";
import type { BlogPost } from "@/types/blog";

// Sample blog posts data - this would come from a database in a real app
const blogPosts: BlogPost[] = [
  {
    id: "1",
    title: "Top 5 Gaming Laptops in 2025",
    slug: "top-5-gaming-laptops-2025",
    excerpt: "Discover the most powerful gaming laptops that deliver exceptional performance for modern games.",
    content: `<p>Gaming laptops have evolved significantly over the past few years, offering desktop-class performance in portable form factors. Here are our top picks for 2025:</p>
    
    <h2>1. ROG Strix Quantum</h2>
    <p>The latest offering from ASUS delivers exceptional performance with the newest GPU and CPU technology. With its advanced cooling system, the Strix Quantum maintains optimal performance even during extended gaming sessions.</p>
    
    <h2>2. Alienware Nova X17</h2>
    <p>Dell's premium gaming brand continues to impress with the Nova X17. Featuring a stunning 4K OLED display with a 240Hz refresh rate, this laptop offers an unparalleled visual experience.</p>
    
    <h2>3. Razer Blade Pro Ultra</h2>
    <p>Known for its sleek design and build quality, the latest Razer Blade Pro Ultra packs tremendous power into an impressively thin chassis. The precision CNC aluminum unibody frame houses top-tier components while maintaining excellent thermal performance.</p>
    
    <h2>4. MSI Titan GT77 Quantum</h2>
    <p>For those who prioritize raw power over portability, the MSI Titan GT77 Quantum is the ultimate desktop replacement. With overclockable components and a mechanical keyboard, it's a complete gaming station.</p>
    
    <h2>5. Lenovo Legion Pro 9i</h2>
    <p>Offering the best balance between performance and price, the Legion Pro 9i features an innovative cooling system and a 16-inch QHD+ display that makes it perfect for both gaming and content creation.</p>`,
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
    content: `<p>Creating an efficient workspace can significantly boost your productivity. Here's what you need to consider when building the ultimate productivity workstation:</p>
    
    <h2>The Right Monitor Setup</h2>
    <p>For productivity tasks, consider a dual-monitor setup or an ultrawide display. Studies have shown that multiple monitors can increase productivity by up to 42%. Look for monitors with good color accuracy, anti-glare coating, and blue light filters to reduce eye strain during long work sessions.</p>
    
    <h2>Ergonomic Input Devices</h2>
    <p>Your keyboard and mouse are tools you'll use for thousands of hours. Investing in ergonomic options can prevent repetitive strain injuries and improve comfort. Consider mechanical keyboards with customizable switches and ergonomic mice that fit your grip style.</p>
    
    <h2>Powerful Yet Quiet Computer</h2>
    <p>For a distraction-free environment, build or choose a computer that offers sufficient power for your workloads while maintaining quiet operation. Consider SSD storage for faster load times and a processor with multiple cores for multitasking.</p>
    
    <h2>Cable Management Solutions</h2>
    <p>A clean workspace promotes clear thinking. Implement proper cable management using cable trays, sleeves, and clips to keep your desk organized and free from distracting clutter.</p>
    
    <h2>Proper Lighting</h2>
    <p>Lighting significantly impacts productivity and eye strain. Invest in adjustable desk lighting that provides even illumination without creating glare on your screens. Consider lights with adjustable color temperature to match the time of day.</p>`,
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
    content: `<p>Choosing the right monitor involves understanding various specifications and how they relate to your specific use case. Here's a breakdown of important monitor specs:</p>
    
    <h2>Resolution</h2>
    <p>Resolution determines the clarity and detail of the image displayed. Common resolutions include:</p>
    <ul>
      <li>Full HD (1920×1080): Entry-level, good for general use and budget gaming</li>
      <li>WQHD (2560×1440): Great middle ground between performance and visual quality</li>
      <li>4K (3840×2160): Excellent for content creation and high-end gaming</li>
      <li>Ultrawide variations: Offer increased horizontal space for multitasking and immersive experiences</li>
    </ul>
    
    <h2>Panel Type</h2>
    <p>Different panel technologies offer various advantages:</p>
    <ul>
      <li>IPS: Best color accuracy and viewing angles, good for design work</li>
      <li>VA: Best contrast ratios, good for entertainment and general use</li>
      <li>TN: Fastest response times, preferred for competitive gaming</li>
      <li>OLED: Perfect blacks and excellent contrast, but potential burn-in concerns</li>
      <li>Mini-LED: Excellent brightness and contrast approaching OLED levels</li>
    </ul>
    
    <h2>Refresh Rate</h2>
    <p>The number of times the display updates per second, measured in Hertz (Hz):</p>
    <ul>
      <li>60Hz: Standard for office work and casual use</li>
      <li>144Hz: Good for gaming and smoother desktop experience</li>
      <li>240Hz and above: For competitive gaming and specialized applications</li>
    </ul>
    
    <h2>Response Time</h2>
    <p>How quickly a pixel can change from one color to another, measured in milliseconds (ms). Lower is better for reducing motion blur, particularly important for gaming and fast-moving content.</p>
    
    <h2>Color Accuracy</h2>
    <p>Measured in terms of color gamut coverage (sRGB, Adobe RGB, DCI-P3). Critical for photography, video editing, and graphic design work. Look for monitors with factory calibration for the most accurate colors out of the box.</p>`,
    featured_image: "https://images.unsplash.com/photo-1527443224154-c4a3942d3acf?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1200&q=80",
    author: "Display Expert",
    published_date: "2025-03-21",
    category: "Monitors",
    tags: ["displays", "monitors", "buying-guide"],
    is_published: true
  }
];

const BlogPost = () => {
  const { slug } = useParams<{ slug: string }>();
  
  // Find the blog post with the matching slug
  const post = blogPosts.find((post) => post.slug === slug);
  
  // If no post is found, render a message
  if (!post) {
    return (
      <PageLayout>
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
  
  return (
    <PageLayout>
      <div className="container mx-auto px-4 py-8">
        <Breadcrumbs />
        
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
              {post.tags.map(tag => (
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
            dangerouslySetInnerHTML={{ __html: post.content }}
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
          
          {/* Related Posts (simplified) */}
          <div className="mt-12">
            <h3 className="text-xl font-bold mb-6">Related Posts</h3>
            <div className="grid sm:grid-cols-2 gap-6">
              {blogPosts
                .filter(related => related.id !== post.id && related.category === post.category)
                .slice(0, 2)
                .map(related => (
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
        </div>
      </div>
    </PageLayout>
  );
};

export default BlogPost;
