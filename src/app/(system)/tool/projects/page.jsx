'use client';

import Lottie from 'lottie-react';
import EmptyLottie from '@/src/assets/animations/empty-state-lottie-2.json';
import { PlusIcon } from '@heroicons/react/20/solid';
import React, { useState } from 'react';
import oddTrimmer from 'odd-trimmer';
import { useRouter } from 'next/navigation';

// TODO: Get the projects from the user profile omn database
const userProjects = [
  {
    _id: 1,
    title: 'Project 1',
    description: 'some random project descirption goes in this place.',
    createdAt: '20-05-2023',
    updatedAt: '3-06-2023',
  },
  {
    _id: 2,
    title: 'Project 2',
    description: 'some random project descirption goes in this place.',
    createdAt: '20-05-2023',
    updatedAt: '3-06-2023',
  },
  {
    _id: 3,
    title: 'Project 3',
    description: 'some random project descirption goes in this place.',
    createdAt: '20-05-2023',
    updatedAt: '3-06-2023',
  },
  {
    _id: 4,
    title: 'Project 4',
    description: 'some random project descirption goes in this place.',
    createdAt: '20-05-2023',
    updatedAt: '3-06-2023',
  },
];

const Projects = () => {
  const router = useRouter();
  const [Projects, setProjects] = useState(true);
  return (
    <div className='flex flex-col w-full gap-4'>
      <h1 className='text-3xl font-magistral font-bold'>Projects</h1>

      {/* -- No projects emptyv state */}
      {!Projects && <NoProjectComponent />}

      {/* -- user has prjects in profile */}
      {Projects && (
        <div
          className='grid w-full grid-cols-3 gap-1 lg:gap-3'
          onClick={() => router.push('projects/project_1')}
        >
          {userProjects.map((project) => (
            <div className='col-span-3 lg:col-span-1 border p-4 rounded shadow-md cursor-pointer duratrion-200 transition-all ease-in-out hover:ring-2 hover:ring-violet-light bg-white-main hover:shadow-xl flex flex-col gap-1'>
              <p className='font-bold text-text-medium text-lg'>
                {project.title}
              </p>
              <p className='text-sm font-thin'>
                {oddTrimmer(project.description, 10)}
              </p>
              <span className='w-full flex flex-col py-2 mt-1 gap-1'>
                <p className='text-text-thin text-xs font-magistral'>
                  <strong>Created at:</strong> &nbsp;{project.createdAt}
                </p>
                <p className='text-text-thin text-xs font-magistral'>
                  <strong>Last modified:</strong> &nbsp;{project.updatedAt}
                </p>
              </span>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Projects;

//=============================================>
// ======= Empty state COmponent -->
//=============================================>
const NoProjectComponent = ({ action }) => {
  return (
    <div className='w-full h-500 flex flex-col items-center justify-center gap-2 border-2 border-dashed pt-5 pb-14 rounded-lg shadow'>
      <span className='h-3/4 w-auto'>
        <Lottie
          animationData={EmptyLottie}
          autoplay
          loop
          style={{ width: '100%', height: '100%' }}
        />
      </span>

      <p className='text-xl font-magistral font-medium text-text-light text-center'>
        No&nbsp;
        <strong className='font-black-ops'>Projects</strong> to be viewed.
      </p>
      <button
        className='px-10 py-2 rounded-md shadow hover:shadow-lg transition-all duration-200 ease-in-out border bg-violet-main mt-2 text-white-off flex gap-2 items-center'
        onClick={action}
      >
        Create new <PlusIcon className='w-6 h-6' />
      </button>
    </div>
  );
};
