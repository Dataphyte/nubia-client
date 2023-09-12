import React, { useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useQuery } from 'react-query';
import { auth } from '@/utils/firebase/firebase';
import {
  createUserWithEmailAndPassword,
  sendEmailVerification,
  updateProfile,
} from 'firebase/auth';

/**
 *
 * @param {('user-sign-up' | 'user-sign-in' | 'get-user-profile')} target - Unique query key for Tan Query
 * @param {*} payload - Data object to complete query
 * @returns
 */
const useUserQuery = (target, payload) => {
  let Query;
  const { update: sessionUpdate } = useSession();
  const [localState, setLocalState] = useState(null);
  const noAutoFetchOptions = {
    enabled: false,
    refetchOnMount: false,
    refetchOnWindowFocus: false,
    refetchOnReconnect: false,
  };

  switch (target) {
    // ======= user sign up -->
    // states: 'firebaseLoading' | 'firebaseSuccess' | 'databaseLoading' | 'databaseSuccess'
    case 'user-sign-up':
      Query = useQuery(
        'user-sign-up',
        async () => {
          // step 1
          setLocalState('firebaseLoading');
          createUserWithEmailAndPassword(auth, payload.email, payload.password)
            .then(async (userCredentials) => {
              updateProfile(auth.currentUser, {
                displayName: `${payload.firstname} ${payload.lastname}`,
              });
              // sendEmailVerification(auth.currentUser);
              setLocalState('firebaseSuccess');

              // step 2
              setTimeout(async () => {
                setLocalState('databaseLoading');
                await axios
                  .post('http://localhost:8000/user', {
                    ...payload,
                    uid: userCredentials.user.uid,
                  })
                  .then((res) => {
                    console.log(res);
                    console.log('userCredentials==>' + userCredentials);
                    console.log(auth.currentUser);
                    sessionUpdate({
                      data: {
                        user: auth.currentUser,
                        accessToken: auth.currentUser?.accessToken,
                      },
                      status: 'authenticated',
                    });
                    setTimeout(() => {
                      setLocalState('databaseSuccess');
                    }, 1200);
                  })
                  .catch((error) => {
                    console.log(error);
                    setLocalState('error');
                    setTimeout(() => {
                      setLocalState(null);
                    }, 2000);
                  });
              }, 1000);
            })
            .catch((error) => {
              console.log(error);
              setLocalState('error');
              setTimeout(() => {
                setLocalState(null);
              }, 2000);
            });
        },
        { ...noAutoFetchOptions }
      );

    default:
      break;
  }
  return { Query, localState };
};

export default useUserQuery;
