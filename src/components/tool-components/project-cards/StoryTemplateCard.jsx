'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { projectStore } from '@/src/global/projectStore';
import { classNames } from '@/src/utils/classnames';

const DynamicEditor = dynamic(() => import('react-quill'), {
  loading: () => <p>Loading...</p>,
});

const StoryTemplateCard = () => {
  const editorRef = useRef(null);
  const { template, setTemplate, setStatus } = projectStore();
  const [value, setValue] = useState(template);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // ======= Avoid Nextjs runtime error "document is not defined" -->
    window && document && setIsAvailable(true);
  }, []);

  useEffect(() => {
    console.log(template);
    template.length > 20 ? setStatus(3, true) : setStatus(3, false);
  }, [template]);

  // ======= handle save button -->
  const handleSave = () => {
    // TODO: Make it save to database
    setTemplate(value);
    console.log('Clicked!!');
  };

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
        <button
          className={classNames(
            'text-sm shadow-md rounded-md py-2 px-8 duration-300 ease-out transition-allhover:shadow-lg w-max',
            value === template
              ? 'bg-black-thin text-black-main cursor-not-allowed'
              : 'bg-green-main cursor-pointer text-white-off'
          )}
          disabled={value === template}
          onClick={handleSave}
        >
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
