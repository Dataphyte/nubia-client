import { CustomResponse, UserInterface } from '@/src/server/server';
import { NextResponse } from 'next/server';
import bcrypt from 'bcrypt';
import UserModel from '@/src/server/models/user.model';
import connectDB from '@/src/server/mongoose';

interface NewUser {
  firstname: string;
  lastname: string;
  email: string;
  password: string;
  confirmPassword?: string;
  account_type: 'individual' | 'organization';
}

connectDB();
export async function POST(request: Request) {
  let Query: CustomResponse;

  const userDetails: NewUser = await request.json();
  delete userDetails.confirmPassword;

  const { firstname, lastname, account_type, email, password } = userDetails;
  const exists = await UserModel.findOne({ email: email });

  if (!exists) {
    const hashedPassword = await bcrypt.hash(password, 10);
    const User = await UserModel.create({
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
