import { NextResponse } from 'next/server';
import prisma from '@/src/server/db';

export async function GET(
  request: Request,
  { params }: { params: { id: string } }
) {
  const id = params.id;

  try {
    const project = await prisma.project.findUnique({ where: { id } });
    return NextResponse.json(project);
  } catch (error) {
    return NextResponse.json({ message: 'Failed to get project' });
  }
}
