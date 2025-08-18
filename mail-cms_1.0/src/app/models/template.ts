export interface Page {
  name: string;
  component: string;
}

export interface TemplateData {
  pages: Page[];
}

export interface Template {
  id?: string;
  name: string;
  data: TemplateData;
}

export interface SearchTagsType {
    id: string;
    name: string;
    title: string;
    subtitle: string[];
    color: string;
    image: string;
    component: object;
}

export interface EmailTemplates{
  name: string;
  component: string;
}
