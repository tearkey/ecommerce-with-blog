
import React from "react";
import { useThemeBuilder } from "@/context/ThemeBuilderContext";
import { TemplateType } from "@/types/theme";

interface ThemeTemplateProps {
  type: TemplateType;
}

const ThemeTemplate: React.FC<ThemeTemplateProps> = ({ type }) => {
  const { getTemplateByType } = useThemeBuilder();
  const template = getTemplateByType(type);
  
  if (!template) {
    return null;
  }
  
  return (
    <div 
      className="theme-template" 
      dangerouslySetInnerHTML={{ __html: template.content }} 
    />
  );
};

export default ThemeTemplate;
