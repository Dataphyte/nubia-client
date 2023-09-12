'use client';

import React, { useEffect, ReactNode } from 'react';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';

const AuthLayout = ({ children }: { children: ReactNode }) => {
  const { status: sessionStatus } = useSession();
  const router = useRouter();
  useEffect(() => {
    sessionStatus === 'authenticated' && router.replace('/tool/dashboard');
  }, [sessionStatus]);

  return <div>{children}</div>;
};

export default AuthLayout;
