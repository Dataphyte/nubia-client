import { auth } from 'firebase-admin';
import { customInitApp } from '@/src/utils/firebase/fire-base-admin-config';
import { cookies, headers } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

customInitApp();

export async function POST(request, response) {
  const Authorization = headers().get('Authorization');

  if (Authorization?.startsWith('Bearer ')) {
    const idToken = Authorization.split('Bearer ')[1];
    const decodedToken = await auth().verifyIdToken(idToken);

    if (decodedToken) {
      const expiresIn = 60 * 60 * 24 * 5;
      const sessionCookie = await auth().createSessionCookie(idToken, {
        expiresIn,
      });

      const options = {
        name: 'session',
        value: sessionCookie,
        maxAge: expiresIn,
        httpOnly: true,
        secure: true,
      };

      cookies().set(options);
    }
  }

  return NextResponse.json({}, { status: 200 });
}

export async function GET(request) {
  const session = cookies().get('session')?.value || '';
  if (!session) return NextResponse.json({ isLogged: false }, { status: 401 });

  const decodedClaims = await auth().verifySessionCookie(session, true);

  if (!decodedClaims)
    return NextResponse.json({ isLogged: false }, { status: 401 });

  return NextResponse.json({ isLogged: true }, { status: 200 });
}
