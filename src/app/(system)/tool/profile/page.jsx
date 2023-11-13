'use client';

import React, { useEffect, useRef } from 'react';
import Image from 'next/image';
import { userStore } from '@/src/global/userStore';

const Profile = () => {
  const profileImageInputRef = useRef(null);
  const { user } = userStore();
  useEffect(() => {
    console.log(user);
  }, [user]);

  return (
    <div className='w-full flex items-center flex-col min-h-[600px] gap-6'>
      {/* -- banner */}
      <div className='w-full h-56 bg-gradient-to-br from-violet-main to-violet-dark rounded-2xl shadow-xl flex items-center flex-col justify-center gap-3'>
        <div
          className='relative w-32 h-32 rounded-full flex items-center justify-center shadow-md border border-gray-400 overflow-hidden cursor-pointer duration-300 ease-out transition-all hover:shadow-xl group'
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
          <div className='w-full h-full bg-black-bg/70 text-white-off absolute flex items-center justify-center -bottom-32 group-hover:bottom-0 transition-all duration-300 ease-out'>
            <p className='tracking-wider text-xl'>Edit</p>
          </div>
        </div>

        <h3 className='text-white-main text-xl'>
          Welcome, {user ? user.name : 'loading...'}
        </h3>
      </div>

      {/* -- section 2 */}
      <section className='grid grid-cols-5 w-full'>
        <div className='col-span-5 lg:col-span-2 h-44 bg-white-main shadow-lg rounded-lg'></div>
      </section>
    </div>
  );
};

export default Profile;

const imageAdd =
  'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAH8AAAB/CAMAAADxY+0hAAAAMFBMVEXk5ueutLeorrLn6eqrsbTh4+Ta3d60ubzHy83U19nBxcjd4OG6v8LX2tzR1Na2vL/noYLuAAACpklEQVRoge2ZyZbjIAxFDWKwjYf//9uSE3fK3ZUCyZGgF9xFTnbvgYTA0jB0Op1Op9PpdDqdzv8OID6sa/D4p76632Zjn7g4rlUtAEy7c868wP9zqOdgihftl4UlVXEAfrE/1J8OxgoGYPu59peD6LUdwPy7PGJXZQN5edyCSdNAYfXaBmAsyqOBpCafSb2rAS19T5I3btGJACwkeTwEKikA0/uy84boFfSHSJU3GoUQNvLyEfkNgJ0hr7ABgSGPGSCtTyo9lw0I0vqs5csHILGWb8wuq08svd9YYX1e+FFf+Bai1t4/CF/DQC9+p75sAjLTX16fGX5j5q4vqc+Vl45/4/xvfv4b17/W9b/1/df8/m/9/mG+/4z4+5P3/t3k9VknQOMDqO33D+f7T2X5jO9f+eg/aPz937z/Qez/iJeeC237XwQDCpXnLwodQKfd/yz0fyu0wH/tf+uUvXcO3vb/TaX+/2Fg2JrOP44JzHP+gy6stXGehuojqGP+ldZz/lVZ/RD0PqUUQsBf74dqFlDGr9u87DEecX+mQdyXeZzSYUxVGyCMS8Swvzt9zprlSASt2w/SuFuXr79oQmcYieLREO9/Z8Ygeh5gWBei+GnB7JvYKA4Aqw1D/LQQR5E9QHXW0i8OnIADmG6qPxyYDx3gXXdf/eEgfvIgwK3/GDff1/9w8aeBeO9mhFCoNWTsnXcJu+OS4UYM2A2nvIGlqTz7m4wwZ+ca4EzEJGP/MkDfAVjl5Tmv86SgbuifZnDjtqNBaotIp/43jtQU5XZaOQYIESB3eW5BWD5nzM+lfAZ0l1/eAMXoH5QyQC/5T0pHgDtnYpOfyzC77HwKGahw8fxDNgDa2X+QWz57zHmDXHvU68u7KZd+Vp9sAnp9cvHvdDqdTi2+AAPbIOeuLynWAAAAAElFTkSuQmCC';
