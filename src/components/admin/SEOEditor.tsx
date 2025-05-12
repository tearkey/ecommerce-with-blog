
import React from 'react';
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import type { SEOMetadata } from "@/types/seo";

interface SEOEditorProps {
  initialData?: Partial<SEOMetadata>;
  onSave: (data: SEOMetadata) => void;
}

const seoFormSchema = z.object({
  title: z.string().min(1, "Title is required").max(70, "Title should be 70 characters or less"),
  description: z.string().max(160, "Description should be 160 characters or less"),
  keywords: z.string()
    .transform((val) => val.split(',').map(k => k.trim()).filter(Boolean)),
  ogTitle: z.string().max(65, "Open Graph title should be 65 characters or less").optional(),
  ogDescription: z.string().max(155, "Open Graph description should be 155 characters or less").optional(),
  ogImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  twitterTitle: z.string().max(65, "Twitter title should be 65 characters or less").optional(),
  twitterDescription: z.string().max(155, "Twitter description should be 155 characters or less").optional(),
  twitterImage: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  canonicalUrl: z.string().url("Must be a valid URL").optional().or(z.literal("")),
  noIndex: z.boolean().default(false),
  structuredData: z.string().optional()
    .refine(
      val => {
        if (!val || val.trim() === '') return true;
        try {
          JSON.parse(val);
          return true;
        } catch {
          return false;
        }
      },
      { message: "Invalid JSON format" }
    ),
});

type SeoFormValues = z.infer<typeof seoFormSchema>;

const SEOEditor = ({ initialData = {}, onSave }: SEOEditorProps) => {
  const form = useForm<SeoFormValues>({
    resolver: zodResolver(seoFormSchema),
    defaultValues: {
      title: initialData.title || "",
      description: initialData.description || "",
      // Convert array to comma-separated string for form input
      keywords: initialData.keywords ? initialData.keywords.join(", ") : "",
      ogTitle: initialData.ogTitle || "",
      ogDescription: initialData.ogDescription || "",
      ogImage: initialData.ogImage || "",
      twitterTitle: initialData.twitterTitle || "",
      twitterDescription: initialData.twitterDescription || "",
      twitterImage: initialData.twitterImage || "",
      canonicalUrl: initialData.canonicalUrl || "",
      noIndex: initialData.noIndex || false,
      structuredData: initialData.structuredData || "",
    },
  });

  function onSubmit(values: SeoFormValues) {
    onSave({
      title: values.title,
      description: values.description || "",
      // Fix the type error by ensuring keywords is always a string array
      keywords: Array.isArray(values.keywords) ? values.keywords : [],
      ogTitle: values.ogTitle,
      ogDescription: values.ogDescription,
      ogImage: values.ogImage,
      twitterTitle: values.twitterTitle,
      twitterDescription: values.twitterDescription,
      twitterImage: values.twitterImage,
      canonicalUrl: values.canonicalUrl,
      noIndex: values.noIndex,
      structuredData: values.structuredData,
    });
  }

  return (
    <Card className="mb-6">
      <CardHeader>
        <CardTitle>SEO Settings</CardTitle>
        <CardDescription>
          Optimize your content for search engines
        </CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <Tabs defaultValue="basic">
              <TabsList className="mb-4">
                <TabsTrigger value="basic">Basic SEO</TabsTrigger>
                <TabsTrigger value="social">Social Media</TabsTrigger>
                <TabsTrigger value="advanced">Advanced</TabsTrigger>
              </TabsList>

              <TabsContent value="basic" className="space-y-4">
                <FormField
                  control={form.control}
                  name="title"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>SEO Title</FormLabel>
                      <FormControl>
                        <Input placeholder="Enter SEO title" {...field} />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/70 characters
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
                          placeholder="Enter meta description" 
                          className="resize-none" 
                          rows={3} 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        {field.value.length}/160 characters
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
                          placeholder="Enter keywords separated by commas" 
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter keywords separated by commas
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>

              <TabsContent value="social" className="space-y-4">
                <div className="border-b pb-4 mb-4">
                  <h4 className="font-semibold mb-2">Open Graph (Facebook, LinkedIn)</h4>
                  
                  <FormField
                    control={form.control}
                    name="ogTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>OG Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Open Graph title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ogDescription"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>OG Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Open Graph description" 
                            className="resize-none" 
                            rows={2} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="ogImage"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>OG Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Recommended size: 1200x630 pixels
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>

                <div>
                  <h4 className="font-semibold mb-2">Twitter Card</h4>
                  
                  <FormField
                    control={form.control}
                    name="twitterTitle"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Twitter Title</FormLabel>
                        <FormControl>
                          <Input placeholder="Twitter title" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterDescription"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Twitter Description</FormLabel>
                        <FormControl>
                          <Textarea 
                            placeholder="Twitter description" 
                            className="resize-none" 
                            rows={2} 
                            {...field} 
                          />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />

                  <FormField
                    control={form.control}
                    name="twitterImage"
                    render={({ field }) => (
                      <FormItem className="mt-4">
                        <FormLabel>Twitter Image URL</FormLabel>
                        <FormControl>
                          <Input placeholder="https://example.com/image.jpg" {...field} />
                        </FormControl>
                        <FormDescription>
                          Recommended size: 1200x600 pixels
                        </FormDescription>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
              </TabsContent>

              <TabsContent value="advanced" className="space-y-4">
                <FormField
                  control={form.control}
                  name="canonicalUrl"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Canonical URL</FormLabel>
                      <FormControl>
                        <Input placeholder="https://example.com/page" {...field} />
                      </FormControl>
                      <FormDescription>
                        Set this if this page is a duplicate of another page
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="noIndex"
                  render={({ field }) => (
                    <FormItem className="flex flex-row items-start space-x-3 space-y-0 p-4 border rounded-md">
                      <FormControl>
                        <Checkbox
                          checked={field.value}
                          onCheckedChange={field.onChange}
                        />
                      </FormControl>
                      <div className="space-y-1 leading-none">
                        <FormLabel>No Index</FormLabel>
                        <FormDescription>
                          Prevent search engines from indexing this page
                        </FormDescription>
                      </div>
                    </FormItem>
                  )}
                />

                <FormField
                  control={form.control}
                  name="structuredData"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Structured Data (JSON-LD)</FormLabel>
                      <FormControl>
                        <Textarea 
                          placeholder='{"@context": "https://schema.org", "@type": "Article", ...}' 
                          className="font-mono text-sm h-36"
                          {...field} 
                        />
                      </FormControl>
                      <FormDescription>
                        Enter valid JSON-LD schema markup
                      </FormDescription>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </TabsContent>
            </Tabs>

            <Button type="submit">Save SEO Settings</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};

export default SEOEditor;
