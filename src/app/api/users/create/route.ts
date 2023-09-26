import { CustomResponse } from '@/src/typescript/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import prisma from '@/src/server/db';

interface NewUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  account_type: 'individual' | 'organization';
}

export async function POST(request: Request) {
  let Query: CustomResponse;

  const userDetails: NewUser = await request.json();
  delete userDetails.confirmPassword;

  const { firstname, lastname, account_type, email, password } = userDetails;
  const exists = await prisma.user.findUnique({
    where: { email: email },
  });
  if (!exists) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await prisma.user.create({
      data: {
        name: `${firstname} ${lastname}`,
        email,
        emailVerified: null,
        password: hashedPassword,
        account_type: account_type || 'individual',
      },
    });

    Query = {
      data: User,
      message: 'User created successfully',
      action: 'create',
    };
    return NextResponse.json(Query);
  } else {
    Query = {
      data: null,
      message: 'User email exists',
      action: 'Create user',
    };
    return NextResponse.json(Query);
  }
}
