
import React, { createContext, useContext, useState, useEffect } from 'react';
import type { ThemeTemplate, TemplateType } from '@/types/theme';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';

// Sample default templates
const defaultTemplates: ThemeTemplate[] = [
  {
    id: '1',
    name: 'Default Header',
    type: 'header',
    content: '<header><div class="container mx-auto px-4 py-4"><div class="flex items-center justify-between"><div class="text-2xl font-bold">Default Header</div></div></div></header>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '2',
    name: 'Default Footer',
    type: 'footer',
    content: '<footer><div class="container mx-auto px-4 py-8"><div class="text-center">Default Footer</div></div></footer>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '3',
    name: 'Default Single Blog Post',
    type: 'single_post',
    content: '<div class="container mx-auto px-4"><article><h1 class="text-3xl font-bold">Default Blog Post Template</h1><div class="prose"></div></article></div>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '4',
    name: 'Default 404 Page',
    type: 'error_404',
    content: '<div class="container mx-auto px-4 py-12 text-center"><h1 class="text-6xl font-bold">404</h1><p class="text-xl mt-4">Page not found</p></div>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '5',
    name: 'Default Single Product',
    type: 'single_product',
    content: '<div class="container mx-auto px-4"><div class="grid grid-cols-1 md:grid-cols-2 gap-8"><div class="product-image"></div><div class="product-details"></div></div></div>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '6',
    name: 'Default Products Archive',
    type: 'products_archive',
    content: '<div class="container mx-auto px-4"><h1 class="text-2xl font-bold mb-4">Products</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6 products-grid"></div></div>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '7',
    name: 'Default Posts Archive',
    type: 'posts_archive',
    content: '<div class="container mx-auto px-4"><h1 class="text-2xl font-bold mb-4">Blog Posts</h1><div class="grid grid-cols-1 md:grid-cols-3 gap-6 posts-grid"></div></div>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  },
  {
    id: '8',
    name: 'Default Cart Page',
    type: 'cart_page',
    content: '<div class="container mx-auto px-4"><h1 class="text-2xl font-bold mb-4">Shopping Cart</h1><div class="cart-items"></div><div class="cart-summary mt-6"></div></div>',
    isActive: true,
    lastModified: new Date().toISOString(),
    createdAt: new Date().toISOString()
  }
];

interface ThemeBuilderContextType {
  templates: ThemeTemplate[];
  activeTemplate: ThemeTemplate | null;
  setActiveTemplate: (template: ThemeTemplate | null) => void;
  createTemplate: (template: Omit<ThemeTemplate, 'id' | 'createdAt' | 'lastModified'>) => Promise<ThemeTemplate>;
  updateTemplate: (id: string, updates: Partial<ThemeTemplate>) => Promise<ThemeTemplate>;
  deleteTemplate: (id: string) => Promise<void>;
  getTemplateByType: (type: TemplateType) => ThemeTemplate | undefined;
  loading: boolean;
}

const ThemeBuilderContext = createContext<ThemeBuilderContextType | undefined>(undefined);

export function ThemeBuilderProvider({ children }: { children: React.ReactNode }) {
  const [templates, setTemplates] = useState<ThemeTemplate[]>([]);
  const [activeTemplate, setActiveTemplate] = useState<ThemeTemplate | null>(null);
  const [loading, setLoading] = useState(true);
  const { toast } = useToast();

  useEffect(() => {
    const loadTemplates = async () => {
      try {
        setLoading(true);
        
        // Try to get templates from Supabase
        const { data, error } = await supabase
          .from('theme_templates')
          .select('*');
        
        if (error) {
          console.error("Error loading templates:", error);
          // If failed, use default templates
          setTemplates(defaultTemplates);
        } else if (data && data.length > 0) {
          setTemplates(data as ThemeTemplate[]);
        } else {
          // No templates found in database, use defaults
          setTemplates(defaultTemplates);
        }
      } catch (error) {
        console.error("Error loading templates:", error);
        setTemplates(defaultTemplates);
      } finally {
        setLoading(false);
      }
    };
    
    loadTemplates();
  }, []);

  const createTemplate = async (templateData: Omit<ThemeTemplate, 'id' | 'createdAt' | 'lastModified'>) => {
    const now = new Date().toISOString();
    const newTemplate: ThemeTemplate = {
      ...templateData,
      id: `template_${Date.now()}`,
      createdAt: now,
      lastModified: now,
    };
    
    try {
      // Try to save to Supabase
      const { error } = await supabase
        .from('theme_templates')
        .insert(newTemplate);
        
      if (error) throw error;
      
      setTemplates(prev => [...prev, newTemplate]);
      toast({ title: "Template created", description: `Template "${newTemplate.name}" has been created` });
      return newTemplate;
    } catch (error) {
      console.error("Error creating template:", error);
      // Still update local state even if Supabase fails
      setTemplates(prev => [...prev, newTemplate]);
      return newTemplate;
    }
  };

  const updateTemplate = async (id: string, updates: Partial<ThemeTemplate>) => {
    const updatedTemplate = {
      ...updates,
      lastModified: new Date().toISOString(),
    };
    
    try {
      // Try to update in Supabase
      const { error } = await supabase
        .from('theme_templates')
        .update(updatedTemplate)
        .eq('id', id);
        
      if (error) throw error;
      
      const updated = templates.map(t => 
        t.id === id ? { ...t, ...updatedTemplate } : t
      );
      
      setTemplates(updated);
      toast({ title: "Template updated", description: "Your changes have been saved" });
      return updated.find(t => t.id === id) as ThemeTemplate;
    } catch (error) {
      console.error("Error updating template:", error);
      // Still update local state even if Supabase fails
      const updated = templates.map(t => 
        t.id === id ? { ...t, ...updatedTemplate } : t
      );
      
      setTemplates(updated);
      return updated.find(t => t.id === id) as ThemeTemplate;
    }
  };

  const deleteTemplate = async (id: string) => {
    try {
      // Try to delete from Supabase
      const { error } = await supabase
        .from('theme_templates')
        .delete()
        .eq('id', id);
        
      if (error) throw error;
      
      setTemplates(prev => prev.filter(t => t.id !== id));
      
      if (activeTemplate?.id === id) {
        setActiveTemplate(null);
      }
      
      toast({ title: "Template deleted", description: "The template has been removed" });
    } catch (error) {
      console.error("Error deleting template:", error);
      // Still update local state even if Supabase fails
      setTemplates(prev => prev.filter(t => t.id !== id));
      
      if (activeTemplate?.id === id) {
        setActiveTemplate(null);
      }
    }
  };

  const getTemplateByType = (type: TemplateType) => {
    // Find active template of the given type
    return templates.find(t => t.type === type && t.isActive);
  };

  const contextValue = {
    templates,
    activeTemplate,
    setActiveTemplate,
    createTemplate,
    updateTemplate,
    deleteTemplate,
    getTemplateByType,
    loading,
  };

  return (
    <ThemeBuilderContext.Provider value={contextValue}>
      {children}
    </ThemeBuilderContext.Provider>
  );
}

export function useThemeBuilder() {
  const context = useContext(ThemeBuilderContext);
  if (!context) {
    throw new Error("useThemeBuilder must be used within ThemeBuilderProvider");
  }
  return context;
}
