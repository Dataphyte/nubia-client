'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import useScrolled from '@/hooks,useScrolled';
import { classNames } from 'src/utils/classnames';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Nubia', href: 'about' },
  { label: 'Our journey', href: 'journey' },
];

const Navbar = () => {
  const pathname = usePathname();
  const scrolled = useScrolled();

  return (
    <nav
      className={classNames(
        'w-full flex px-5 md:px-16 items-center justify-between fixed top-0 z-50 duration-300 ease-out transition-all',
        scrolled ? 'bg-white-main shadow-md lg:px-32 h-16' : ' h-20 lg:px-48'
      )}
    >
      <Link className='nav__logo-text' href='/'>
        NUBIA
      </Link>

      {/* ====== NAV LINKS */}
      <span className='flex  px-4 gap-8'>
        {navItems.map((item, index) => (
          <Link
            href={item.href}
            key={index}
            className={classNames(
              'nav-link',
              pathname.indexOf(item.href) !== -1 && 'text-violet-main'
            )}
          >
            {item.label}
          </Link>
        ))}
      </span>

      {/* ====== CALL TO ACTION */}
      <Link
        href='/'
        className='py-2 px-5 text-sm rounded-lg shadow font-inter bg-violet-dark text-white-off duration-150 ease-out hover:shadow-lg'
      >
        Add a story
      </Link>
    </nav>
  );
};

export default React.memo(Navbar);
