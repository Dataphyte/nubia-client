'use client';

import React, { useEffect, useState } from 'react';
import { userStore } from '@/src/global/userStore';
import { useGetUser } from '@/src/hooks/queries/useUser';

const dataCards = [
  { name: 'Projects', stat: '71,897' },
  { name: 'Account Usage', stat: '58.16%' },
  { name: 'Stories Generated', stat: '24.57%' },
  { name: 'Insights generated', stat: '24.57%' },
];

const Dashboard = () => {
  const { data: queryUser } = useGetUser();
  const { setUser, user } = userStore();

  useEffect(() => {
    user && setUser(queryUser.data);
    user && console.log(user.data);
  }, [queryUser]);

  return (
    <div className='w-full py-5 px-2 md:px-5 grid grid-cols-4 gap-7'>
      {/* -- section 1 */}
      {/* -- profile card */}
      <div className='col-span-4 md:col-span-2 h-auto rounded-md shadow-md bg-white-main border p-5 flex flex-col gap-3 justify-between'>
        <>
          <p className='text-lg font-bold text-text-light'>
            Complete your profile
          </p>
          <div className='w-full h-[1px] -mt-3.5 bg-gray-300' />
        </>
        {user ? (
          <span className='text-sm'>
            <p>Email Verified: {user.email_verified ? '✅' : '❌'} </p>
            <p>profile image: </p>
            <p>Password: </p>
            <p>Preferences: </p>
          </span>
        ) : (
          'Loading...'
        )}
        <button className='w-max bg-violet-main text-white-off py-1 px-8 rounded transition-all duration-300 ease-out hover:shadow-lg'>
          Go to settings &rarr;
        </button>
      </div>

      {/* -- subscription card */}
      <div className='col-span-4 md:col-span-2 h-auto rounded-md shadow-md bg-white-main p-5 flex flex-col justify-between gap-3'>
        <>
          <p className='font-bold text-lg text-text-light'>Your Subscription</p>
          <div className='w-full h-[1px] -mt-3.5 bg-gray-300' />
        </>

        {user ? (
          <span className='flex flex-col justify-center'>
            <p className='text-text-light font-inter text-3xl'>
              {user.subscription}
            </p>
            <p className='text-sm font-inter'>
              Renews: {user.subscription_renew?.toLowerCase()}
            </p>
          </span>
        ) : (
          'Loading...'
        )}

        <span className='w-full flex items-center gap-5'>
          <button className='w-full border py-1 px-8 rounded transition-all duration-300 ease-out hover:shadow-lg cursor-pointer bg-violet-main text-white-off '>
            View
          </button>
          <button className='w-full border py-1 px-8 rounded transition-all duration-300 ease-out hover:shadow-lg cursor-pointer bg-green-main text-white-off '>
            Upgrade
          </button>
        </span>
      </div>

      {/* -- section2  */}
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4 col-span-4'>
        {dataCards.map((item) => (
          <div
            key={item.name}
            className='overflow-hidden rounded-lg bg-white-main px-4 py-5 shadow sm:p-6 border'
          >
            <dt className='truncate text-sm font-medium text-gray-500'>
              {item.name}
            </dt>
            <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>

      {/* -- section 3 */}
      <div className='col-span-2 h-500 rounded-md shadow-md bg-white-main'></div>

      <div className='col-span-2 h-500 rounded-md shadow-md bg-white-main'></div>
    </div>
  );
};

export default Dashboard;
