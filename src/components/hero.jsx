import React from 'react';
import Link from 'next/link';
import CursorArrowRays from '@/icons/cursor-arrow-rays';

const Hero = ({ heading, subHeading = '' }) => {
  return (
    <header className='hero__container'>
      <h1 className='text-4xl md:text-6xl font-black font-magistral text-text-dark max-w-3xl uppercase'>
        {heading}
      </h1>
      <p className='w-3/4 text-sm md:text-lg text-text-thin font-inter font-light -mt-2 max-w-3xl '>
        {subHeading}
      </p>

      {/* ====== CALL TO ACTION */}
      <Link href='tool/stories' className='hero-link group'>
        Try it out
        <CursorArrowRays sx='w-5 h-5 duration-300 ease-out -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 absolute right-8 group-hover:right-5' />
      </Link>
    </header>
  );
};

export default React.memo(Hero);
