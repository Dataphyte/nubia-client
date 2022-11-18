import React from 'react';
import Link from 'next/link';
import CursorArrowRays from '@/icons/cursor-arrow-rays';

const Hero = () => {
  return (
    <header className='flex flex-col gap-3 w-full items-center text-center pt-32 pb-14'>
      <h1 className='text-4xl md:text-6xl font-black font-magistral text-text-dark'>
        MEET NUBIA
      </h1>
      <p className='w-3/4 md:text-lg text-text-light font-inter font-light -mt-2 max-w-3xl '>
        An open-source AI tool that draws insight from your data and makes it
        into readable and relatable stories. Data driven stories for the modern
        Journalist.
      </p>

      {/* ====== CALL TO ACTION */}
      <Link href='/' className='hero-link group'>
        Try it out
        <CursorArrowRays sx='w-5 h-5 duration-150 ease-out -translate-x-5 opacity-0 group-hover:translate-x-0 group-hover:opacity-100 absolute group-hover:right-6' />
      </Link>
    </header>
  );
};

export default Hero;
