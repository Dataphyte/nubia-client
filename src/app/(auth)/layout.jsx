'use client';

import React, { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { userStore } from '@/src/global/userStore';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
// import { app } from '@/src/utils/firebase';

const AuthLayout = ({ children }) => {
  const router = useRouter();
  //   const auth = window && getAuth(app);
  const { user, setUser } = userStore();

  useEffect(() => {
    // onAuthStateChanged(auth, (user) => {
    //   if (user) setUser(user);
    //   else router.replace('auth');
    //   return;
    // });
  });

  return <div>{children}</div>;
};

export default AuthLayout;
