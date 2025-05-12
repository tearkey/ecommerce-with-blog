
import React, { useState } from "react";
import { useThemeBuilder } from "@/context/ThemeBuilderContext";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/components/ui/use-toast";
import { FileEdit, Trash2, Plus, Save, Eye, ArrowLeft, Pencil } from "lucide-react";
import { ThemeTemplate, TemplateType } from "@/types/theme";

// Type labels for UI display
const templateTypeLabels: Record<TemplateType, string> = {
  header: "Header",
  footer: "Footer",
  single_post: "Single Blog Post",
  error_404: "Error 404",
  single_product: "Single Product",
  products_archive: "Products Archive",
  posts_archive: "Blog Archive",
  cart_page: "Cart Page"
};

interface TemplateFormData {
  name: string;
  type: TemplateType;
  content: string;
  isActive: boolean;
}

const ThemeBuilder = () => {
  const { templates, createTemplate, updateTemplate, deleteTemplate, setActiveTemplate, activeTemplate } = useThemeBuilder();
  const [editMode, setEditMode] = useState<boolean>(false);
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [currentTab, setCurrentTab] = useState<TemplateType>("header");
  const [formData, setFormData] = useState<TemplateFormData>({
    name: "",
    type: "header",
    content: "",
    isActive: true
  });
  const { toast } = useToast();

  const handleTabChange = (type: TemplateType) => {
    setCurrentTab(type);
  };

  const handleCreate = () => {
    setFormData({
      name: `New ${templateTypeLabels[currentTab]}`,
      type: currentTab,
      content: "",
      isActive: false
    });
    setEditMode(true);
    setShowDialog(true);
  };

  const handleEdit = (template: ThemeTemplate) => {
    setActiveTemplate(template);
    setFormData({
      name: template.name,
      type: template.type,
      content: template.content,
      isActive: template.isActive
    });
    setEditMode(true);
    setShowDialog(true);
  };

  const handlePreview = (template: ThemeTemplate) => {
    setActiveTemplate(template);
    // In a real app, you would navigate to a preview page or show a preview modal
    toast({
      title: "Preview Mode",
      description: `Previewing "${template.name}" template`,
    });
  };

  const handleSave = async () => {
    try {
      if (activeTemplate && editMode) {
        // Update existing template
        await updateTemplate(activeTemplate.id, formData);
        toast({
          title: "Template Updated",
          description: `"${formData.name}" has been updated successfully`,
        });
      } else {
        // Create new template
        await createTemplate(formData);
        toast({
          title: "Template Created",
          description: `"${formData.name}" has been created successfully`,
        });
      }
      setShowDialog(false);
      setEditMode(false);
      setActiveTemplate(null);
    } catch (error) {
      console.error("Error saving template:", error);
      toast({
        title: "Error",
        description: "Failed to save template. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleDelete = async (templateId: string, templateName: string) => {
    if (confirm(`Are you sure you want to delete "${templateName}"?`)) {
      await deleteTemplate(templateId);
    }
  };

  const handleChange = (field: keyof TemplateFormData, value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const filteredTemplates = templates.filter(t => t.type === currentTab);

  return (
    <div className="theme-builder">
      <Card>
        <CardHeader>
          <CardTitle className="flex justify-between items-center">
            <span>Theme Builder</span>
            <Button onClick={handleCreate}>
              <Plus className="mr-2 h-4 w-4" />
              Create Template
            </Button>
          </CardTitle>
        </CardHeader>
        <CardContent>
          <Tabs defaultValue="header" value={currentTab} onValueChange={(value) => handleTabChange(value as TemplateType)}>
            <TabsList className="grid grid-cols-2 md:grid-cols-4 mb-6">
              <TabsTrigger value="header">Header</TabsTrigger>
              <TabsTrigger value="footer">Footer</TabsTrigger>
              <TabsTrigger value="single_post">Blog Post</TabsTrigger>
              <TabsTrigger value="error_404">404 Page</TabsTrigger>
              <TabsTrigger value="single_product">Product</TabsTrigger>
              <TabsTrigger value="products_archive">Products Archive</TabsTrigger>
              <TabsTrigger value="posts_archive">Blog Archive</TabsTrigger>
              <TabsTrigger value="cart_page">Cart Page</TabsTrigger>
            </TabsList>

            {Object.keys(templateTypeLabels).map((type) => (
              <TabsContent key={type} value={type}>
                <div className="grid gap-4">
                  {filteredTemplates.length > 0 ? (
                    filteredTemplates.map(template => (
                      <Card key={template.id} className={template.isActive ? "border-primary" : ""}>
                        <CardContent className="pt-6">
                          <div className="flex justify-between items-center">
                            <div>
                              <h3 className="text-lg font-medium">{template.name}</h3>
                              <div className="flex items-center gap-2 mt-1 text-sm text-muted-foreground">
                                Last modified: {new Date(template.lastModified).toLocaleDateString()}
                                {template.isActive && (
                                  <Badge variant="outline" className="ml-2">Active</Badge>
                                )}
                              </div>
                            </div>
                            <div className="flex gap-2">
                              <Button size="sm" variant="outline" onClick={() => handlePreview(template)}>
                                <Eye className="h-4 w-4" />
                              </Button>
                              <Button size="sm" variant="outline" onClick={() => handleEdit(template)}>
                                <FileEdit className="h-4 w-4" />
                              </Button>
                              <Button 
                                size="sm" 
                                variant="destructive" 
                                onClick={() => handleDelete(template.id, template.name)}
                              >
                                <Trash2 className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))
                  ) : (
                    <div className="text-center py-10 text-muted-foreground">
                      <p>No {templateTypeLabels[currentTab as TemplateType]} templates yet.</p>
                      <Button onClick={handleCreate} className="mt-4">
                        <Plus className="mr-2 h-4 w-4" />
                        Create {templateTypeLabels[currentTab as TemplateType]} Template
                      </Button>
                    </div>
                  )}
                </div>
              </TabsContent>
            ))}
          </Tabs>
        </CardContent>
      </Card>

      <Dialog open={showDialog} onOpenChange={setShowDialog}>
        <DialogContent className="max-w-4xl">
          <DialogHeader>
            <DialogTitle>{editMode ? "Edit Template" : "Create Template"}</DialogTitle>
          </DialogHeader>
          <div className="grid gap-4 py-4">
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Name</label>
              <Input 
                className="col-span-3" 
                value={formData.name} 
                onChange={(e) => handleChange("name", e.target.value)} 
              />
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Type</label>
              <Select 
                value={formData.type} 
                onValueChange={(value) => handleChange("type", value)}
                disabled={editMode}
              >
                <SelectTrigger className="col-span-3">
                  <SelectValue placeholder="Select template type" />
                </SelectTrigger>
                <SelectContent>
                  {Object.entries(templateTypeLabels).map(([value, label]) => (
                    <SelectItem key={value} value={value}>{label}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            
            <div className="grid grid-cols-4 items-center gap-4">
              <label className="text-right">Active</label>
              <div className="col-span-3">
                <input 
                  type="checkbox" 
                  checked={formData.isActive} 
                  onChange={(e) => handleChange("isActive", e.target.checked)} 
                />
              </div>
            </div>
            
            <div className="grid grid-cols-4 gap-4">
              <label className="text-right">Content</label>
              <Textarea 
                className="col-span-3" 
                rows={10} 
                value={formData.content} 
                onChange={(e) => handleChange("content", e.target.value)}
                placeholder="HTML content for the template"
              />
            </div>
          </div>
          <DialogFooter>
            <Button variant="outline" onClick={() => setShowDialog(false)}>Cancel</Button>
            <Button onClick={handleSave}>
              <Save className="mr-2 h-4 w-4" />
              Save Template
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default ThemeBuilder;
