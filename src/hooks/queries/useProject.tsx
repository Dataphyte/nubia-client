'use client';

import { LocalCustomResponse } from '@/src/typescript/server';
import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { ProjectSchema } from '@/src/typescript/project';
import { projectStore } from '@/src/global/projectStore';

const manualFetchOptions: UseQueryOptions<any> = {
  enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  staleTime: Infinity,
};

//=============================================>
// ======= GET PROJECT LIST -->
//=============================================>
export const useGetProjectList = () => {
  const { data: session } = useSession();
  const Query = useQuery<LocalCustomResponse<ProjectSchema[]>>(
    'get-project-list',
    async () => {
      try {
        const project = await axios.get(
          `/api/projects?session_id=${session?.user?.id}`
        );
        return project.data;
      } catch (error) {
        console.log(error);
      }
    },
    { refetchInterval: 3000, staleTime: 3000 }
  );
  return Query;
};

//=============================================>
// ======= CREATE PROJECT -->
//=============================================>
export const useCreateProject = (projectData: {
  name: string;
  description: string;
}) => {
  const { data: session } = useSession();
  const Query = useQuery<LocalCustomResponse<ProjectSchema>>(
    'create-new-project',
    async () => {
      try {
        const newProject = await axios.post(
          `/api/projects?session_id=${session!.user.id}`,
          {
            ...projectData,
            userId: session?.user.id,
          }
        );
        return newProject.data;
      } catch (error) {
        console.log(error);
      }
    },
    manualFetchOptions
  );

  return Query;
};

//=============================================>
// ======= GET SINGLE PROJECT -->
//=============================================>
export const useGetSingleProject = (projectId: string) => {
  const Query = useQuery<LocalCustomResponse<ProjectSchema>>(
    'get-single-project',
    async () => {
      try {
        const project = await axios.get(`/api/projects/${projectId}`);
        // console.log(project);

        return project.data;
      } catch (error) {
        return null;
      }
    },
    manualFetchOptions
  );

  return Query;
};

//=============================================>
// ======= UPDATE SINGLE PROJECT -->
//=============================================>
export const useUpdateProjectData = (projectId: string) => {
  const { updateData } = projectStore();
  // useEffect(() => {
  //   console.log(updateData);
  // }, [updateData]);

  const Query = useQuery<LocalCustomResponse<any>>(
    'update-single-project',
    async () => {
      try {
        const queryData = await axios.put(
          `/api/projects/${projectId}`,
          updateData
        );

        return queryData.data;
      } catch (error) {
        console.error(error);
      }
    },
    manualFetchOptions
  );

  return Query;
};

//=============================================>
// ======= DELETE SINGLE PROJECT -->
//=============================================>
export const useDeleteProject = (projectId: string) => {
  const Query = useQuery<LocalCustomResponse<any>>(
    'delete-single-project',
    async () => {
      try {
        const queryData = await axios.delete(`/api/projects/${projectId}`);

        return queryData.data;
      } catch (error) {
        console.error(error);
      }
    },
    manualFetchOptions
  );

  return Query;
};
