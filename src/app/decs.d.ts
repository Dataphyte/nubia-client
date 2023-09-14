import NextAuth from 'next-auth';

declare type IconProps = {
  sx?: string;
  fill?: string;
  action?: () => void;
};

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
    } & DefaultSession['user'];
  }
}

declare interface ProjectSchema {
  id: string;
  user: string;
  name: string;
  description: string;
  stories?: any[];
  dataurl?: string;
  template?: string;
  features?: ant[];
  createdAt: string;
  updatedAt: string;
}

declare type NewProjectFormInputs = {
  name: string;
  description: string;
};
