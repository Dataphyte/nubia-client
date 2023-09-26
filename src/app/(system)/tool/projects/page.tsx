'use client';

import Lottie from 'lottie-react';
import EmptyLottie from '@/src/assets/animations/empty-state-lottie-2.json';
import { PlusIcon } from '@heroicons/react/20/solid';
import React, { useState, useEffect, SetStateAction } from 'react';
import oddTrimmer from 'odd-trimmer';
import { useRouter } from 'next/navigation';
import {
  useCreateProject,
  useGetProjectList,
} from '@/src/hooks/queries/useProject';
import { NewProjectFormInputs, ProjectSchema } from '@/src/typescript/project';
import AddNewProjectSlideOver from '@/src/components/slide-overs/add-new-project';
import { notificationStore } from '@/src/global/notificationStore';

const Projects = () => {
  const router = useRouter();
  const [Projects, setProjects] = useState<ProjectSchema[] | null>(null);
  const [showAddProject, setShowAddProject] = useState<boolean>(false);
  const [newProjectdata, setNewProjectdata] = useState<NewProjectFormInputs>();
  const { setShow: showNotification, setContent: setNotificationContent } =
    notificationStore();

  const {
    refetch: getProjectList,
    data,
    isSuccess,
    isLoading: getProjectListLoading,
  } = useGetProjectList();
  const { refetch: createProject, data: NewProject } = useCreateProject(
    newProjectdata!
  );

  useEffect(() => {
    getProjectList();
  }, []);

  useEffect(() => {
    isSuccess && setProjects(data.data as ProjectSchema[]);
  }, [data, isSuccess]);

  useEffect(() => {
    if (NewProject) {
      showNotification(true);
      setNotificationContent({
        text: 'Project created',
        type: 'success',
        description: NewProject.message,
      });
    }
    getProjectList();
  }, [NewProject]);

  return (
    <>
      {!getProjectListLoading ? (
        <div className='flex flex-col w-full gap-4'>
          <AddNewProjectSlideOver
            state={showAddProject}
            setState={setShowAddProject}
            action={createProject}
            setFormState={setNewProjectdata}
          />
          <h1 className='text-3xl font-magistral font-bold'>Projects</h1>

          {/* -- No projects emptyv state */}
          {!getProjectListLoading && Projects?.length === 0 && (
            <NoProjectComponent action={setShowAddProject} />
          )}

          {/* -- user has prjects in profile */}
          {Projects && Projects.length > 0 && (
            <div className='grid w-full grid-cols-3 gap-1 lg:gap-3'>
              {Projects.map((project) => (
                <div
                  className='col-span-3 lg:col-span-1 border p-4 rounded-lg shadow-md cursor-pointer duratrion-200 transition-all ease-in-out hover:ring-2 hover:ring-violet-light bg-white-main hover:shadow-xl flex flex-col gap-1'
                  onClick={() => router.push(`projects/${project.id}`)}
                  key={project.id}
                >
                  <p className='font-bold text-text-medium text-lg'>
                    {project.name}
                  </p>
                  <p className='text-sm font-thin'>
                    {oddTrimmer(project.description, 10)}
                  </p>
                  <span className='w-full flex flex-col py-2 mt-1 gap-1'>
                    <p className='text-text-thin text-xs font-magistral'>
                      <strong>Created at:</strong> &nbsp;
                      {new Date(project.createdAt).toLocaleString()}
                    </p>
                    <p className='text-text-thin text-xs font-magistral'>
                      <strong>Last modified:</strong> &nbsp;
                      {new Date(project.updatedAt).toLocaleString()}
                    </p>
                  </span>
                </div>
              ))}

              <div
                className='col-span-3 lg:col-span-1 border-2 border-dashed border-gray-300 p-4 rounded-lg shadow cursor-pointer duratrion-200 transition-all ease-in-out text-text-light hover:shadow-xl flex flex-col gap-1 items-center justify-center'
                onClick={() => setShowAddProject(() => true)}
              >
                {/* @ts-ignore */}
                <lord-icon
                  src='https://cdn.lordicon.com/mecwbjnp.json'
                  trigger='morph'
                  colors='primary:#858587,secondary:#6d28d9'
                  style={{ width: '70px', height: '70px' }}
                />
                <p>Add new Project</p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div>Loading...</div>
      )}
    </>
  );
};

export default Projects;

//=============================================>
// ======= Empty state COmponent -->
//=============================================>
const NoProjectComponent = ({
  action,
}: {
  action: React.Dispatch<SetStateAction<boolean>>;
}) => {
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

      <p className='text-2xl font-magistral font-medium text-text-light text-center'>
        <strong> OH MY!!!,</strong> there&apos;s nothing here
      </p>
      <p className='text-sm font-inter text-text-thin -mt-1'>
        Add a project to get started.
      </p>
      <button
        className='px-10 py-2 rounded-md shadow hover:shadow-lg transition-all duration-200 ease-in-out border bg-violet-main mt-4 text-white-off flex gap-2 items-center'
        onClick={() => action(true)}
      >
        Create new <PlusIcon className='w-6 h-6' />
      </button>
    </div>
  );
};
