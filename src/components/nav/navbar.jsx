'use client';

import Link from 'next/link';
import { motion } from 'framer-motion';
import React, { useState } from 'react';
import MenuBars from '@/icons/menu-bars';
import { usePathname } from 'next/navigation';
import useScrolled from '@/hooks,useScrolled';
import { classNames } from 'src/utils/classnames';
import CloseIcon from '@/icons/close-icon';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Nubia', href: 'about' },
  { label: 'Our journey', href: 'journey' },
];

const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();
  const [menuOpen, setMenuOpen] = useState(false);

  const handleMenu = () => {
    setMenuOpen((state) => !state);
  };

  return (
    <nav
      className={classNames(
        'w-full flex px-10 md:px-16 items-center justify-between fixed top-0 z-40 duration-300 ease-out transition-all',
        scrolled ? 'bg-white-main shadow-md lg:px-32 h-16' : ' h-20 lg:px-48'
      )}
    >
      <Link className='nav__logo-text' href='/'>
        NUBIA
      </Link>

      {/* ====== NAV LINKS */}
      <span className='hidden md:flex  px-4 gap-8'>
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

      {/* ====== CALL TO ACTION */}
      <Link
        href='https://github.com/Dataphyte/Nubia-server'
        className='hidden md:block py-2 px-5 text-sm rounded-lg shadow font-inter bg-violet-dark text-white-off duration-150 ease-out hover:shadow-lg'
      >
        Add a story
      </Link>

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
          'md:hidden h-screen flex flex-col items-center pt-44 absolute top-0 right-0 bg-[#1E293B] duration-300 ease-out',
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
          className='flex h-full flex-col items-center justify-center px-4 gap-28 border-t border-white-off/80 pt-28 md:hidden whitespace-nowrap overflow-hidden relative'
        >
          {navItems.map((item, index) => (
            <motion.span
              initial={{ opacity: 0, position: 'absolute', top: 0 }}
              whileInView={{
                opacity: 1,
                position: 'absolute',
                top: `${(index + 1) * 70}px`,
              }}
              transition={{
                delay: (index + 1) * 0.3,
                duration: 0.15,
                type: 'spring',
                damping: 20,
                stiffness: 700,
              }}
              className='flex w-max h-max'
              key={index}
            >
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
            </motion.span>
          ))}
        </motion.span>

        <Link
          href='https://github.com/Dataphyte/Nubia-server'
          className='text-white-off absolute bottom-14 font-inter font-medium bg-violet-main w-[90%] flex items-center py-3 shadow-lg rounded-lg justify-center'
        >
          Add a story
        </Link>
      </div>
    </nav>
  );
};

export default React.memo(Navbar);
