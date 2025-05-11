
import React, { useState, useEffect } from "react";
import { useMutation, useQueryClient, useQuery } from "@tanstack/react-query";
import { createBlogPost, updateBlogPost, getBlogCategories } from "@/lib/blog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/components/ui/use-toast";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { type BlogPost, type BlogCategory } from "@/types/blog";
import { Loader2, ArrowLeft } from "lucide-react";
import { slugify } from "@/lib/utils";

interface BlogEditorProps {
  post?: BlogPost; // If present, editing an existing post
  onCancel: () => void;
  onSave: () => void;
}

const BlogEditor: React.FC<BlogEditorProps> = ({ post, onCancel, onSave }) => {
  const queryClient = useQueryClient();
  const { toast } = useToast();
  const isEditing = !!post;

  // Form state
  const [title, setTitle] = useState(post?.title || "");
  const [slug, setSlug] = useState(post?.slug || "");
  const [excerpt, setExcerpt] = useState(post?.excerpt || "");
  const [content, setContent] = useState(post?.content || "");
  const [featuredImage, setFeaturedImage] = useState(post?.featured_image || "");
  const [category, setCategory] = useState(post?.category || "");
  const [author, setAuthor] = useState(post?.author || "");
  const [tags, setTags] = useState(post?.tags?.join(", ") || "");
  const [isPublished, setIsPublished] = useState(post?.is_published || false);
  const [isLoading, setIsLoading] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Get categories
  const { data: categories, isLoading: loadingCategories } = useQuery({
    queryKey: ['blogCategories'],
    queryFn: getBlogCategories,
    meta: {
      onError: (error: Error) => {
        console.error("Failed to load categories:", error);
      }
    }
  });

  // Auto-generate slug from title if slug is empty
  useEffect(() => {
    if (title && !slug) {
      setSlug(slugify(title));
    }
  }, [title, slug]);

  // Create mutation for new posts
  const createMutation = useMutation({
    mutationFn: createBlogPost,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Success",
        description: "Blog post created successfully",
      });
      onSave();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to create blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  // Update mutation for existing posts
  const updateMutation = useMutation({
    mutationFn: ({ id, updates }: { id: string; updates: Partial<BlogPost> }) => 
      updateBlogPost(id, updates),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogPosts'] });
      toast({
        title: "Success",
        description: "Blog post updated successfully",
      });
      onSave();
    },
    onError: (error) => {
      toast({
        title: "Error",
        description: `Failed to update blog post: ${error instanceof Error ? error.message : 'Unknown error'}`,
        variant: "destructive",
      });
      setIsLoading(false);
    },
  });

  const validateForm = () => {
    const newErrors: Record<string, string> = {};

    if (!title) newErrors.title = "Title is required";
    if (!slug) newErrors.slug = "Slug is required";
    if (!excerpt) newErrors.excerpt = "Excerpt is required";
    if (!content) newErrors.content = "Content is required";
    if (!category) newErrors.category = "Category is required";
    if (!author) newErrors.author = "Author is required";
    if (!featuredImage) newErrors.featuredImage = "Featured image URL is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) {
      toast({
        title: "Validation Error",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    const formattedTags = tags
      .split(",")
      .map((tag) => tag.trim())
      .filter((tag) => tag);

    const blogPostData = {
      title,
      slug,
      excerpt,
      content,
      featured_image: featuredImage,
      category,
      author,
      tags: formattedTags,
      is_published: isPublished,
      published_date: post?.published_date || new Date().toISOString().split("T")[0],
    };

    if (isEditing && post) {
      updateMutation.mutate({ id: post.id, updates: blogPostData });
    } else {
      createMutation.mutate(blogPostData as Omit<BlogPost, "id">);
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="flex justify-between items-center">
          <Button
            type="button"
            variant="ghost"
            onClick={onCancel}
            className="flex items-center gap-2"
          >
            <ArrowLeft className="h-4 w-4" /> Back to Posts
          </Button>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2">
              <Switch
                id="published"
                checked={isPublished}
                onCheckedChange={setIsPublished}
              />
              <Label htmlFor="published">
                {isPublished ? "Published" : "Draft"}
              </Label>
            </div>
            <Button type="submit" disabled={isLoading}>
              {isLoading ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  {isEditing ? "Updating..." : "Creating..."}
                </>
              ) : isEditing ? (
                "Update Post"
              ) : (
                "Create Post"
              )}
            </Button>
          </div>
        </div>

        <Tabs defaultValue="content">
          <TabsList className="grid w-full grid-cols-2">
            <TabsTrigger value="content">Content</TabsTrigger>
            <TabsTrigger value="settings">Settings</TabsTrigger>
          </TabsList>
          <TabsContent value="content" className="space-y-4 pt-4">
            {/* Title */}
            <div className="space-y-2">
              <Label htmlFor="title" className={errors.title ? "text-destructive" : ""}>
                Title *
              </Label>
              <Input
                id="title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                className={errors.title ? "border-destructive" : ""}
                placeholder="Enter post title"
              />
              {errors.title && (
                <p className="text-sm text-destructive">{errors.title}</p>
              )}
            </div>

            {/* Excerpt */}
            <div className="space-y-2">
              <Label htmlFor="excerpt" className={errors.excerpt ? "text-destructive" : ""}>
                Excerpt *
              </Label>
              <Textarea
                id="excerpt"
                value={excerpt}
                onChange={(e) => setExcerpt(e.target.value)}
                className={errors.excerpt ? "border-destructive" : ""}
                placeholder="Write a brief summary of your post"
                rows={3}
              />
              {errors.excerpt && (
                <p className="text-sm text-destructive">{errors.excerpt}</p>
              )}
            </div>

            {/* Content */}
            <div className="space-y-2">
              <Label htmlFor="content" className={errors.content ? "text-destructive" : ""}>
                Content *
              </Label>
              <Textarea
                id="content"
                value={content}
                onChange={(e) => setContent(e.target.value)}
                className={`min-h-[300px] ${errors.content ? "border-destructive" : ""}`}
                placeholder="Write your blog post content (HTML is supported)"
                rows={12}
              />
              <p className="text-sm text-muted-foreground">
                HTML markup is supported for formatting.
              </p>
              {errors.content && (
                <p className="text-sm text-destructive">{errors.content}</p>
              )}
            </div>
          </TabsContent>
          
          <TabsContent value="settings" className="space-y-4 pt-4">
            {/* Slug */}
            <div className="space-y-2">
              <Label htmlFor="slug" className={errors.slug ? "text-destructive" : ""}>
                Slug *
              </Label>
              <div className="flex gap-2">
                <Input
                  id="slug"
                  value={slug}
                  onChange={(e) => setSlug(e.target.value)}
                  className={errors.slug ? "border-destructive" : ""}
                  placeholder="post-url-slug"
                />
                <Button 
                  type="button" 
                  variant="outline"
                  onClick={() => setSlug(slugify(title))}
                >
                  Generate
                </Button>
              </div>
              {errors.slug ? (
                <p className="text-sm text-destructive">{errors.slug}</p>
              ) : (
                <p className="text-sm text-muted-foreground">
                  The URL-friendly version of the title.
                </p>
              )}
            </div>

            {/* Featured Image */}
            <div className="space-y-2">
              <Label htmlFor="featuredImage" className={errors.featuredImage ? "text-destructive" : ""}>
                Featured Image URL *
              </Label>
              <Input
                id="featuredImage"
                value={featuredImage}
                onChange={(e) => setFeaturedImage(e.target.value)}
                className={errors.featuredImage ? "border-destructive" : ""}
                placeholder="https://example.com/image.jpg"
              />
              {errors.featuredImage && (
                <p className="text-sm text-destructive">{errors.featuredImage}</p>
              )}
              {featuredImage && (
                <Card className="mt-2">
                  <CardHeader className="p-3 pb-0">
                    <CardTitle className="text-sm">Preview</CardTitle>
                  </CardHeader>
                  <CardContent className="p-3">
                    <img
                      src={featuredImage}
                      alt="Featured image preview"
                      className="max-h-32 object-cover rounded-sm"
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "https://placehold.co/600x400?text=Invalid+Image+URL";
                      }}
                    />
                  </CardContent>
                </Card>
              )}
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {/* Author */}
              <div className="space-y-2">
                <Label htmlFor="author" className={errors.author ? "text-destructive" : ""}>
                  Author *
                </Label>
                <Input
                  id="author"
                  value={author}
                  onChange={(e) => setAuthor(e.target.value)}
                  className={errors.author ? "border-destructive" : ""}
                  placeholder="Author name"
                />
                {errors.author && (
                  <p className="text-sm text-destructive">{errors.author}</p>
                )}
              </div>

              {/* Category */}
              <div className="space-y-2">
                <Label htmlFor="category" className={errors.category ? "text-destructive" : ""}>
                  Category *
                </Label>
                <Select
                  value={category}
                  onValueChange={setCategory}
                >
                  <SelectTrigger id="category" className={errors.category ? "border-destructive" : ""}>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    {loadingCategories ? (
                      <SelectItem value="loading" disabled>
                        Loading categories...
                      </SelectItem>
                    ) : categories && categories.length > 0 ? (
                      categories.map((cat) => (
                        <SelectItem key={cat.slug} value={cat.name}>
                          {cat.name}
                        </SelectItem>
                      ))
                    ) : (
                      <>
                        <SelectItem value="Technology">Technology</SelectItem>
                        <SelectItem value="Gaming">Gaming</SelectItem>
                        <SelectItem value="Productivity">Productivity</SelectItem>
                        <SelectItem value="Monitors">Monitors</SelectItem>
                        <SelectItem value="Accessories">Accessories</SelectItem>
                        <SelectItem value="News">News</SelectItem>
                        <SelectItem value="Reviews">Reviews</SelectItem>
                        <SelectItem value="Guides">Guides</SelectItem>
                      </>
                    )}
                  </SelectContent>
                </Select>
                {errors.category && (
                  <p className="text-sm text-destructive">{errors.category}</p>
                )}
              </div>
            </div>

            {/* Tags */}
            <div className="space-y-2">
              <Label htmlFor="tags">Tags (comma separated)</Label>
              <Input
                id="tags"
                value={tags}
                onChange={(e) => setTags(e.target.value)}
                placeholder="tech, gaming, review"
              />
              <p className="text-sm text-muted-foreground">
                Separate multiple tags with commas
              </p>
            </div>
          </TabsContent>
        </Tabs>
      </form>
    </div>
  );
};

export default BlogEditor;
