'use client';

import { classNames } from '@/src/utils/classnames';
import { projectStore } from '@/src/global/projectStore';
import React, { useState, useEffect, useRef } from 'react';
import { PlusSmallIcon, XMarkIcon } from '@heroicons/react/20/solid';

const StoryTemplateCard = () => {
  const editorRef = useRef(null);
  const [cursorPositiuon, setCursorPosition] = useState(0);
  const [showFeatMenu, setShowFeatMenu] = useState(false);
  const [Editor, setEditor] = useState(
    <div>
      <p>Loading</p>
    </div>
  );
  const { template, setTemplate, setStatus, projectData } = projectStore();
  const [value, setValue] = useState(template);
  const [isAvailable, setIsAvailable] = useState(false);

  useEffect(() => {
    // ======= Avoid Nextjs runtime error "document is not defined" -->
    window && document && setIsAvailable(true);

    setEditor(() => {
      const ReactQuill = require('react-quill');
      return ReactQuill;
    });
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
    const cursorPosition = editorRef.current.unprivilegedEditor.getSelection();
    editorRef.current.editor?.insertText(
      cursorPosition ? cursorPosition : 0,
      ' [- TEXT! -] ',
      'bold',
      true
    );
  };

  return (
    <div className='flex flex-col gap-3 w-full h-max py-2'>
      <span className='relative'>
        {isAvailable && (
          <Editor
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
          onClick={() => {
            setShowFeatMenu((state) => !state);
            // console.log(projectData.features);
          }}
        >
          {
            {
              false: <PlusSmallIcon className='w-8 h-8 text-black-main' />,
              true: <XMarkIcon className='w-5 h-5 text-black-main' />,
            }[showFeatMenu]
          }
          <span
            className={classNames(
              'w-44 min-h-20 py-3 px-1.5 h-max bg-white-main border transition-all duration-300 ease-out hover:border-violet-main absolute -right-3 rounded-md shadow-lg',
              showFeatMenu
                ? 'flex top-10 items-center justify-center '
                : 'opacity-0 top-0 pointer-events-none'
            )}
          >
            <ul
              onClick={addFeat}
              className='flex flex-col items-start justify-center gap-1.5 w-full'
            >
              {projectData ? (
                projectData.features.map((data, idx) => {
                  return (
                    <li
                      key={idx}
                      className='text-text-dark w-full hover:bg-violet-light hover:shadow-md rounded-md py-1'
                    >
                      {data.name}
                    </li>
                  );
                })
              ) : (
                <p className='w-full text-center'>No Data</p>
              )}
            </ul>
          </span>
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
    </div>
  );
};

export default StoryTemplateCard;
