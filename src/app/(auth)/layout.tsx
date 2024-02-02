'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { data: session, status: sessionStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    sessionStatus === 'authenticated' && router.replace('/tool/dashboard');
  }, [session, sessionStatus]);

  return (
    <div>
      <div className='w-full py-3 flex itesm-center justify-center bg-gray-900 text-gray-50'>
        <p className='animate-pulse'>
          ⚠️ This is a test version of Nubia, Use random data to create
          accounts. ⚠️
        </p>
      </div>
      {children}
    </div>
  );
};

export default AuthLayout;
