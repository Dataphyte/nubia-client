'use client';

import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { useSession } from 'next-auth/react';

const manualFetchOptions: UseQueryOptions = {
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
  const Query = useQuery(
    'get-project-list',
    async () => {
      return await axios
        .get(`/api/projects?session_id=${session?.user.id}`, {
          headers: { Authorization: session?.user.id! },
        })
        .then((res) => {
          console.table(res.data);
          return res.data;
        })
        .catch((error) => console.log(error));
    },
    manualFetchOptions
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
  const Query = useQuery(
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
        console.log(newProject);
        return newProject;
      } catch (error) {
        console.log(error);
        return;
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
  const Query = useQuery('get-single-project', async () => {
    try {
      const project = await axios.get(`/api/project/${projectId}`);
      return project;
    } catch (error) {
      console.log(error);
    }
  });
};
