import React from 'react';
import { classNames } from 'src/utils/classnames';

const CloseIcon = ({ sx, fill }) => {
  return (
    <svg
      xmlns='http://www.w3.org/2000/svg'
      fill={'none' | fill}
      viewBox='0 0 24 24'
      strokeWidth='1.5'
      stroke='currentColor'
      className={classNames('w-6 h-6', sx)}
    >
      <path
        strokeLinecap='round'
        strokeLinejoin='round'
        d='M6 18L18 6M6 6l12 12'
      />
    </svg>
  );
};

export default CloseIcon;
