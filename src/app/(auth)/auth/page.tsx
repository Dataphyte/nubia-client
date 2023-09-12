'use client';

import Link from 'next/link';
import React, { ReactNode, useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useForm, SubmitHandler } from 'react-hook-form';
import { signIn } from 'next-auth/react';

type Inputs = {
  email: string;
  password: string;
};

//=============================================>
// ======= Main component -->
//=============================================>
const AuthPage = (): ReactNode => {
  const router = useRouter();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isLoading },
  } = useForm<Inputs>();

  // ======= handle submit form  -->
  const onSubmit: SubmitHandler<Inputs> = (data) => {
    signIn('credentials', {
      email: data.email,
      password: data.password,
      redirect: false,
    });
  };

  return (
    <div className='w-full h-screen min-h-400px bg-white-off flex items-center flex-col justify-center'>
      <div className='w-full md:w-max first-letter:flex flex-col gap-3 bg-white-main py-12 px-7 rounded-lg shadow-md'>
        <div className='font-magistral'>
          <h1 className='font-bold text-3xl'>Sign in to your Account</h1>
          <p className='font-light mt-1.5'>
            Don&apos;t have an account?&nbsp;
            <Link className='inline-link' href='auth/signup'>
              Create a new account
            </Link>
          </p>
        </div>
        <form
          className='w-[400px] flex flex-col py-2 gap-3 mt-5'
          onSubmit={handleSubmit(onSubmit)}
        >
          {/* -- Email */}
          <div className='w-full flex flex-col justify-start gap-2'>
            <label htmlFor='email'>Email</label>
            <input
              type='text'
              defaultValue=''
              {...register('email')}
              autoComplete='email'
              className='form__input'
            />
          </div>
          {/* -- Password */}
          <div className='w-full flex flex-col justify-start gap-1'>
            <label htmlFor='password'>Password</label>
            <input
              type='password'
              defaultValue=''
              {...register('password', { required: true })}
              autoComplete='password'
              className='form__input'
            />
            {errors.password && <span>This field is required</span>}
          </div>
          <span className='flex w-full justify-between items-center'>
            {/* --- Submit Button  ----->*/}
            <button
              type='submit'
              className='bg-violet-main text-white-off shadow rounded-md py-1.5 px-14 mt-3 w-max'
            >
              {isLoading ? 'loading...' : 'Login'}
            </button>

            <button
              type='button'
              className='bg-green-main text-white-off shadow rounded-md py-1.5 px-14 mt-3 w-max'
              onClick={() => router.push('/')}
            >
              Home
            </button>
          </span>
        </form>
      </div>
    </div>
  );
};

export default AuthPage;
