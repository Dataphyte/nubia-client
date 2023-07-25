'use client';

import React, { useState } from 'react';
import Link from 'next/link';

//=============================================>
// ======= Main component -->
//=============================================>
const AuthPage = () => {
  const [authAction, setAuthAction] = useState('signin');

  return (
    <div className='w-full h-screen min-h-400px bg-white-off flex items-center flex-col justify-center'>
      <div className='flex flex-col gap-3'>
        <div className='font-magistral'>
          <h1 className='font-bold text-3xl'>Sign in to your Account</h1>
          <p className='font-light mt-1.5'>
            Don't have an account?&nbsp;
            <Link className='inline-link' href='#'>
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
              autoComplete='password'
              className='form__input'
            />
          </div>
          {/* --- Submit Button  ----->*/}
          <button
            type='submit'
            className='bg-violet-main text-white-off text-lg shadow rounded-md py-2 px-14 mt-3 w-max'
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
