'use client';

import { classNames } from '@/src/utils/classnames';
import ProjectStatus from '@/src/components/tool-components/ProjectStatus';
import React from 'react';
import AddDataCard from '@/src/components/tool-components/project-cards/AddDataCard';
import StoryTemplateCard from '@/src/components/tool-components/project-cards/SToryTemplateCard';
import { projectStore } from '@/src/global/projectStore';
import CustomizeFeatures from '@/src/components/tool-components/project-cards/CustomizeFeatures';

const quickActions = [
  { title: 'Overview', icon: 'https://cdn.lordicon.com/gmzxduhd.json' },
  { title: 'Add Data', icon: 'https://cdn.lordicon.com/wrprwmwt.json' },
  { title: 'Write Template', icon: 'https://cdn.lordicon.com/ufezupnm.json' },
  {
    title: 'Customize features',
    icon: 'https://cdn.lordicon.com/tvyxmjyo.json',
  },
];

const EditProject = () => {
  const { currentTab, setCurrentTab } = projectStore();

  return (
    <div className='w-full min-h-screen flex flex-col gap-3 relative'>
      <ProjectStatus />
      <h1 className='text-3xl font-magistral font-bold'>New Project 1</h1>

      {/* -- Quick actions */}
      <section className='w-full mt-2 flex flex-col gap-3 border-2 py-5 px-3 rounded-lg bg-white-off'>
        <h3 className='text-text-light text-xl font-bold'>Quick Actions</h3>
        <div className='w-full grid grid-cols-4 gap-4'>
          {quickActions.map((action, idx) => (
            <div
              className={classNames(
                'col-span-2 lg:col-span-1 border rounded-lg  flex items-center justify-center py-3 transition-all ease-out cursor-pointer duration-200 hover:shadow-lg gap-3 ',
                currentTab === action.title
                  ? 'shadow-xl border-black-light bg-white-main'
                  : 'shadow-md'
              )}
              key={idx}
              onClick={() => setCurrentTab(action.title)}
            >
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
            Overview: <p>Edit project</p>,
            'Add Data': <AddDataCard />,
            'Write Template': <StoryTemplateCard />,
            'Customize features': <CustomizeFeatures />,
          }[currentTab]
        }
      </section>
    </div>
  );
};

export default EditProject;
