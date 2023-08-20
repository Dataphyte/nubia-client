'use client';

import Link from 'next/link';
import React, { useState } from 'react';
import dynamic from 'next/dynamic';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { userStore } from '@/src/global/userStore';
import { auth } from '@/src/firebase';
import { useRouter } from 'next/navigation';

//=============================================>
// ======= Main component -->
//=============================================>
const AuthPage = () => {
  const { setUser } = userStore();
  const router = useRouter();
  const [authAction, setAuthAction] = useState('signin');
  const [userDetails, setUserDetails] = useState({ email: '', password: '' });
  // ======= handle login -->
  const handleSignin = async (e) => {
    e.preventDefault();
    signInWithEmailAndPassword(auth, userDetails.email, userDetails.password)
      .then((userCredentials) => {
        setUser(userCredentials.user);
        router.push('tool/dashboard');
      })
      .catch((err) => {
        console.log(err.message); // TODO: remove before push to prod env
        alert('Email or password wrong');
      });
  };

  return (
    <div className='w-full h-screen min-h-400px bg-white-off flex items-center flex-col justify-center'>
      <div className='flex flex-col gap-3'>
        <div className='font-magistral'>
          <h1 className='font-bold text-3xl'>Sign in to your Account</h1>
          <p className='font-light mt-1.5'>
            Don't have an account?&nbsp;
            <Link className='inline-link' href='auth/signup'>
              Create a new account
            </Link>
          </p>
        </div>
        <form className='w-[400px] flex flex-col py-2 gap-3 mt-5'>
          {/* -- Email */}
          <div className='w-full flex flex-col justify-start gap-2'>
            <label htmlFor='email'>Email</label>
            <input
              required
              type='email'
              name='email'
              value={userDetails.email}
              onChange={(e) =>
                setUserDetails((state) => ({ ...state, email: e.target.value }))
              }
              autoComplete='email'
              className='form__input'
            />
          </div>

          {/* -- Password */}
          <div className='w-full flex flex-col justify-start gap-1'>
            <label htmlFor='password'>Password</label>
            <input
              required
              type='password'
              name='password'
              value={userDetails.password}
              onChange={(e) =>
                setUserDetails((state) => ({
                  ...state,
                  password: e.target.value,
                }))
              }
              autoComplete='password'
              className='form__input'
            />
          </div>
          {/* --- Submit Button  ----->*/}
          <button
            type='submit'
            className='bg-violet-main text-white-off text-lg shadow rounded-md py-2 px-14 mt-3 w-max'
            onClick={handleSignin}
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
