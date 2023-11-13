'use client';

import Image from 'next/image';
import { useRouter } from 'next/navigation';
import React, { useEffect, useRef } from 'react';
import { userStore } from '@/src/global/userStore';
import {
  EnvelopeIcon,
  SparklesIcon,
  UserIcon,
} from '@heroicons/react/20/solid';

const Profile = () => {
  const router = useRouter();
  const profileImageInputRef = useRef(null);
  const { user } = userStore();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='w-full flex items-center flex-col min-h-[600px] gap-6'>
      {/* -- banner */}
      <div className='w-full h-max lg:h-72 bg-gradient-to-br from-violet-main to-violet-dark rounded-2xl shadow-xl flex px-3 py-14 lg:px-8 flex-col gap-3 justify-center lg:justify-start '>
        <h3 className='text-white-main text-2xl lg:text-3xl lg:tracking-widest'>
          <b>👋Hello,</b> {user ? user.name : 'loading...'}
        </h3>
        <p className='text-sm text-white-off/80 w-full max-w-2xl'>
          This is your profile page. You can edit your profile settings and
          details easily by changing the details in the fields and clicking on
          the save button afterwards.
        </p>

        <button
          className='w-max py-2 px-8 rounded-lg hover:shadow-xl shadow transition-all ease-out duration-300 text-white-main border border-gray-50 mt-3'
          onClick={() => router.push('/tool/projects')}
        >
          My projects
        </button>
      </div>

      {/* -- section 2 */}
      <section className='grid grid-cols-5 w-full lg:px-6 gap-3 lg:-mt-20'>
        <div className='col-span-5 lg:col-span-3 h-auto  bg-white-main shadow-lg rounded-lg'></div>
        <div className='col-span-5 lg:col-span-2 h-max bg-white-main shadow-lg rounded-lg flex flex-col items-center py-10 gap-4 px-2'>
          {/* -- Userv profile image   */}
          <div
            className='relative w-36 h-36 xl:w-44 xl:h-44 rounded-full flex items-center justify-center shadow-xl shadow-gray-300 border-2 border-violet-main overflow-hidden cursor-pointer duration-300 ease-out transition-all hover:shadow-3xl group lg:-mt-20 xl:-mt-24 '
            onClick={() => profileImageInputRef.current.click()}
          >
            <input
              type='file'
              accept='image/*'
              className='hidden'
              ref={profileImageInputRef}
            />
            <Image
              src={user ? user.image || imageAdd : imageAdd}
              alt='user image'
              fill
            />
            <div className='w-full h-full bg-black-bg/80 text-white-off/90 absolute flex items-center justify-center -bottom-44 group-hover:bottom-0 transition-all duration-300 ease-out'>
              <p className='tracking-wider text-xl'>Edit</p>
            </div>
          </div>

          {/* -- User details  */}
          <div className='flex flex-col text-text-light gap-2'>
            {/* -- email */}
            <div className='flex gap-2 items-center'>
              <EnvelopeIcon className='w-5 h-5' />
              <p className=''>{user?.email || 'loading...'}</p>
            </div>
            {/* -- account type */}
            <div className='flex gap-2 items-center'>
              <UserIcon className='w-5 h-5 text-green-500' />
              <p className=''>
                {`${user?.account_type.toUpperCase()} Account` || 'loading...'}
              </p>
            </div>
            {/* -- subscription */}
            <div className='flex gap-2 items-center'>
              <SparklesIcon className='w-5 h-5 text-orange-500' />
              <p className=''>
                {`${user?.subscription} Subscription` || 'loading...'}{' '}
              </p>
              <a className='py-1 px-5 rounded-md bg-gray-700 transition-all ease-out duration-300 hover:bg-gray-800 hover:shadow-lg text-xs shadow text-white-off cursor-pointer'>
                View
              </a>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Profile;

const imageAdd =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAMFBMVEXk5ueutLeorrLn6eqrsbTh4+Ta3d60ubzHy83U19nBxcjd4OG6v8LX2tzR1Na2vL/noYLuAAACpklEQVRoge2ZyZbjIAxFDWKwjYf//9uSE3fK3ZUCyZGgF9xFTnbvgYTA0jB0Op1Op9PpdDqdzv8OID6sa/D4p76632Zjn7g4rlUtAEy7c868wP9zqOdgihftl4UlVXEAfrE/1J8OxgoGYPu59peD6LUdwPy7PGJXZQN5edyCSdNAYfXaBmAsyqOBpCafSb2rAS19T5I3btGJACwkeTwEKikA0/uy84boFfSHSJU3GoUQNvLyEfkNgJ0hr7ABgSGPGSCtTyo9lw0I0vqs5csHILGWb8wuq08svd9YYX1e+FFf+Bai1t4/CF/DQC9+p75sAjLTX16fGX5j5q4vqc+Vl45/4/xvfv4b17/W9b/1/df8/m/9/mG+/4z4+5P3/t3k9VknQOMDqO33D+f7T2X5jO9f+eg/aPz937z/Qez/iJeeC237XwQDCpXnLwodQKfd/yz0fyu0wH/tf+uUvXcO3vb/TaX+/2Fg2JrOP44JzHP+gy6stXGehuojqGP+ldZz/lVZ/RD0PqUUQsBf74dqFlDGr9u87DEecX+mQdyXeZzSYUxVGyCMS8Swvzt9zprlSASt2w/SuFuXr79oQmcYieLREO9/Z8Ygeh5gWBei+GnB7JvYKA4Aqw1D/LQQR5E9QHXW0i8OnIADmG6qPxyYDx3gXXdf/eEgfvIgwK3/GDff1/9w8aeBeO9mhFCoNWTsnXcJu+OS4UYM2A2nvIGlqTz7m4wwZ+ca4EzEJGP/MkDfAVjl5Tmv86SgbuifZnDjtqNBaotIp/43jtQU5XZaOQYIESB3eW5BWD5nzM+lfAZ0l1/eAMXoH5QyQC/5T0pHgDtnYpOfyzC77HwKGahw8fxDNgDa2X+QWz57zHmDXHvU68u7KZd+Vp9sAnp9cvHvdDqdTi2+AAPbIOeuLynWAAAAAElFTkSuQmCC';
