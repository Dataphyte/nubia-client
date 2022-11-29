'use client';

import Head from './head';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { Fragment, useEffect, useState } from 'react';
import { usePathname } from 'next/navigation';

// ======= component imports -->
import { Dialog, Menu, Transition } from '@headlessui/react';
import { MagnifyingGlassIcon } from '@heroicons/react/20/solid';
import {
  Bars3BottomLeftIcon,
  BellIcon,
  PowerIcon,
  XMarkIcon,
} from '@heroicons/react/24/outline';

// ======= utils imports -->
import useSWR from 'swr';
import { fetcher } from '@/utils/fetcher';
import { storyStore } from '@/global/storyStore';
import { classNames } from 'src/utils/classnames';

// ======= data imports -->
import { navigation, userNavigation } from '@/data/toolData';

const Layout = ({ children }) => {
  const router = useRouter();
  const pathname = usePathname();
  const { storyRoute, setCurrentStoryCategory, setCurrentData } = storyStore();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const { data: Story, error } = useSWR(
    storyRoute ? `https://nubia-server.oa.r.appspot.com/${storyRoute}` : null,
    fetcher
  );
  const { data: StoryData, error: dataError } = useSWR(
    storyRoute
      ? `https://nubia-server.oa.r.appspot.com/${storyRoute}/data`
      : null,
    fetcher
  );

  // ======= Story effect -->
  useEffect(() => {
    (() => {
      if (error) return console.error(error);
      !error && Story && setCurrentStoryCategory(Story.data);
      Story && console.log(Story);
    })();
  }, [Story, error]);

  // ======= data effect -->
  useEffect(() => {
    (() => {
      if (dataError) return console.error(dataError);
      !error && StoryData && setCurrentData(StoryData.data);
      StoryData && console.log(StoryData);
    })();
  }, [StoryData, dataError]);

  return (
    <>
      <Head />
      <div>
        <Transition.Root show={sidebarOpen} as={Fragment}>
          <Dialog
            as='div'
            className='relative z-40 md:hidden'
            onClose={setSidebarOpen}
          >
            <Transition.Child
              as={Fragment}
              enter='transition-opacity ease-linear duration-300'
              enterFrom='opacity-0'
              enterTo='opacity-100'
              leave='transition-opacity ease-linear duration-300'
              leaveFrom='opacity-100'
              leaveTo='opacity-0'
            >
              <div className='fixed inset-0 bg-text-light bg-opacity-75' />
            </Transition.Child>

            <div className='fixed inset-0 z-40 flex'>
              <Transition.Child
                as={Fragment}
                enter='transition ease-in-out duration-300 transform'
                enterFrom='-translate-x-full'
                enterTo='translate-x-0'
                leave='transition ease-in-out duration-300 transform'
                leaveFrom='translate-x-0'
                leaveTo='-translate-x-full'
              >
                <Dialog.Panel className='relative flex w-full max-w-xs flex-1 flex-col bg-[#1E293B] pt-5 pb-4'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-300'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-300'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute top-0 right-0 -mr-12 pt-2'>
                      <button
                        type='button'
                        className='ml-1 flex h-10 w-10 items-center justify-center rounded-full focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white-off'
                        onClick={() => setSidebarOpen(false)}
                      >
                        <span className='sr-only'>Close sidebar</span>
                        <XMarkIcon
                          className='h-6 w-6 text-white-off'
                          aria-hidden='true'
                        />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex flex-shrink-0 items-center px-4'>
                    <p className='font-black-ops text-black-thin'>NUBIA</p>
                  </div>
                  <div className='mt-5 h-0 flex-1 overflow-y-auto'>
                    <nav className='space-y-1 px-2'>
                      {navigation.map((item) => (
                        <Link
                          key={item.name}
                          href={item.href}
                          className={classNames(
                            pathname.indexOf(item.href) !== -1
                              ? 'bg-violet-dark text-white-main'
                              : 'text-white-off hover:bg-violet-main hover:text-white-main',
                            'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                          )}
                          onClick={() => setSidebarOpen(false)}
                        >
                          <item.icon
                            className={classNames(
                              pathname.indexOf(item.href) !== -1
                                ? 'text-white-main'
                                : 'text-white-off group-hover:text-white-main',
                              'mr-4 flex-shrink-0 h-6 w-6'
                            )}
                            aria-hidden='true'
                          />
                          {item.name}
                        </Link>
                      ))}

                      {/* ====== exit item */}
                      <Link
                        href='/'
                        className={classNames(
                          'text-white-off hover:bg-red-main hover:text-white-main',
                          'group flex items-center px-2 py-2 text-base font-medium rounded-md'
                        )}
                      >
                        <PowerIcon
                          className={classNames(
                            'text-red-main group-hover:text-white-main',
                            'mr-4 flex-shrink-0 h-6 w-6'
                          )}
                          aria-hidden='true'
                        />
                        Exit
                      </Link>
                    </nav>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
              <div className='w-14 flex-shrink-0' aria-hidden='true'>
                {/* Dummy element to force sidebar to shrink to fit close icon */}
              </div>
            </div>
          </Dialog>
        </Transition.Root>

        {/* ====== ############### */}
        {/* ====== ############### */}
        {/* ====== ############### */}
        {/* Static sidebar for desktop */}
        <div className='hidden md:fixed md:inset-y-0 md:flex md:w-64 md:flex-col'>
          {/* Sidebar component, swap this element with another sidebar if you like */}
          <div className='flex min-h-0 flex-1 flex-col bg-[#1E293B]'>
            <div className='flex h-16 flex-shrink-0 items-center bg-gray-900 px-4'>
              <p className='font-black-ops text-3xl text-white-off'>NUBIA</p>
            </div>
            <div className='flex flex-1 flex-col overflow-y-auto'>
              <nav className='flex-1 space-y-1 px-2 py-4'>
                {navigation.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className={classNames(
                      pathname.indexOf(item.href) !== -1
                        ? 'bg-violet-dark text-white-main'
                        : 'text-black-thin hover:bg-violet-main/10 hover:text-white-main',
                      'group flex items-center px-2 py-2 text-sm font-medium rounded-md tracking-wider'
                    )}
                  >
                    <item.icon
                      className={classNames(
                        pathname.indexOf(item.href) !== -1
                          ? 'text-white-main'
                          : 'text-white-off group-hover:text-black-thin',
                        'mr-3 flex-shrink-0 h-6 w-6'
                      )}
                      aria-hidden='true'
                    />
                    {item.name}
                  </Link>
                ))}

                {/* ====== exit nav option for desktop */}
                <Link
                  href='/'
                  className={classNames(
                    'text-black-thin hover:bg-red-main hover:text-white-main',
                    'group flex items-center px-2 py-2 text-sm font-medium rounded-md tracking-wider'
                  )}
                >
                  <PowerIcon
                    className={classNames(
                      'text-red-main group-hover:text-black-thin',
                      'mr-3 flex-shrink-0 h-6 w-6'
                    )}
                    aria-hidden='true'
                  />
                  Exit
                </Link>
              </nav>
            </div>
          </div>
        </div>
        <div className='flex flex-col md:pl-64'>
          <div className='sticky top-0 z-10 flex h-16 flex-shrink-0 bg-white shadow'>
            <button
              type='button'
              className='border-r border-gray-200 px-4 text-gray-500 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 md:hidden'
              onClick={() => setSidebarOpen(true)}
            >
              <span className='sr-only'>Open sidebar</span>
              <Bars3BottomLeftIcon className='h-6 w-6' aria-hidden='true' />
            </button>
            <button
              className='px-3 h-full text-text-thin border hover:border-red-400 hover:text-red-400 hover:shadow-lg duration-300 ease-out'
              onClick={() => router.back()}
            >
              Back
            </button>
            <div className='flex flex-1 justify-between px-4'>
              <div className='flex flex-1'>
                <form className='flex w-full md:ml-0' action='#' method='GET'>
                  <label htmlFor='search-field' className='sr-only'>
                    Search
                  </label>
                  <div className='relative w-full text-gray-400 focus-within:text-gray-600'>
                    <div className='pointer-events-none absolute inset-y-0 left-0 flex items-center'>
                      <MagnifyingGlassIcon
                        className='h-5 w-5'
                        aria-hidden='true'
                      />
                    </div>
                    <input
                      id='search-field'
                      className='block h-full w-full border-transparent py-2 pl-8 pr-3 text-gray-900 bg-transparent placeholder-gray-500 focus:border-transparent focus:placeholder-gray-400 focus:outline-none focus:ring-0 sm:text-sm'
                      placeholder='Search'
                      type='search'
                      name='search'
                    />
                  </div>
                </form>
              </div>
              <div className='ml-4 flex items-center md:ml-6'>
                <button
                  type='button'
                  className='rounded-full bg-white p-1 text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'
                >
                  <span className='sr-only'>View notifications</span>
                  <BellIcon className='h-6 w-6' aria-hidden='true' />
                </button>

                {/* Profile dropdown */}
                <Menu as='div' className='relative ml-3'>
                  <div>
                    <Menu.Button className='flex max-w-xs items-center rounded-full bg-white text-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2'>
                      <span className='sr-only'>Open user menu</span>
                      <img
                        className='h-8 w-8 rounded-full'
                        src='https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80'
                        alt=''
                      />
                    </Menu.Button>
                  </div>
                  <Transition
                    as={Fragment}
                    enter='transition ease-out duration-100'
                    enterFrom='transform opacity-0 scale-95'
                    enterTo='transform opacity-100 scale-100'
                    leave='transition ease-in duration-75'
                    leaveFrom='transform opacity-100 scale-100'
                    leaveTo='transform opacity-0 scale-95'
                  >
                    <Menu.Items className='absolute right-0 z-10 mt-2 w-48 origin-top-right rounded-md bg-white-main py-1 shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none'>
                      {userNavigation.map((item) => (
                        <Menu.Item key={item.name}>
                          {({ active }) => (
                            <a
                              href={item.href}
                              className={classNames(
                                active ? 'bg-gray-100' : '',
                                'block px-4 py-2 text-sm text-gray-700'
                              )}
                            >
                              {item.name}
                            </a>
                          )}
                        </Menu.Item>
                      ))}
                    </Menu.Items>
                  </Transition>
                </Menu>
              </div>
            </div>
          </div>

          <main className='flex-1 bg-white-off'>
            <div className='py-6'>
              <div className='mx-auto max-w-7xl px-4 sm:px-6 md:px-8'>
                {/* Replace with your content */}
                {children}
                {/* /End replace */}
              </div>
            </div>
          </main>
        </div>
      </div>
    </>
  );
};

export default Layout;
