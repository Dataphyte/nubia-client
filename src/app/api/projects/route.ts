import { NextResponse } from 'next/server';
import prisma from '@/src/server/db';
import { NewProjectFormInputs } from '@/src/typescript/project';
import { LocalCustomResponse } from '@/src/typescript/server';

export async function POST(request: Request) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'create-new-project';
  const projectData = await request.json();

  try {
    const newProject = await prisma.project.create({ data: projectData });
    QueryResponse = {
      data: newProject,
      message: `created new project with name ${projectData.name}`,
      action,
    };
  } catch (error) {
    QueryResponse = { message: 'Failed to create project', data: null, action };
  }

  return NextResponse.json(QueryResponse);
}

export async function GET(request: Request) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'get-project-list';
  const { searchParams } = new URL(request.url);
  const user_id: string = searchParams.get('session_id') as string;

  try {
    const projects = await prisma.project.findMany({
      where: { userId: user_id },
    });
    QueryResponse = {
      message: 'Get project list success',
      data: projects,
      action,
    };
  } catch (error) {
    console.log(error);
    QueryResponse = {
      message: 'Error getting project list',
      data: null,
      action,
    };
  }

  return NextResponse.json(QueryResponse);
}
