'use client';

import { classNames } from '@/src/utils/classnames';
import React, { useState } from 'react';
import {
  ChevronDoubleLeftIcon,
  CheckCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';
import { projectStore } from '@/src/global/projectStore';

const ProjectStatus = () => {
  const [open, setOpen] = useState(false);
  return (
    <div
      className={classNames(
        'absolute top-0 right-0 md:right-5 bg-white-main shadow-lg origin-right transition-all duration-300 ease-out cursor-pointer border rounded-md flex z-10',
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
  const { status } = projectStore();

  return (
    <div className='w-full h-full p-4 flex flex-col gap-2 font-medium'>
      {status.map((status) => (
        <span
          className='text-sm flex items-center justify-between w-full'
          key={status.id}
        >
          <p>{status.text} </p>
          {status.complete ? (
            <CheckCircleIcon className='w-5 h-5 text-green-main' />
          ) : (
            <XCircleIcon className='w-5 h-5 text-red-main' />
          )}
        </span>
      ))}

      <button
        className='py-1 px-3 rounded text-white-off text-sm bg-violet-main shadow-md mt-3'
        onClick={() => action((state) => !state)}
      >
        Hide
      </button>
    </div>
  );
};
