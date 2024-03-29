import React from 'react';
import { classNames } from 'src/utils/classnames';

const MenuBars = ({ fill, sx, action }: IconProps) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={'none' || fill}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className={(classNames('w-6 h-6'), sx)}
      onClick={action}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25H12'
      />
    </svg>
  );
};

export default MenuBars;
