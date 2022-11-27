'use client';

import React from 'react';
import NoStory from '@/components/NoStory';

// ======= utility imports -->
import { storyStore } from '@/global/storyStore';

const DataPage = () => {
  const { currentStory } = storyStore();

  return (
    <>
      {!currentStory && <NoStory toBeViewed='Data' />}
      {currentStory && <h2>There is a story now!</h2>}
    </>
  );
};

export default DataPage;
