import { ObjectId } from 'mongoose';
import { NextResponse } from 'next/server';

declare interface CustomResponse {
  data: any;
  message: string;
  action: string;
}

declare interface CustomResponse {
  message: string;
  data: any | null;
}
