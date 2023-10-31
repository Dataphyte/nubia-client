'use client';

import React from 'react';
import Lottie from 'lottie-react';
// @ts-ignore
import LoadingLottie from '@/assets/animations/loading-lottie.json';

const Loading = () => {
  return (
    <div className='w-full h-screen bg-white-off flex items-center justify-center'>
      <Lottie
        animationData={LoadingLottie}
        autoplay
        loop
        style={{ width: '100%', height: '100%' }}
      />
    </div>
  );
};

export default Loading;
