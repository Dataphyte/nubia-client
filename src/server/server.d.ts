import { ObjectId } from 'mongoose';
import { NextResponse } from 'next/server';
import { ParseResult } from 'papaparse';

//========== MODEL INTERFACES ========>
// USER
declare interface UserInterface {
  name: string;
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  image?: string;
  emailVerified: boolean;
  accountType: 'individual' | 'organization';
  projects: Array<ObjectId>;
  organization?: {
    org_name: string;
    position: string;
    org_size: number;
    org_niche: string;
  };
}

// PROJECT
declare interface ProjectSchema {
  name: string;
  description: string;
  stories: { title: string; content: string; tone: 'base' | string }[];
  data: {
    parsed: ParseResult<string>;
    contents: string;
    details: { file_name: string; file_size: string };
    file_url: string;
  };
  template: string;
  features: {
    _id: ObjectId;
    name: string;
    type: 'data' | 'custom';
    field_ref: string;
    formula: string;
  }[];
  status: {
    id: number;
    text: string;
    complete: boolean;
  }[];
  user: ObjectId;
}

declare interface CustomResponse {
  data: any;
  message: string;
  action: string;
}
