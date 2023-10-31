import React from 'react';
import axios from 'axios';
import { UseQueryOptions, useQuery } from 'react-query';
import { useSession } from 'next-auth/react';
import { userStore } from '@/src/global/userStore';
import { LocalCustomResponse } from '@/src/typescript/server';

const manualFetchOptions: UseQueryOptions<any> = {
  enabled: false,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: true,
  staleTime: Infinity,
};

//=============================================>
// ======= GET SINGLE USER -->
//=============================================>
export const useGetUser = () => {
  const { data: session } = useSession();
  const { setUser } = userStore();
  const Query = useQuery<LocalCustomResponse<any>>(
    'get-single-user',
    async () => {
      try {
        const user = await axios.get(
          `/api/users?session_id=${session!.user?.id}`
        );
        console.log(user.data);
        setUser(user.data.data);
        return user.data;
      } catch (error) {
        console.error(error);
      }
    },
    {
      staleTime: 10000,
    }
  );

  return Query;
};
manualFetchOptions;
