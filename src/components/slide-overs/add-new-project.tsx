import { Fragment, SetStateAction, useState } from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { useForm, SubmitHandler } from 'react-hook-form';
import { NewProjectFormInputs } from '@/src/app/decs';

type AddNewProjectProps = {
  state: boolean;
  setState: React.Dispatch<SetStateAction<boolean>>;
  action: () => void;
  setFormState: React.Dispatch<SetStateAction<NewProjectFormInputs>>;
};

export default function AddNewProjectSlideOver({
  state,
  setState,
  action,
  setFormState,
}: AddNewProjectProps) {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors, isSubmitSuccessful },
  } = useForm<NewProjectFormInputs>();

  const onSubmit: SubmitHandler<NewProjectFormInputs> = (data) => {
    try {
      setFormState(() => data);
      setTimeout(() => {
        action();
      }, 1500);
      setState(false);
    } catch (error) {
      console.log(error);
    }
  };

  console.log(watch('name'));
  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setState}>
        <Transition.Child
          as={'div'}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity duration-300' />
          <div className='fixed inset-0 overflow-hidden'>
            <div className='absolute inset-0 overflow-hidden'>
              <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10 sm:pl-16'>
                <Transition.Child
                  as={Fragment}
                  enter='transform transition ease-in-out duration-500 sm:duration-700'
                  enterFrom='translate-x-full opacity-0'
                  enterTo='translate-x-0 opacity-100'
                  leave='transform transition ease-in-out duration-500 sm:duration-700'
                  leaveFrom='translate-x-0 opacity-100'
                  leaveTo='translate-x-full opacity-0'
                >
                  <Dialog.Panel className='pointer-events-auto w-screen max-w-md'>
                    <form
                      className='flex h-full flex-col divide-y divide-gray-200 bg-white-main shadow-xl'
                      onSubmit={handleSubmit(onSubmit)}
                    >
                      <div className='h-0 flex-1 overflow-y-auto'>
                        <div className='bg-violet-dark px-4 py-6 sm:px-6'>
                          <div className='flex items-center justify-between'>
                            <Dialog.Title className='text-xl font-bold font-semibold leading-6 text-white-main'>
                              New Project
                            </Dialog.Title>
                            <div className='ml-3 flex h-7 items-center'>
                              <button
                                type='button'
                                className='relative rounded-md bg-violet-dark text-violet-200 hover:text-white focus:outline-none focus:ring-1 focus:ring-white-main hover:bg-red-main duration-300 ease-out transition-all hover:shadow-lg hover:ring-red-main'
                                onClick={() => setState(false)}
                              >
                                <span className='absolute -inset-2.5' />
                                <span className='sr-only'>Close panel</span>
                                <XMarkIcon
                                  className='h-6 w-6'
                                  aria-hidden='true'
                                />
                              </button>
                            </div>
                          </div>
                          <div className='mt-1'>
                            <p className='text-sm text-violet-light'>
                              Get started by filling in the information below to
                              create your new project.
                            </p>
                          </div>
                        </div>
                        <div className='flex flex-1 flex-col justify-between'>
                          <div className='divide-y divide-gray-200 px-4 sm:px-6'>
                            <div className='space-y-6 pb-5 pt-6'>
                              <div>
                                <label
                                  htmlFor='project-name'
                                  className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                  Project name
                                </label>
                                <div className='mt-2'>
                                  <input
                                    type='text'
                                    {...register('name')}
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-main sm:text-sm sm:leading-6'
                                  />
                                </div>
                              </div>
                              <div>
                                <label
                                  htmlFor='description'
                                  className='block text-sm font-medium leading-6 text-gray-900'
                                >
                                  Description
                                </label>
                                <div className='mt-2'>
                                  <textarea
                                    {...register('description')}
                                    rows={4}
                                    className='block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-violet-main sm:text-sm sm:leading-6'
                                    defaultValue={''}
                                  />
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div className='flex flex-shrink-0 justify-end px-4 py-4'>
                        <button
                          type='button'
                          className='rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50'
                          onClick={() => setState(false)}
                        >
                          Cancel
                        </button>
                        <button
                          type='submit'
                          className='py-2 px-8 rounded-md shadow bg-violet-main text-white-main duration-300 ease-out transition-all mx-3 hover:shadow-lg'
                        >
                          Save
                        </button>
                      </div>
                    </form>
                  </Dialog.Panel>
                </Transition.Child>
              </div>
            </div>
          </div>
        </Transition.Child>
      </Dialog>
    </Transition.Root>
  );
}
