'use client';

import React from 'react';
import { Fragment, useEffect } from 'react';
import { Transition } from '@headlessui/react';
import {
  CheckCircleIcon,
  InformationCircleIcon,
  ExclamationTriangleIcon,
} from '@heroicons/react/24/outline';
import { XMarkIcon } from '@heroicons/react/20/solid';
import { notificationStore } from '@/global/notificationStore';
import { classNames } from '@/src/utils/classnames';

const Notification = () => {
  const { show, setShow, content } = notificationStore();

  // ======= set the show prop to false after 3 seconds -->
  useEffect(() => {
    const newtime = setTimeout(() => {
      setShow(false);
    }, 5000);

    // cleanup
    return () => {
      clearTimeout(newtime);
    };
  }, [show, content]);

  return (
    <>
      {/* Global notification live region, render this permanently at the end of the document */}
      <div
        aria-live='assertive'
        className='pointer-events-none fixed inset-0 flex items-end px-4 py-6 sm:items-start sm:p-6 z-[100]'
      >
        <div className='flex w-full flex-col items-center space-y-4 sm:items-end'>
          {/* Notification panel, dynamically insert this into the live region when it needs to be displayed */}
          <Transition
            show={show}
            as={Fragment}
            enter='transform ease-out duration-300 transition'
            enterFrom='translate-y-2 translate-x-24 opacity-0 sm:translate-y-0 sm:translate-x-24'
            enterTo='translate-y-0 translate-x-0 opacity-100 sm:translate-x-0 bg-white-main'
            leave='transition ease-in duration-300'
            leaveFrom='opacity-100'
            leaveTo='opacity-0 translate-x-24'
          >
            <div
              className={classNames(
                'pointer-events-auto w-full max-w-sm overflow-hidden rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 relative border',
                content.type === 'success' && 'border-green-main',
                content.type === 'error' && 'border-red-main',
                content.type === 'info' && 'border-violet-main'
              )}
            >
              <div className='p-4'>
                <div className='flex items-start'>
                  <div className='flex-shrink-0'>
                    {
                      {
                        success: (
                          <CheckCircleIcon
                            className='h-6 w-6 text-green-main'
                            aria-hidden='true'
                          />
                        ),
                        error: (
                          <ExclamationTriangleIcon
                            className='h-6 w-6 text-red-main'
                            aria-hidden='true'
                          />
                        ),
                        info: (
                          <InformationCircleIcon
                            className='h-6 w-6 text-violet-main'
                            aria-hidden='true'
                          />
                        ),
                      }[content.type]
                    }
                  </div>
                  <div className='ml-3 w-0 flex-1 pt-0.5'>
                    <p className='text-sm font-medium text-gray-900'>
                      {content.text}
                    </p>
                    <p className='mt-1 text-sm text-gray-500'>
                      {content.description}
                    </p>
                  </div>
                  <div className='ml-4 flex flex-shrink-0'>
                    <button
                      type='button'
                      className='inline-flex rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                      onClick={() => {
                        setShow(false);
                      }}
                    >
                      <span className='sr-only'>Close</span>
                      <XMarkIcon className='h-5 w-5' aria-hidden='true' />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </Transition>
        </div>
      </div>
    </>
  );
};

export default Notification;
