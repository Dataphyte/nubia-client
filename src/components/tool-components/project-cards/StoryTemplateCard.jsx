'use client';

import React, { useState, useEffect, useRef } from 'react';
import dynamic from 'next/dynamic';
import { projectStore } from '@/src/global/projectStore';
import { classNames } from '@/src/utils/classnames';
import { PlusSmallIcon } from '@heroicons/react/20/solid';
import ReactQuill from 'react-quill';

// const DynamicEditor = dynamic(() => import('react-quill'), {
//   loading: () => (
//     <div className='w-full h-130 flex flex-col gap-3 font-medium text-xl text-text-light text-center items-center justify-center'>
//       <lord-icon
//         src='https://cdn.lordicon.com/ukodqrxd.json'
//         trigger='loop'
//         colors='primary:#121331,secondary:#6d28d9'
//         style={{ width: '80px', height: '80px' }}
//       />
//       <p>Loading editor...</p>
//     </div>
//   ),
//   ssr: false,
// });

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

    console.log(editorRef.current);
    console.log('Clicked!!');
  };

  // ======= handle add feature -->
  const addFeat = () => {
    setValue(
      (state) =>
        `${state.slice(0, -4)} <b><em>{{ new Feature }}</em></b> ${state.slice(
          -4
        )} `
    );
  };

  return (
    <div className='flex flex-col gap-3 w-full h-max py-2'>
      <span className='relative'>
        {isAvailable && (
          <ReactQuill
            theme='snow'
            ref={editorRef}
            value={value}
            onChange={setValue}
            className='bg-white-main shadow-md min-h-300'
            placeholder='Create your own story template...'
          />
        )}
        <button
          className='w-7 h-7 rounded-md shadow border hover:border-black-light flex items-center justify-center absolute top-2 right-3 md:right-5 transition-all duration-300 ease-out hover:bg-white-off hover:shadow-md'
          onClick={addFeat}
        >
          <PlusSmallIcon className='w-full h-full text-black-main' />
        </button>
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
      {/* {isAvailable && <ReactQuill />} */}
    </div>
  );
};

export default StoryTemplateCard;
