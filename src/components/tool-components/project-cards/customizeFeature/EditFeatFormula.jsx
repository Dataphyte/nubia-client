'use client';
import { Fragment, useRef, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { CheckIcon } from '@heroicons/react/24/outline';
import { projectStore } from '@/src/global/projectStore';

export default function EditFeatFormula({ open, setOpen, action }) {
  //   const [open, setOpen] = useState(true);
  const { projectData } = projectStore();

  const cancelButtonRef = useRef(null);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog
        as='div'
        className='relative z-50'
        initialFocus={cancelButtonRef}
        onClose={setOpen}
      >
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-200'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 w-screen overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white-main px-4 pb-4 pt-5 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg sm:p-6'>
                <div>
                  <div className='mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-100'>
                    <CheckIcon
                      className='h-6 w-6 text-green-600'
                      aria-hidden='true'
                    />
                  </div>
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-base font-semibold leading-6 text-gray-900 font-bold'
                    >
                      Add formula entry
                    </Dialog.Title>
                    <form className='my-5 grid grid-cols-6 w-full gap-3 border py-6 px-3 rounded-md border-gray-400'>
                      {/* -- TYPE OF ENTRY */}
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='type'
                          className='block text-sm font-medium leading-6 text-gray-900 w-max'
                        >
                          Type
                        </label>
                        <div className='mt-2'>
                          <select
                            id='type'
                            name='type'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                          >
                            <option>Data</option>
                            <option>Custom</option>
                          </select>
                        </div>
                      </div>

                      {/* -- REF FIELD FROM DATASET */}
                      <div className='sm:col-span-3'>
                        <label
                          htmlFor='field'
                          className='block text-sm font-medium leading-6 text-gray-900 w-max'
                        >
                          Field
                        </label>
                        <div className='mt-2'>
                          <select
                            id='field'
                            name='field'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                          >
                            <option>Data</option>
                            <option>Custom</option>
                          </select>
                        </div>
                      </div>

                      {/* -- VALUE */}
                      <div className='sm:col-span-4'>
                        <label
                          htmlFor='value'
                          className='block text-sm font-medium leading-6 text-gray-900 w-max'
                        >
                          Value
                        </label>
                        <div className='mt-2'>
                          <input
                            id='value'
                            name='value'
                            type='text'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6'
                          />
                        </div>
                      </div>

                      {/* -- OPERAND */}
                      <div className='sm:col-span-2'>
                        <label
                          htmlFor='field'
                          className='block text-sm font-medium leading-6 text-gray-900 w-max'
                        >
                          Operand
                        </label>
                        <div className='mt-2'>
                          <select
                            id='field'
                            name='field'
                            className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:max-w-xs sm:text-sm sm:leading-6'
                          >
                            <option>None</option>
                            <option>+</option>
                            <option>-</option>
                            <option>*</option>
                            <option>/</option>
                          </select>
                        </div>
                      </div>
                    </form>
                  </div>
                </div>
                <div className='mt-5 sm:mt-10 sm:grid sm:grid-flow-row-dense sm:grid-cols-2 sm:gap-3'>
                  <button
                    type='button'
                    className='inline-flex w-full justify-center rounded-md bg-violet-dark px-3 py-2 text-sm font-semibold text-white-main shadow-sm hover:bg-violet-main focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-violet-dark sm:col-start-2'
                    onClick={() => setOpen(false)}
                  >
                    Add
                  </button>
                  <button
                    type='button'
                    className='mt-3 inline-flex w-full justify-center rounded-md bg-white-main px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:col-start-1 sm:mt-0'
                    onClick={() => setOpen(false)}
                    ref={cancelButtonRef}
                  >
                    Cancel
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
