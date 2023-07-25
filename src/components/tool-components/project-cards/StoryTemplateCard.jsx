'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';

const DynamicEditor = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
});

const StoryTemplateCard = () => {
  const editorRef = useRef(null);
  const [value, setValue] = useState('');
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // ======= Avoid Nextjs runtime error "document is not defined" -->
    window && document && setIsAvailable(true);
  }, []);

  useEffect(() => {
    console.log(value);
  }, [value]);
  return (
    <div className='flex flex-col gap-3 w-full h-max py-2'>
      <span>
        {isAvailable && (
          <DynamicEditor
            ref={editorRef}
            theme='snow'
            value={value}
            onChange={setValue}
            className='bg-white-main shadow-md min-h-300'
            placeholder='Create your own story template...'
          />
        )}
      </span>

      <span className='flex items-center gap-5 mt-3'>
        <button className='text-sm shadow-md rounded-md py-2 px-8 bg-green-main text-white-off duration-300 ease-out transition-all cursor-pointer hover:shadow-lg w-max'>
          Save
        </button>

        <button className='text-sm shadow-md rounded-md py-2 px-8 bg-violet-main text-white-off duration-300 ease-out transition-all cursor-pointer hover:shadow-lg w-max'>
          Show RawText
        </button>
      </span>
    </div>
  );
};

export default StoryTemplateCard;
