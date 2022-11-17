'use client';

import { useState, useEffect } from 'react';

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(true);

  useEffect(() => {
    window.scrollY > 0 ? setScrolled(true) : setScrolled(false);
    const handleScroll = () =>
      window.scrollY > 0 ? setScrolled(true) : setScrolled(false);

    // add listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    window.addEventListener('focus', handleScroll);

    //   clean-up
    return () => {
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('load', handleScroll);
      window.removeEventListener('focus', handleScroll);
    };
  });

  return scrolled;
};

export default useScrolled;
