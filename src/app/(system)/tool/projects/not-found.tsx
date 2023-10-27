'use client';

import React from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const NotFound = () => {
  const router = useRouter();
  return (
    <main className='grid min-h-full place-items-center bg-white px-6 py-24 sm:py-32 lg:px-8'>
      <div className='text-center'>
        {/* @ts-ignore */}
        <lord-icon
          src='https://cdn.lordicon.com/tdrtiskw.json'
          trigger='loop'
          colors='primary:#121331,secondary:#6d28d9'
          style={{ width: '100px', height: '100px' }}
        />
        <p className='text-base font-semibold text-violet-dark'>4 0 4</p>
        <h1 className='mt-4 text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl'>
          Project not found
        </h1>
        <p className='mt-6 text-base leading-7 text-gray-600'>
          Sorry, this project doesn&apos;t exist on your account
        </p>
        <div className='mt-10 flex items-center justify-center gap-x-6'>
          <p
            className='rounded-md bg-violet-dark px-5 py-2.5 text-sm font-semibold text-white-off shadow-sm hover:bg-violet-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-dark cursor-pointer'
            onClick={() => router.replace('/tool/dashboard')}
          >
            Go to Dashboard
          </p>
          <Link
            href='/tool/projects'
            className='text-sm font-semibold text-text-light hover:text-violet-main cursor-pointer'
          >
            Project list <span aria-hidden='true'>&rarr;</span>
          </Link>
        </div>
        <span className='text-xs text-text-light mt-24 flex gap-2 items-end'>
          <p>If you&apos;re sure you have this project on your profile,</p>
          <p className='text-sm'>
            <strong> Refresh this page</strong>
          </p>
        </span>
      </div>
    </main>
  );
};

export default NotFound;
