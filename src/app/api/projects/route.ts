import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  return NextResponse.json({ messgae: 'No new projects here' });
}
