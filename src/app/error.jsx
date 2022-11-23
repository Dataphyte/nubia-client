'use client';

import React from 'react';
import Link from 'next/link';

const Error = ({ error }) => {
  console.error(error);

  return (
    <div className='w-full h-screen flex items-center gap-5 justify-center flex-col bg-red-main text-white-off'>
      <p className='text-4xl font-black-ops text-white-off'>
        :( An Error occured
      </p>
      <Link
        href='/'
        className='py-2 px-8 rounded-lg shadow-xl border border-white-off'
      >
        Go Home
      </Link>
    </div>
  );
};

export default Error;
