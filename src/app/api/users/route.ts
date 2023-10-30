import prisma from '@/src/server/db';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { LocalCustomResponse } from '@/src/typescript/server';

export async function GET(request: NextRequest) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'get-single-user';

  const session = await getServerSession();
  // console.trace(session);

  if (!session?.user) throw new Error('Unauthorized');

  try {
    const user = await prisma.user.findUnique({
      where: { email: session.user.email },
    });
    QueryResponse = {
      data: user,
      action,
      message: 'Found single user',
    };
  } catch (error) {
    QueryResponse = {
      data: null,
      action,
      message: 'Failed to find user',
    };
  }

  return NextResponse.json(QueryResponse);
}
