import { NextResponse, NextRequest } from 'next/server';
import prisma from '@/src/server/db';
import { ProjectSchema } from '@/src/typescript/project';
import { getServerSession } from 'next-auth';
import { LocalCustomResponse } from '@/src/typescript/server';

type RequestParams = { params: { id: string } };

export async function GET(request: NextRequest, { params }: RequestParams) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'get-single-project';
  const projectId = params.id;

  const session = await getServerSession();

  if (!session?.user) throw new Error('Unauthorized');

  try {
    QueryResponse = {
      message: 'Found project',
      data: await prisma.project.findUnique({ where: { id: projectId } }),
      action,
    };
  } catch (error) {
    QueryResponse = {
      message: error.message,
      data: null,
      action,
    };
  }

  return NextResponse.json(QueryResponse);
}

export async function PUT(request: NextRequest, { params }: RequestParams) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'update-single-project';
  const projectId = params.id;
  const updateData = await request.json();
  console.log(updateData);
  const session = await getServerSession();

  if (!session?.user) throw new Error('Unauthorized');

  try {
    QueryResponse = {
      message: 'Project updated',
      data: await prisma.project.update({
        where: { id: projectId },
        data: updateData,
      }),
      action,
    };
  } catch (error) {
    QueryResponse = {
      message: error.message,
      data: null,
      action,
    };
  }

  return NextResponse.json(QueryResponse);
}
