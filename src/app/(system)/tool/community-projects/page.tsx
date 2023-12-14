'use client';

import { useGetProjectList } from '@/src/hooks/queries/useProject';
import React, { useEffect } from 'react';
import Lottie from 'lottie-react';
import CommunityLottie from '@/assets/animations/community-lottie.json';

const CommunityProjects = () => {
  const { data, refetch } = useGetProjectList();

  useEffect(() => {
    console.log(data);
  }, [data]);

  return (
    <div className='w-full h-[500px] py-10 flex flex-col items-center justify-center border border-gray-400 rounded-md shadow-lg bg-white-main gap-4'>
      <Lottie
        animationData={CommunityLottie}
        autoplay
        loop
        style={{ width: '90%', height: '90%' }}
      />
      <p className='text-xl text-text-medium'>
        Community projects will be available soon...
      </p>
    </div>
  );
};

export default CommunityProjects;
