import { NextResponse } from 'next/server';
import prisma from '@/src/server/db';
import { ProjectSchema } from '@/src/typescript/project';

type RequestParams = { params: { id: string } };

export async function GET(request: Request, { params }: RequestParams) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'get-single-project';
  const id = params.id;

  try {
    QueryResponse = {
      message: 'Found project',
      data: await prisma.project.findUnique({ where: { id } }),
      action,
    };
  } catch (error) {
    QueryResponse = {
      message: 'Project not found',
      data: null,
      action,
    };
  }

  return NextResponse.json(QueryResponse);
}
