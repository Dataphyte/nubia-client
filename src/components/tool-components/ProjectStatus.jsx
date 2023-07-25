'use client';

import { classNames } from '@/src/utils/classnames';
import React, { useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const ProjectStatus = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={classNames(
        'absolute top-0 right-5 bg-white-main shadow-lg origin-right transition-all duration-300 ease-out cursor-pointer border rounded-md flex',
        open ? 'w-200 h-max border-violet-light' : 'w-max h-max'
      )}
    >
      {
        {
          true: <Status action={setOpen} />,
          false: (
            <div
              className='flex items-center gap-1 w-full h-full py-1 px-3'
              onClick={() => setOpen((state) => !state)}
            >
              <ChevronDoubleLeftIcon className='w-5 h-5' />
              <p>Status</p>
            </div>
          ),
        }[open]
      }
    </div>
  );
};

export default ProjectStatus;

//=============================================>
// ======= Project status -->
//=============================================>
const Status = ({ action }) => {
  return (
    <div className='w-full h-full p-4 flex flex-col gap-2 font-medium'>
      {/* -- project details */}
      <span className='text-sm flex items-center justify-between w-full'>
        <p>Project details </p>
        <CheckCircleIcon className='w-5 h-5 text-green-main' />
      </span>

      {/* -- add data */}
      <span className='text-sm flex items-center justify-between w-full'>
        <p>Add Data </p>
        <XCircleIcon className='w-5 h-5 text-red-main' />
      </span>

      {/* -- Add template */}
      <span className='text-sm flex items-center justify-between w-full'>
        <p>Write a template </p>
        <XCircleIcon className='w-5 h-5 text-red-main' />
      </span>

      {/* -- select features */}
      <span className='text-sm flex items-center justify-between w-full'>
        <p>Customize Features </p>
        <XCircleIcon className='w-5 h-5 text-red-main' />
      </span>

      <button
        className='py-1 px-3 rounded text-white-off text-sm bg-violet-main shadow-md mt-3'
        onClick={() => action((state) => !state)}
      >
        Hide
      </button>
    </div>
  );
};
