import Link from 'next/link';
import React from 'react';

const navItems = [
  { label: 'Home', href: '/' },
  { label: 'About Nubia', href: '/' },
  { label: 'Our journey', href: '/' },
];

const Navbar = () => {
  return (
    <nav className='w-full h-20 flex px-5 md:px-16 lg:px-32 items-center justify-between fixed top-0 z-50'>
      <Link className='nav__logo-text' href='/'>
        NUBIA
      </Link>

      {/* ====== NAV LINKS */}
      <span className='flex  px-4 gap-8'>
        {navItems.map((item, index) => (
          <Link href={item.href} key={index} className='nav-link'>
            {item.label}
          </Link>
        ))}
      </span>

      {/* ====== CALL TO ACTION */}
      <Link
        href='/'
        className='py-2 px-5 text-sm rounded-lg shadow font-inter bg-violet-dark text-white-off duration-150 ease-out hover:shadow-lg'
      >
        View stories
      </Link>
    </nav>
  );
};

export default React.memo(Navbar);
