import { ParseResult } from 'papaparse';

interface ProjectSchema {
  id: string;
  userId: string;
  name: string;
  description: string;
  stories?: { content: string; tone: string }[];
  data: {
    fields: string[];
    file_url: string | null;
    file_size: string;
    file_name: string;
    insight?: string;
  };
  template?: { editor: string; content: string };
  chat_logs: [
    { role: 'user' | 'system' | 'function' | 'assistant'; content: string }
  ];
  createdAt: Date;
  updatedAt: Date;
}

type NewProjectFormInputs = {
  name: string;
  description: string;
};

type ProjectDataType = {
  parsed: ParseResult<any>;
};

interface ProjectStore {
  currentTab: string;
  projectData: ProjectDataType | null;
  status: { id: number; text: string; complete: boolean }[];
  template: { editor: string; content: string };
  updateData: ProjectUpdateDataType | null;
  data_url: string;
  setTemplate: (template: { editor: string; content: string }) => void;
  setStatus: (id: number, status: boolean) => void;
  setProjectData: (projectData: ProjectDataType) => void;
  setCurrentTab: (currentTab: string) => void;
  setUpdateData: (updateData: any) => void;
  setDataUrl: (dataUrl: string) => void;
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
