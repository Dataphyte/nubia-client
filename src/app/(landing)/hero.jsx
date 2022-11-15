import React from 'react';
import Link from 'next/link';

const Hero = () => {
  return (
    <header className='flex flex-col gap-3 w-full items-center text-center'>
      <h1 className='text-6xl font-black font-magistral text-text-dark'>
        MEET NUBIA
      </h1>
      <p className='text-lg text-text-light font-inter font-light -mt-2 max-w-3xl'>
        An open-source AI tool that draws insight from your data and makes it
        into readable and relatable stories. Data driven stories for the modern
        Journalist.
      </p>

      {/* ====== CALL TO ACTION */}
      <Link href='/' className='hero-link'>
        Try it out
      </Link>
    </header>
  );
};

export default Hero;
