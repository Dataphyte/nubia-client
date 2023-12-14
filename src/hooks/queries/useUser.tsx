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
  const { setUser, setUserUpdateData } = userStore();
  const Query = useQuery<LocalCustomResponse<any>>(
    'get-single-user',
    async () => {
      try {
        const user = await axios.get(
          `/api/users?session_id=${session?.user?.id}`
        );
        console.log(user.data);
        setUser(user.data.data);
        return user.data;
      } catch (error) {
        console.error(error);
      }
    },
    {
      refetchOnMount: true,
      refetchOnReconnect: true,
      refetchOnWindowFocus: true,
      staleTime: 10000,
    }
  );

  return Query;
};

//=============================================>
// ======= UPDATE SINGLE USER -->
//=============================================>

export const useUpdateUser = () => {
  const { data: session } = useSession();
  const { setUser } = userStore();
  const { userUpdateData: updateData } = userStore();

  const Query = useQuery(
    'update-single-user',
    async () => {
      try {
        const updatedUser = await axios.put(
          `/api/users?id=${session?.user?.id}`,
          updateData
        );
        setUser(updatedUser.data.data);
        return updatedUser;
      } catch (error) {
        console.error(error);
      }
    },
    manualFetchOptions
  );
  return Query;
};
