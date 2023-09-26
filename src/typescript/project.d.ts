import { ParseResult } from 'papaparse';

interface ProjectSchema {
  id: string;
  userId: string;
  name: string;
  description: string;
  stories?: { content: string; tone: string }[];
  data: {
    fields: string;
    file_url: string | null;
    file_size: string;
  };
  template?: string | null;
  features?: ProjectFeatureType[];
  createdAt: Date;
  updatedAt: Date;
}

type NewProjectFormInputs = {
  name: string;
  description: string;
};

type ProjectDataType = {
  parsed: ParseResult<any>;
  contents: string;
  details: { fileName: string; fileSize: string };
};

type ProjectFeatureType = {
  name: string;
  fieldType: 'data' | 'custom';
  fieldRef?: string;
  formula: [
    {
      type: 'data' | 'custom';
      field?: string;
      value?: string;
      operand: '+' | '-' | '*' | '/' | null;
    }
  ];
};

interface ProjectStore {
  currentTab: string;
  projectData: ProjectDataType | null;
  status: { id: number; text: string; complete: boolean }[];
  template: string;
  features: ProjectFeatureType[];
  setFeatures: (features: any[]) => void;
  editFeatures: (action: string, data: any, id: number) => void;
  setTemplate: (template: string) => void;
  setStatus: (id: number, status: boolean) => void;
  setProjectData: (projectData: ProjectDataType) => void;
  setCurrentTab: (currentTab: string) => void;
}

//=============================================>
// ======= EXPORTS -->
//=============================================>
export {
  ProjectStore,
  ProjectSchema,
  NewProjectFormInputs,
  ProjectDataType,
  ProjectFeatureType,
};
