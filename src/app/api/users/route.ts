import prisma from '@/src/server/db';
import { getServerSession } from 'next-auth';
import { NextResponse, NextRequest } from 'next/server';
import { LocalCustomResponse } from '@/src/typescript/server';

// ======= GET REQUEST -->
export async function GET(request: NextRequest) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'get-single-user';

  const session = await getServerSession();

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

// ======= PUT REQUEST -->
export async function PUT(request: NextRequest) {
  let QueryResponse: LocalCustomResponse<any | null>;
  const action = 'update-single-user';
  const userData = await request.json();
  const url = new URL(request.url);
  const id = url.searchParams.get('id');

  console.log(userData);

  // console.log({ userData, id });

  const session = await getServerSession();

  if (!session?.user) throw new Error('unAuthorized');

  try {
    QueryResponse = {
      message: 'update single user success',
      action,
      data: await prisma.user.update({
        where: { id: id as string },
        data: { name: userData.name, account_type: userData.account_type },
      }),
    };
  } catch (error) {
    QueryResponse = {
      message: error.message,
      action,
      data: null,
    };
  }

  return NextResponse.json(QueryResponse);
}
