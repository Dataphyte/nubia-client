'use client';

import { useState, useEffect } from 'react';

const useScrolled = () => {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () =>
      window.scrollY > 0 ? setScrolled(true) : setScrolled(false);

    // add listeners
    window.addEventListener('scroll', handleScroll);
    window.addEventListener('load', handleScroll);
    window.addEventListener('focus', handleScroll);

    //   clean-up
    return () => {
      window.removeeven('scroll', handleScroll);
      window.removeeven('load', handleScroll);
      window.removeeven('focus', handleScroll);
    };
  });

  return scrolled;
};

export default useScrolled;
