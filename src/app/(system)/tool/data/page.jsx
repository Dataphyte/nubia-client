'use client';

import React from 'react';
import Link from 'next/link';

// ======= utility imports -->
import { storyStore } from '@/global/story';

const DataPage = () => {
  const { currentStory } = storyStore();

  return (
    <>
      {!currentStory && (
        <div className='w-full h-full min-h-[600px] border-2 border-dashed border-gray-300 flex flex-col gap-8 items-center justify-center'>
          <lord-icon
            src='https://cdn.lordicon.com/nocovwne.json'
            trigger='loop'
            colors='primary:#121331,secondary:#6d28d9'
            style={{ width: '150px', height: '150px' }}
          />
          <p className='text-2xl font-magistral font-medium text-text-light'>
            Select a story to view its{' '}
            <strong className='font-black-ops'>DATA</strong>
          </p>
          <Link
            href='tool/stories'
            className='-mt-6 py-2 px-6 rounded-lg shadow-md border text-inter text-text-light border-text-light duration-150 hover:shadow-lg'
          >
            View stories
          </Link>
        </div>
      )}
      {currentStory && <h2>There is a story now!</h2>}
    </>
  );
};

export default DataPage;
