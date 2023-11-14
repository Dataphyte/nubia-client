'use client';

import React, { useState, useEffect } from 'react';
import { projectStore } from '@/src/global/projectStore';
import { ProjectSchema } from '@/src/typescript/project';
import moment from 'moment';
import { useRouter } from 'next/navigation';
import { useDeleteProject } from '@/src/hooks/queries/useProject';

type ComponentProps = {
  projectDetails: ProjectSchema;
};

const ProjectOverview = ({ projectDetails }: ComponentProps) => {
  const router = useRouter();
  const { projectData } = projectStore();
  const {
    refetch: deleteProject,
    data: deleteData,
    isSuccess,
  } = useDeleteProject(projectDetails.id);

  useEffect(() => {
    if (isSuccess) {
      alert('✅ Project deleted Successfully');
      router.replace('/tool/projects');
    }
    deleteData && console.log(deleteData.data);
  }, [deleteData]);

  return (
    <div className='flex flex-col gap-3 w-full h-content pb-24'>
      <h2 className='text-xl'>Project Overview</h2>
      <div className='w-full border border-gray-400 shadow-md px-3 py-4 my-5 relative rounded-lg  flex flex-col gap-2'>
        <p className='absolute -top-3 bg-white-off px-2 font-bold font-inter'>
          Description
        </p>
        <p className='text-sm text-text-light'>{projectDetails.description}</p>
        <button className='py-1  px-6 text-white-off bg-orange-500 rounded-md shadow transition-all duration-300 ease-out hover:shadow-lg text-sm w-max'>
          Edit Project Description
        </button>
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

      <div className='w-full border border-gray-400 shadow-md px-3 py-4 my-4 relative rounded-lg flex flex-col gap-2'>
        <p className='absolute -top-3 bg-white-off px-2 font-bold font-inter'>
          Manage
        </p>
        <button
          className='py-1.5 px-6 text-white-off bg-red-main rounded-md shadow transition-all duration-300 ease-out hover:shadow-lg text-sm w-max'
          onClick={() => {
            const toBeDeleted = prompt(
              `Write in the name of the project "${projectDetails.name}"`
            );
            toBeDeleted === projectDetails.name
              ? deleteProject()
              : alert('Wrong project spelling');
          }}
        >
          Delete Project
        </button>
      </div>
    </div>
  );
};

export default ProjectOverview;
