import React from 'react';
import Link from 'next/link';
import CursorArrowRays from '@/icons/cursor-arrow-rays';

const Hero = () => {
  return (
    <header className='hero__container'>
      <h3 className='text-4xl md:text-6xl font-black font-magistral text-text-dark'>
        ABOUT NUBIA
      </h3>
      <p className='w-3/4 text-sm md:text-lg text-text-thin font-inter font-light -mt-2 max-w-3xl '>
        With the world inundated with complex data, Nubia's AI tool is an
        invaluable resource for a newsroom of tomorrow that needs to understand
        data.
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

/* ABOUT COPY
- 
                  Nubia has built-in templates or you can create your own
                  customised template and add routes following the convention.
                  It speeds up recurssive story generation and adds it to a
                  clear and intuitive structure which helps journalists in their
                  work quickly and easily.
- Built-in templates, or you can customize your own. Nubia is used by top websites like The Washington Post to create daily news content.
*/
