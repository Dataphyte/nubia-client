'use client';

import React from 'react';
import { useRouter } from 'next/navigation';

// ======= utility imports -->
import { storyStore } from '@/global/storyStore';

// ======= loading omponent -->
const Loader = () => (
  <div className='w-full h-600 flex items-center justify-center'>
    <div className='w-300 h-300 flex flex-col gap-3 font-medium text-xl text-text-light text-center items-center justify-center'>
      <lord-icon
        src='https://cdn.lordicon.com/ukodqrxd.json'
        trigger='loop'
        colors='primary:#121331,secondary:#6d28d9'
        style={{ width: '150px', height: '150px' }}
      />
      <p>Hang in there while we get your stories</p>
    </div>
  </div>
);

const StoryCategory = () => {
  const router = useRouter();
  const { currentStoryCategory, setCurrentStory, storyRoute } = storyStore();
  return (
    <div className='w-full h-auto flex flex-col gap-5 items-center justify-center'>
      {!currentStoryCategory && <Loader />}

      {currentStoryCategory && (
        <>
          <h3 className='text-2xl font-bold tracking-wider text-text-dark'>
            Generated FAAC stories
          </h3>
          <div className='w-full grid grid-cols-3 gap-5 items-center h-auto prose prose-lg'>
            {currentStoryCategory.template.map((story, idx) => (
              <div
                key={idx}
                className=' flex items-center justify-center w-full h-200 col-span-3 md:col-span-1 bg-white-main  rounded-lg shadow-md hover:shadow-xl hover:border-violet-main duration-300 ease-out cursor-pointer border'
                onClick={() => {
                  setCurrentStory(story);
                  router.push(`tool/stories/${storyRoute}/${story.title}`);
                }}
              >
                <p className='text-2xl font-medium font-inter text-text-light text-center'>
                  {story.title} state
                </p>
              </div>
            ))}
          </div>
        </>
      )}
    </div>
  );
};

export default StoryCategory;
