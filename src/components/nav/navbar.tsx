'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import MenuBars from '@/icons/menu-bars';
import { usePathname } from 'next/navigation';
import useScrolled from '@/hooks/useScrolled';
import { classNames } from 'src/utils/classnames';
import CloseIcon from '@/icons/close-icon';
import { useRouter } from 'next/navigation';
import { signOut, useSession } from 'next-auth/react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Nubia', href: 'about' },
  { label: 'Our journey', href: 'journey' },
  { label: 'How it works', href: 'how-it-works' },
];

const Navbar = () => {
  const { data: session, status: sessionStatus } = useSession();
  const pathname = usePathname();
  const scrolled = useScrolled();
  const router = useRouter();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showMiniProfile, setShowMiniProfile] = useState(true);

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  return (
    <nav
      className={classNames(
        'w-full flex px-10 md:px-16 items-center justify-between fixed top-0 z-40 duration-300 ease-out transition-all',
        scrolled
          ? 'bg-white-main shadow-md md:px-5 lg:px-20 h-20'
          : ' h-24 lg:px-28 md:px-10'
      )}
    >
      <span className='flex items-center justify-center'>
        <Link className='nav__logo-text flex' href='/'>
          NUBIA <p className='hidden md:block'>&nbsp;&nbsp;&nbsp;|</p>
        </Link>
        {/* ====== NAV LINKS */}
        <span className='hidden md:flex px-3 gap-8 md:text-xs lg:text-base'>
          {navItems.map((item, index) => (
            <Link
              href={item.href}
              key={index}
              className={classNames(
                'nav__link',
                pathname.indexOf(item.href) !== -1 && 'text-violet-main'
              )}
            >
              {item.label}
            </Link>
          ))}
        </span>
      </span>

      {/* ====== CALL TO ACTION */}
      <div>
        {sessionStatus &&
          {
            authenticated: (
              <span className='items-center justify-center gap-2 hidden md:flex'>
                <span
                  className={classNames(
                    'flex items-center justify-center gap-4 border border-gray-400 rounded-md shadow-md py-1 px-2 lg:py-2 lg:px-4 duration-500 ease-out relative ',
                    showMiniProfile
                      ? 'opacity-100 left-0 pointer-events-auto'
                      : 'opacity-0 left-7 pointer-events-none'
                  )}
                >
                  <p className='text-text-light text-sm'>
                    Welcome,&nbsp;
                    <b className='text-violet-main'>
                      {session?.user?.name?.split(' ')[0]}
                    </b>
                  </p>
                  <button
                    className={classNames(
                      'hidden md:block py-1.5 px-3 text-xs rounded-lg shadow font-inter bg-red-main text-white-off duration-150 ease-out hover:shadow-lg'
                    )}
                    onClick={() => signOut({ callbackUrl: '/' })}
                  >
                    Sign out
                  </button>
                </span>
                {/* @ts-ignore */}
                <lord-icon
                  src='https://cdn.lordicon.com/eszyyflr.json'
                  trigger='click'
                  colors='primary:#121331,secondary:#6d28d9'
                  style={{
                    width: '55px',
                    height: '55px',
                    cursor: 'pointer',
                    position: 'relative',
                  }}
                  class='hover:shadow-md border border-violet-light/0 ml-2 hover:border-violet-main/80 rounded-lg transition-all duration-200 ease-out'
                  onClick={() => setShowMiniProfile((state) => !state)}
                />
              </span>
            ),
            unauthenticated: (
              <button
                // href='https://github.com/Dataphyte/Nubia-server'
                className='hidden md:block py-2 px-5 text-sm rounded-lg shadow font-inter bg-violet-dark text-white-off duration-150 ease-out hover:shadow-lg'
                onClick={() => router.push('/auth/signup')}
              >
                Sign in
              </button>
            ),
          }[sessionStatus]}
        {!sessionStatus && <p>Loading...</p>}
      </div>

      {/* ====== MOBILE MENU */}
      <span
        className='md:hidden w-10 h-8 flex items-center justify-center border border-violet-main cursor-pointer rounded-md shadow-lg'
        onClick={handleMenu}
      >
        <MenuBars sx='w-8 h-6' />
      </span>

      {/* ====== MOBILE MENU BOX */}
      <div
        className={classNames(
          'md:hidden h-screen flex flex-col items-center pt-28 absolute top-0 right-0 bg-[#1E293B] duration-300 ease-out',
          menuOpen ? 'w-full right-0 opacity-1' : 'w-0 -right-10 opacity-0'
        )}
      >
        {/* ====== close button */}
        <motion.span
          initial={{ opacity: 0, rotate: '-90deg', scale: 0.2 }}
          whileInView={{ opacity: 1, rotate: '0deg', scale: 1 }}
          transition={{ duration: 0.3, delay: 0.4 }}
          className={classNames(
            menuOpen
              ? 'md:hidden w-10 h-8 flex items-center justify-center border border-violet-light cursor-pointer rounded-md shadow-lg  absolute right-10 top-6'
              : 'hidden'
          )}
          onClick={handleMenu}
        >
          <CloseIcon sx='w-8 h-6 text-violet-light' />
        </motion.span>

        {/* ====== NAV LINKS */}
        <motion.span
          initial={{ opacity: 0, width: 0, border: 'none' }}
          whileInView={{
            opacity: 1,
            width: '80%',
            borderTop: 'thin solid gray',
          }}
          transition={{ delay: 0.3, duration: 0.6 }}
          className='flex h-full flex-col items-center px-4 gap-10 border-t border-white-off/80 pt-10 md:hidden whitespace-nowrap overflow-hidden relative'
        >
          {navItems.map((item, index) => (
            <span className='flex w-max h-max' key={index}>
              <Link
                href={item.href}
                className={classNames(
                  'nav__link-mobile',
                  pathname.indexOf(item.href) !== -1 && 'text-violet-main'
                )}
                onClick={handleMenu}
              >
                {item.label}
              </Link>
            </span>
          ))}

          <Link
            href='https://github.com/Dataphyte/Nubia-server'
            className='text-white-off font-inter font-medium bg-violet-main w-[90%] flex items-center py-3 shadow-lg rounded-lg justify-center'
          >
            Add a story
          </Link>
        </motion.span>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
