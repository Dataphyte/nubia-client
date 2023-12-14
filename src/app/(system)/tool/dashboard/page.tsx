'use client';

import React, { useEffect, useState } from 'react';
import { userStore } from '@/src/global/userStore';
import { useGetUser } from '@/src/hooks/queries/useUser';
import { useRouter } from 'next/navigation';
import { CheckCircleIcon, XCircleIcon } from '@heroicons/react/24/outline';
import { useGetProjectList } from '@/src/hooks/queries/useProject';
import ActivityLottie from '@/assets/animations/activity-lottie.json';
import Lottie from 'lottie-react';

interface DataCards {
  name: string;
  stat: string;
}

const Dashboard = () => {
  const { user } = userStore();
  const router = useRouter();
  const [dataCards, setDataCards] = useState<DataCards[]>([
    { name: 'Projects', stat: '0' },
    { name: 'Account Usage', stat: '13%' },
    { name: 'Stories Generated', stat: '0' },
    { name: 'Insights generated', stat: '0' },
  ]);
  const { data: projectList } = useGetProjectList();

  useEffect(() => {
    projectList &&
      setDataCards((state) =>
        state.map((item) => {
          if (item.name === 'Projects')
            return {
              name: 'Projects',
              stat: projectList.data.length.toString(),
            };
          return item;
        })
      );
  }, [projectList]);

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
            <p className='flex items-center gap-1'>
              Email Verified:
              {user.email_verified ? (
                <CheckCircleIcon className='h-4 text-green-main' />
              ) : (
                <XCircleIcon className='w-4 h-4 text-red-main' />
              )}
            </p>
            <p className='flex items-center gap-1'>
              profile image:
              {user.image ? (
                <CheckCircleIcon className='h-4 text-green-main' />
              ) : (
                <XCircleIcon className='w-4 h-4 text-red-main' />
              )}
            </p>
            <p className='flex items-center gap-1'>
              Password:{' '}
              {user.password ? (
                <CheckCircleIcon className='h-4 text-green-main' />
              ) : (
                <XCircleIcon className='w-4 h-4 text-red-main' />
              )}
            </p>
            <p className='flex items-center gap-1'>
              Preferences:{' '}
              {user.image ? (
                <CheckCircleIcon className='h-4 text-green-main' />
              ) : (
                <XCircleIcon className='w-4 h-4 text-red-main' />
              )}
            </p>
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
          <button
            className='w-full border py-1 px-8 rounded transition-all duration-300 ease-out hover:shadow-lg cursor-pointer bg-violet-main text-white-off '
            onClick={() => router.push('/tool/profile')}
          >
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
      <div className='col-span-4 h-300 rounded-md shadow-md bg-white-main flex items-center justify-center flex-col'>
        <Lottie
          animationData={ActivityLottie}
          autoplay
          loop
          style={{ width: '60%', height: '60%' }}
        />
        <p>Activity feed coming soon...</p>
      </div>
    </div>
  );
};

export default Dashboard;
