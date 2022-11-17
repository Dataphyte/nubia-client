import React from 'react';
import Script from 'next/script';

const Page = () => {
  return (
    <div className='w-full h-500 bg-blue-main flex items-center justify-center'>
      <div className='w-[400px] h-200 flex items-center justify-center bg-white-main'>
        <lord-icon
          src='https://cdn.lordicon.com/wrprwmwt.json'
          trigger='hover'
          style={{ width: '250px', height: '250px', cursor: 'pointer' }}
          className='cursor-pointer'
        />
      </div>
    </div>
  );
};

export default Page;
