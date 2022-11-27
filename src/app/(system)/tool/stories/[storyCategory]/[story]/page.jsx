'use client';
import React from 'react';
import { storyStore } from '@/global/storyStore';

const SingleStory = () => {
  const { currentStory } = storyStore();
  console.log(currentStory);

  return (
    <div className='w-full h-auto flex flex-col items-center relative gap-3 py-2'>
      <div
        dangerouslySetInnerHTML={{ __html: currentStory.story }}
        className='prose w-full flex items-center flex-col prose-lg prose-p:font-inter prose-p:text-text-light prose-h1:text-text-dark'
      />
    </div>
  );
};

export default SingleStory;
