
import React from "react";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { SEOMetadata } from "@/types/seo";

const seoFormSchema = z.object({
  title: z.string().min(5, {
    message: "Title must be at least 5 characters.",
  }).max(60, {
    message: "Title should not exceed 60 characters for optimal SEO.",
  }),
  description: z.string().min(10, {
    message: "Description must be at least 10 characters.",
  }).max(160, {
    message: "Description should not exceed 160 characters for optimal SEO.",
  }),
  keywords: z.union([
    z.string(),
    z.array(z.string())
  ]).transform(val => 
    typeof val === 'string' 
      ? val.split(',').map(k => k.trim()).filter(Boolean) 
      : val
  ),
  ogTitle: z.string().optional(),
  ogDescription: z.string().optional(),
  ogImage: z.string().url().optional().or(z.literal('')),
  twitterCard: z.enum(["summary", "summary_large_image", "app", "player"]).default("summary_large_image"),
  canonicalUrl: z.string().url().optional().or(z.literal('')),
});

type TwitterCardType = "summary" | "summary_large_image" | "app" | "player";

interface SEOEditorProps {
  initialData?: SEOMetadata;
  onSubmit: (data: SEOMetadata) => void;
  isLoading?: boolean;
}

const SEOEditor: React.FC<SEOEditorProps> = ({ 
  initialData, 
  onSubmit,
  isLoading = false
}) => {
  const form = useForm<z.infer<typeof seoFormSchema>>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      title: initialData?.title || "",
      description: initialData?.description || "",
      keywords: initialData?.keywords || [],
      ogTitle: initialData?.ogTitle || "",
      ogDescription: initialData?.ogDescription || "",
      ogImage: initialData?.ogImage || "",
      twitterCard: (initialData?.twitterCard as TwitterCardType) || "summary_large_image",
      canonicalUrl: initialData?.canonicalUrl || "",
    },
  });

  const handleSubmit = (values: z.infer<typeof seoFormSchema>) => {
    // Since we're using z.transform for keywords, values.keywords should always be an array at this point
    onSubmit({
      title: values.title,
      description: values.description,
      keywords: values.keywords as string[], // Type assertion since we know it's transformed to string[]
      ogTitle: values.ogTitle || values.title,
      ogDescription: values.ogDescription || values.description,
      ogImage: values.ogImage || "",
      twitterCard: values.twitterCard,
      twitterTitle: values.ogTitle || values.title,
      twitterDescription: values.ogDescription || values.description,
      canonicalUrl: values.canonicalUrl || "",
    });
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(handleSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Page Title" {...field} />
                  </FormControl>
                  <FormDescription>
                    Recommended length: 50-60 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Meta Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Brief description of the page content" 
                      {...field} 
                    />
                  </FormControl>
                  <FormDescription>
                    Recommended length: 150-160 characters
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <FormField
              control={form.control}
              name="keywords"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Keywords</FormLabel>
                  <FormControl>
                    <Input 
                      placeholder="keyword1, keyword2, keyword3" 
                      value={Array.isArray(field.value) ? field.value.join(', ') : field.value}
                      onChange={(e) => field.onChange(e.target.value)}
                    />
                  </FormControl>
                  <FormDescription>
                    Comma-separated keywords relevant to the content
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Open Graph Settings</h3>
              
              <FormField
                control={form.control}
                name="ogTitle"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>OG Title (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="Title for social media sharing" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      If left empty, the meta title will be used
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ogDescription"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>OG Description (Optional)</FormLabel>
                    <FormControl>
                      <Textarea 
                        placeholder="Description for social media sharing" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      If left empty, the meta description will be used
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="ogImage"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>OG Image URL (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/image.jpg" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Image to display when shared on social media
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <div className="border-t pt-4">
              <h3 className="text-lg font-medium mb-4">Additional Settings</h3>
              
              <FormField
                control={form.control}
                name="twitterCard"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Twitter Card Type</FormLabel>
                    <FormControl>
                      <select
                        className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                        {...field}
                      >
                        <option value="summary">Summary</option>
                        <option value="summary_large_image">Summary with Large Image</option>
                        <option value="app">App</option>
                        <option value="player">Player</option>
                      </select>
                    </FormControl>
                    <FormDescription>
                      Controls how content appears when shared on Twitter
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="canonicalUrl"
                render={({ field }) => (
                  <FormItem className="mt-4">
                    <FormLabel>Canonical URL (Optional)</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="https://example.com/page" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      The preferred URL for this content if multiple URLs exist
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
            
            <Button type="submit" disabled={isLoading}>
              {isLoading ? "Saving..." : "Save SEO Settings"}
            </Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SEOEditor;
