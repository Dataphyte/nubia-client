'use client';

import React from 'react';

// ======= utility imports -->
import { storyStore } from '@/global/story';
import Lottie from 'lottie-react';

// ======= animation imports -->
import LoadingLottie from '../../../../../assets/animations/loading-lottie.json';

// ======= loading omponent -->
const Loader = () => (
  <div className='w-full h-600 flex items-center justify-center'>
    <div className='w-300 h-300 flex flex-col gap-3 font-bold text-xl text-text-light text-center items-center justify-center'>
      <Lottie
        animationData={LoadingLottie}
        autoplay
        loop
        style={{ width: '100%', height: '200px' }}
      />
      <p>Hang in there while we get your stories</p>
    </div>
  </div>
);

const Page = () => {
  const { currentStory } = storyStore();
  return (
    <div className='w-full h-auto flex flex-col gap-5 items-center justify-center'>
      {!currentStory && <Loader />}

      {currentStory && (
        <>
          <h3 className='text-2xl font-bold tracking-wider text-text-dark'>
            Generated FAAC stories
          </h3>
          <div className='w-full grid grid-cols-3 gap-5 items-center h-auto prose prose-lg'>
            {currentStory.data.template.map((story, idx) => (
              <div
                key={idx}
                className=' flex items-center justify-center w-full h-200 col-span-3 md:col-span-1 bg-white-main  rounded-lg shadow-md hover:shadow-xl hover:border-violet-main duration-300 ease-out cursor-pointer border'
              >
                <p className='text-2xl font-medium font-inter text-text-light'>
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

export default Page;
