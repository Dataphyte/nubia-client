'use client';

import React, { useState, useEffect } from 'react';
import OpenAI from 'openai';
import { projectStore } from '@/src/global/projectStore';
import { ProjectSchema } from '@/src/typescript/project';
import moment from 'moment';

type ComponentProps = {
  projectDetails: ProjectSchema;
};

const ProjectOverview = ({ projectDetails }: ComponentProps) => {
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState('');
  const { projectData } = projectStore();

  return (
    <div className='flex flex-col gap-3 w-full h-content pb-24'>
      <h2 className='text-xl'>Project Overview</h2>
      <div className='w-full border border-gray-400 shadow-md px-3 py-4 my-5 relative rounded-lg'>
        <p className='absolute -top-3 bg-white-off px-2 font-bold font-inter'>
          Description
        </p>
        <p className='text-sm text-text-light'>{projectDetails.description}</p>
      </div>

      <div className='w-full border border-gray-400 shadow-md px-3 py-4 my-4 relative rounded-lg'>
        <p className='absolute -top-3 bg-white-off px-2 font-bold font-inter'>
          TimeStamp
        </p>
        <p className='text-sm text-text-light'>
          Created at:&nbsp;
          <em>
            {moment(projectDetails?.createdAt).format('MMMM Do YYYY, h:mm a.')}
          </em>
        </p>
        <p className='text-sm text-text-light'>
          Last update:&nbsp;
          <em>
            {moment(projectDetails?.updatedAt).format('MMMM Do YYYY, h:mm a.')}
          </em>
        </p>
        <p className='text-sm text-text-light'>
          Last Viewed:&nbsp;
          <em>{moment().format('MMMM Do YYYY, h:mm a.')}</em>
        </p>
      </div>
    </div>
  );
};

export default ProjectOverview;