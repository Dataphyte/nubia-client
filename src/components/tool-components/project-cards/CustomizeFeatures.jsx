'use client';

import React, { useState, Fragment, useEffect } from 'react';
import { projectStore } from '@/src/global/projectStore';
import { classNames } from '@/src/utils/classnames';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PencilIcon, TrashIcon, PlusIcon } from '@heroicons/react/20/solid';

const CustomizeFeatures = () => {
  const [currentFeat, setCurrentFeat] = useState({});
  const { projectData, setProjectData } = projectStore();
  const [showEditForm, setShowEditForm] = useState(false);

  return (
    <div className='flex flex-col gap-2 w-full'>
      <FeatEditorForm
        open={showEditForm}
        setOpen={setShowEditForm}
        feature={currentFeat}
      />
      {/* -- list */}
      <ul
        role='list'
        className='grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3'
      >
        {projectData &&
          projectData.features.map((feature) => (
            <li
              key={feature.id}
              className='col-span-1 divide-y divide-gray-200 rounded-lg bg-white lg:col-span-1 border shadow-md cursor-pointer duratrion-200 transition-all ease-in-out hover:ring-2 hover:ring-violet-light bg-white-main hover:shadow-xl flex flex-col gap-1'
            >
              <div className='flex w-full items-center justify-between space-x-6 p-6'>
                <div className='flex-1 truncate'>
                  <div className='flex items-center space-x-3'>
                    <h3 className='truncate text-sm font-medium text-gray-900'>
                      {feature.name}
                    </h3>
                    <span
                      className={classNames(
                        'inline-flex flex-shrink-0 items-center rounded-full px-1.5 py-0.5 text-xs font-medium ring-1 ring-inset ',
                        feature.type === 'Custom'
                          ? 'text-violet-dark bg-violet-50 ring-violet-main/20'
                          : ' text-green-700 ring-green-600/20 bg-green-50 '
                      )}
                    >
                      {feature.type}
                    </span>
                  </div>
                  <p className='mt-1 truncate text-sm text-gray-500'>
                    {feature.formula}
                  </p>
                </div>
              </div>
              <div>
                <div className='-mt-px flex divide-x divide-gray-200'>
                  <div className='flex w-0 flex-1 group'>
                    <p
                      className='relative -mr-px inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-bl-lg border border-transparent py-4 text-sm font-semibold text-gray-900 '
                      onClick={() => {
                        setCurrentFeat(feature);
                        setShowEditForm(true);
                      }}
                    >
                      <PencilIcon
                        className='h-5 w-5 text-gray-400 group-hover:text-violet-main'
                        aria-hidden='true'
                      />
                      Edit
                    </p>
                  </div>
                  <div className='-ml-px flex w-0 flex-1 group'>
                    <a
                      href={`tel:${feature.telephone}`}
                      className='relative inline-flex w-0 flex-1 items-center justify-center gap-x-3 rounded-br-lg border border-transparent py-4 text-sm font-semibold text-gray-900'
                    >
                      <TrashIcon
                        className='h-5 w-5 text-gray-400 group-hover:text-red-main'
                        aria-hidden='true'
                      />
                      Delete
                    </a>
                  </div>
                </div>
              </div>
            </li>
          ))}

        {/* -- Add new feature */}
        <li
          className='col-span-1 rounded-lg lg:col-span-1 border-2 border-dashed hover:shadow-md cursor-pointer duratrion-200 transition-all ease-in-out flex flex-col gap-2 group items-center justify-center min-h-[140px]'
          onClick={() => {
            setCurrentFeat({});
            setShowEditForm(true);
          }}
        >
          <PlusIcon className='w-10 h-10 text-gray-400' />
          <p>Add new feature</p>
        </li>
      </ul>
    </div>
  );
};

export default CustomizeFeatures;

