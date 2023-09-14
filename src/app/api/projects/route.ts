import { NextResponse } from 'next/server';
import prisma from '@/src/server/db';

export async function POST(request: Request) {
  const projectData = await request.json();

  try {
    const newProject = await prisma.project.create({ data: projectData });
    return NextResponse.json({ data: newProject });
  } catch (error) {
    console.log(error);
    return NextResponse.json({ message: 'Failed to create project' });
  }
}

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const user_id: string = searchParams.get('session_id') as string;
  console.log(user_id);

  try {
    const projects = await prisma.project.findMany({
      where: { userId: user_id },
    });
    return NextResponse.json(projects);
  } catch (error) {
    console.log(error);
    return NextResponse.json({ status: 'error' });
  }
}
