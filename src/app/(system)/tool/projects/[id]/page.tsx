'use client';

import { classNames } from '@/src/utils/classnames';
import ProjectStatus from '@/src/components/tool-components/ProjectStatus';
import React, { useEffect } from 'react';
import ManageDataCard from '@/src/components/tool-components/project-cards/ManageDataCard';
import StoryTemplateCard from '@/src/components/tool-components/project-cards/StoryTemplateCard';
import { projectStore } from '@/src/global/projectStore';
import { notFound, useParams, useRouter } from 'next/navigation';
import ProjectOverview from '@/src/components/tool-components/project-cards/ProjectOverview';
import { useGetSingleProject } from '@/src/hooks/queries/useProject';
import { queryClient } from '@/src/app/layout';
import CreateStories from '@/src/components/tool-components/project-cards/CreateStories';

type QuickActions = {
  title: string;
  icon: string;
};

const quickActions: QuickActions[] = [
  { title: 'Overview', icon: 'https://cdn.lordicon.com/gmzxduhd.json' },
  { title: 'Manage Data', icon: 'https://cdn.lordicon.com/wrprwmwt.json' },
  { title: 'Write Template', icon: 'https://cdn.lordicon.com/ufezupnm.json' },
  {
    title: 'Create Stories',
    icon: 'https://cdn.lordicon.com/tvyxmjyo.json',
  },
];

const EditProject = () => {
  const { id } = useParams();
  const {
    data: singleProjectData,
    status,
    refetch: getSingleProject,
    isLoading,
  } = useGetSingleProject(id as string);
  const { currentTab, setCurrentTab } = projectStore();

  useEffect(() => {
    if (singleProjectData?.data === null) notFound();
    console.log(singleProjectData?.data);
  }, [status, singleProjectData, isLoading]);

  useEffect(() => {
    getSingleProject();
  }, []);

  return (
    <>
      {status === 'success' && singleProjectData.data && (
        <div className='w-full min-h-screen flex flex-col gap-3 relative'>
          <ProjectStatus />
          <h1 className='text-3xl font-magistral font-bold'>
            {singleProjectData.data.name.toLocaleUpperCase()}
          </h1>
          <p className='text-sm text-text-light font-thin relative -mt-1 lg:-mt-2'>
            <b>Project id: </b>&nbsp;
            {singleProjectData.data.id}
          </p>

          {/* -- Quick actions */}
          <section className='w-full mt-2 flex flex-col gap-3 border-2 py-5 px-3 rounded-lg bg-white-off'>
            <h3 className='text-text-light text-xl font-bold'>Quick Actions</h3>
            <div className='w-full grid grid-cols-4 gap-4'>
              {quickActions.map((action, idx) => (
                <div
                  className={classNames(
                    'col-span-2 lg:col-span-1 border rounded-lg  flex items-center justify-center py-1 md:py-3 transition-all ease-out cursor-pointer duration-200 hover:shadow-lg gap-3 text-xs md:text-sm lg:text-base',
                    currentTab === action.title
                      ? 'shadow-xl border-black-light bg-white-main'
                      : 'shadow-md'
                  )}
                  key={idx}
                  onClick={() => setCurrentTab(action.title)}
                >
                  {/* @ts-ignore */}
                  <lord-icon
                    src={action.icon}
                    trigger={currentTab === action.title ? 'loop' : 'hover'}
                    colors='primary:#121331,secondary:#6d28d9'
                    style={{ width: '30px', height: '30px' }}
                  />
                  <p>{action.title}</p>
                </div>
              ))}
            </div>
          </section>
          <section className='mt-6'>
            {
              {
                Overview: (
                  <ProjectOverview projectDetails={singleProjectData.data} />
                ),
                'Manage Data': (
                  <ManageDataCard projectDetails={singleProjectData.data} />
                ),
                'Write Template': (
                  <StoryTemplateCard projectDetails={singleProjectData.data} />
                ),
                'Create Stories': (
                  <CreateStories projectDetails={singleProjectData.data} />
                ),
              }[currentTab]
            }
          </section>
        </div>
      )}
      {isLoading && <p>Loading</p>}
      {status === 'error' && <p> Error</p>}
    </>
  );
};

export default EditProject;
