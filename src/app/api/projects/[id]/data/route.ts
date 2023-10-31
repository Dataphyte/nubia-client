import { NextRequest, NextResponse } from 'next/server';
import Papa from 'papaparse';

// TODO uninstall stream-to-blob

export async function GET(request: NextRequest, { params }) {
  const action = 'get-project-data';
  const urlParams = request.nextUrl.searchParams;
  const dataPath: string = urlParams.get('dataPath') as string;

  console.log(dataPath);

  return NextResponse.json({ message: 'This route has been called' });
}
