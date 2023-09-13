import { ObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

// user types
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

declare interface CustomResponse {
  data: any;
  message: string;
  action: string;
}