//=============================================>
// ======= FEATURE EDITOR FORM -->
//=============================================>
const FeatEditorForm = ({ open, setOpen, feature }) => {
  const [localFeat, setLocalFeat] = useState(feature);
  const [DataFeat, setDataFeat] = useState(false);
  const { projectData, setProjectData } = projectStore();

  useEffect(() => {
    setLocalFeat(feature);
    console.log(localFeat);
  }, [feature]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                  <div className='flex h-full flex-col overflow-y-scroll bg-white-main py-6 shadow-xl'>
                    <div className='px-4 sm:px-6'>
                      <div className='flex items-start justify-between'>
                        <Dialog.Title className='text-base font-semibold leading-6 text-gray-900'>
                          Edit Feature
                        </Dialog.Title>
                        <div className='ml-3 flex h-7 items-center'>
                          <button
                            type='button'
                            className='relative rounded-md bg-white text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                            onClick={() => setOpen(false)}
                          >
                            <span className='absolute -inset-2.5' />
                            <span className='sr-only'>Close panel</span>
                            <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div className='relative mt-6 flex-1 px-4 sm:px-6'>
                      {/* Your content */}
                      <form>
                        <div className='border-b border-gray-900/10 pb-12'>
                          <h2 className='text-base font-semibold leading-7 text-gray-900'>
                            Feature Information
                          </h2>
                          <p className='mt-1 text-sm leading-6 text-gray-600'>
                            Use a permanent address where you can receive mail.
                          </p>

                          <div className='mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6'>
                            {/* -- NAME */}
                            <div className='col-span-full'>
                              <label
                                htmlFor='feature-name'
                                className='block text-sm font-medium leading-6 text-gray-900'
                              >
                                Feature Name
                              </label>
                              <div className='mt-2'>
                                <input
                                  type='text'
                                  name='feature-name'
                                  id='feature-name'
                                  value={localFeat.name}
                                  onChange={(e) =>
                                    setLocalFeat((state) => ({
                                      ...state,
                                      name: e.target.value,
                                    }))
                                  }
                                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                                />
                              </div>
                            </div>

                            {/* -- FEATURE TYPE */}
                            <div className='sm:col-span-3'>
                              <label
                                htmlFor='feature-type'
                                className='block text-sm font-medium leading-6 text-gray-900'
                              >
                                Feature Type
                              </label>
                              <div className='mt-2'>
                                <select
                                  id='feature-type'
                                  name='feature-type'
                                  className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                                  onChange={(e) =>
                                    setLocalFeat((state) => ({
                                      ...state,
                                      type: e.target.value,
                                    }))
                                  }
                                  value={localFeat.type}
                                >
                                  <option value='Data'>Data</option>
                                  <option value='Custom'>Custom</option>
                                </select>
                              </div>
                            </div>

                            {/* -- REFERENCE */}
                            <div className='sm:col-span-3'>
                              <label
                                htmlFor='feature-ref'
                                className='block text-sm font-medium leading-6 text-gray-900'
                              >
                                Field Ref
                              </label>
                              <div className='mt-2'>
                                <select
                                  id='feature-ref'
                                  name='feature-ref'
                                  className={classNames(
                                    'block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-insetfocus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6 cursor-pointer',
                                    localFeat.type === 'Custom'
                                      ? 'ring-red-main cursor-not-allowed'
                                      : ' ring-green-main '
                                  )}
                                  disabled={localFeat.type == 'Custom'}
                                >
                                  <option>~~ Select field ~~</option>
                                  {projectData &&
                                    projectData.parsed.meta.fields.map(
                                      (field, idx) => (
                                        <option key={idx} value={field}>
                                          {field}
                                        </option>
                                      )
                                    )}
                                </select>
                              </div>
                            </div>

                            {/* -- Customize feature */}
                            <div className='sm:col-span-3'>
                              <label
                                htmlFor='feature-type'
                                className='block text-sm font-medium leading-6 text-gray-900'
                              >
                                Manage custom feature
                              </label>
                            </div>
                          </div>
                        </div>
                      </form>

                      <button className='w-max text-base bg-violet-main text-white-off rounded-md transition-all duration-200 ease-out cursor-pointer  mt-4 py-1.5 px-7 shadow hover:shadow-md'>
                        Save
                      </button>
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
};
