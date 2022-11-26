'use client';

import React from 'react';
import Link from 'next/link';
import { storyStore } from '@/global/storyStore';
import { classNames } from 'src/utils/classnames';

const stories = [
  {
    title: 'FAAC Story',
    description: '',
    serverRoute: 'faac',
    clientRoute: 'tool/stories/faac',
    icon: 'https://cdn.lordicon.com/xttxdmza.json',
  },
  {
    title: 'Kerosine watch Story',
    description: '',
    serverRoute: 'kerosine-watch',
    clientRoute: 'tool/stories/kerosine-watch',
    icon: 'https://cdn.lordicon.com/otpnotct.json',
  },
];

const StoriesPage = () => {
  const { setStoryRoute } = storyStore();

  return (
    <div className='w-full h-auto min-h-[800px] flex flex-col gap-3'>
      <h1 className='text-3xl font-magistral font-bold'>Available stories</h1>
      <div>
        <div className='divide-y divide-gray-200 rounded-lg sm:grid sm:grid-cols-2 sm:gap-3 sm:divide-y-0'>
          {stories.map((story, idx) => (
            <Link
              href={story.clientRoute}
              className='focus:outline-none'
              key={idx}
              onClick={() => setStoryRoute(story.serverRoute)}
            >
              <div className='relative group bg-white p-6 rounded-md focus-within:ring-2 focus-within:ring-inset shadow-md hover:shadow-xl duration-150 bg-white-main border'>
                <div>
                  <span className={classNames('rounded-lg inline-flex')}>
                    <lord-icon
                      src={story.icon}
                      trigger='loop'
                      colors='primary:#121331,secondary:#6d28d9'
                      style={{ width: '40px', height: '40px' }}
                    />
                  </span>
                </div>
                <div className='mt-8'>
                  <h3 className='text-lg font-medium'>
                    {/* Extend touch target to entire panel */}
                    <span className='absolute inset-0' aria-hidden='true' />
                    {story.title}
                  </h3>
                  <p className='mt-2 text-sm text-gray-500'>
                    Doloribus dolores nostrum quia qui natus officia quod et
                    dolorem. Sit repellendus qui ut at blanditiis et quo et
                    molestiae.
                  </p>
                </div>
                <span
                  className='pointer-events-none absolute top-6 right-6 text-gray-300 group-hover:text-gray-400'
                  aria-hidden='true'
                >
                  <svg
                    className='h-6 w-6'
                    xmlns='http://www.w3.org/2000/svg'
                    fill='currentColor'
                    viewBox='0 0 24 24'
                  >
                    <path d='M20 4h1a1 1 0 00-1-1v1zm-1 12a1 1 0 102 0h-2zM8 3a1 1 0 000 2V3zM3.293 19.293a1 1 0 101.414 1.414l-1.414-1.414zM19 4v12h2V4h-2zm1-1H8v2h12V3zm-.707.293l-16 16 1.414 1.414 16-16-1.414-1.414z' />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default StoriesPage;
