'use client';

import React from 'react';
import NoStory from '@/components/NoStory';
import { storyStore } from '@/global/storyStore';

// ======= icon imports -->
import { CodeBracketSquareIcon } from '@heroicons/react/24/outline';

const ClasNames = () => {
  const { currentStoryCategory } = storyStore();
  console.log(currentStoryCategory && currentStoryCategory.data.classnames);

  return (
    <>
      {!currentStoryCategory && <NoStory toBeViewed='ClassNames' />}
      {currentStoryCategory && (
        <ul
          role='list'
          className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
        >
          {currentStoryCategory &&
            currentStoryCategory.data.classnames.map((story, idx) => (
              <li
                key={idx}
                className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white-main shadow'
              >
                <div className='flex w-full items-center justify-between space-x-6 p-6'>
                  <div className='flex-1 '>
                    <div className='flex items-center space-x-3'>
                      <h3 className='truncate text-lg font-medium text-gray-900'>
                        {story.class}
                      </h3>
                      <span className='flex-shrink-0 rounded-full bg-violet-main/70 text-white-off px-3 py-0.5 text-xs duration-300 cursor-pointer tracking-wider flex items-center justify-center'>
                        {`< ${story.tag} >`}
                      </span>
                    </div>
                    <p className='mt-3 font-inter flex items-center text-sm text-text-thin h-[50px]'>
                      {story.desc}
                    </p>
                  </div>
                  <lord-icon
                    src='https://cdn.lordicon.com/fgpwnxiv.json'
                    trigger='hover'
                    colors='primary:#121331,secondary:#6d28d9'
                    style={{ width: '50px', height: '50px' }}
                  />
                </div>
                <div>
                  <div className='-mt-px flex divide-x divide-gray-200'>
                    <div className='flex w-0 flex-1'>
                      <div className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center rounded-bl-lg border border-transparent py-4 text-sm font-medium text-gray-700'>
                        <CodeBracketSquareIcon
                          className='h-5 w-5 text-gray-500'
                          aria-hidden='true'
                        />
                        <span className='ml-3 flex gap-2 items-center justify-center'>
                          <p className='text-xs text-gray-500 font-inter'>
                            tailwind
                          </p>
                          <p className='font-bold '>prose-{story.tag}:</p>
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </li>
            ))}
        </ul>
      )}
    </>
  );
};

export default ClasNames;
