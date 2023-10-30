'use client';

import { classNames } from '@/src/utils/classnames';
import { projectStore } from '@/src/global/projectStore';
import React, { useState, useEffect, useRef } from 'react';
import { PlusSmallIcon, XMarkIcon } from '@heroicons/react/20/solid';
import { ProjectSchema } from '@/src/typescript/project';
import { useUpdateProjectData } from '@/src/hooks/queries/useProject';
import { notificationStore } from '@/src/global/notificationStore';
import ReactQuill from 'react-quill';

type ComponentProps = {
  projectDetails: ProjectSchema;
};

const StoryTemplateCard = ({ projectDetails }: ComponentProps) => {
  const editorRef = useRef<any>(null);
  const [cursorPositiuon, setCursorPosition] = useState(0);
  const [showFeatMenu, setShowFeatMenu] = useState(false);
  const { data, refetch: updateTemplate } = useUpdateProjectData(
    projectDetails.id
  );
  const [Editor, setEditor] = useState(
    <div>
      <p>Loading</p>
    </div>
  );
  const { template, setStatus, setUpdateData } = projectStore();
  const [value, setValue] = useState(template.editor);
  const [isAvailable, setIsAvailable] = useState(false);
  const { setShow: showNotification, setContent: setNotificationContent } =
    notificationStore();

  useEffect(() => {
    // ======= Avoid Nextjs runtime error "document is not defined" -->
    window && document && setIsAvailable(true);

    // setEditor(() => require('react-quill'));
  }, []);

  useEffect(() => {
    setValue(projectDetails.template ? projectDetails.template.editor : '');
    // prettier-ignore
    projectDetails.template && projectDetails.template.content.length > 20
      ? setStatus(3, true)
      : setStatus(3, false);
  }, [projectDetails.template]);

  useEffect(() => {
    setUpdateData({
      template: {
        editor: value,
        content: editorRef.current?.getEditor().getText(),
      },
      updatedAt: new Date(),
    });
  }, [value]);

  useEffect(() => {
    console.log(data);
  }, [data]);

  // ======= handle save button -->
  const handleSave = () => {
    // TODO: Make it save to database
    updateTemplate().then(() => {
      setNotificationContent({
        text: 'Template Updated',
        type: 'success',
        description: 'Project template data has successfully been updated.',
      });
      showNotification(true);
    });

    console.log(editorRef.current);
    console.log('Clicked!!');
  };

  // ======= handle add feature -->
  const addFeat = (data: string): void => {
    const cursorPosition = editorRef.current?.unprivilegedEditor.getSelection();
    cursorPosition
      ? editorRef.current?.editor?.insertText(
          cursorPosition,
          ` {{ ${data} }} `,
          '',
          true
        )
      : alert(
          '📝 Place your cursor where you want to add a feature on the Editor.'
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
            <ul className='flex flex-col items-start justify-center gap-1.5 w-full max-h-56 overflow-y-scroll'>
              {projectDetails.data ? (
                projectDetails.data.fields.map((data, idx) => {
                  return (
                    <li
                      key={idx}
                      className='text-text-dark w-full hover:bg-violet-light hover:shadow-md rounded-md py-1'
                      onClick={() => addFeat(data)}
                    >
                      {data}
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
            value === (projectDetails?.template?.editor || '')
              ? 'bg-black-thin text-black-main cursor-not-allowed'
              : 'bg-green-main cursor-pointer text-white-off'
          )}
          disabled={value === (projectDetails?.template?.editor || '')}
          onClick={handleSave}
        >
          Save
        </button>

        <button
          className='text-sm shadow-md rounded-md py-2 px-8 bg-violet-main text-white-off duration-300 ease-out transition-all cursor-pointer hover:shadow-lg w-max'
          onClick={() =>
            console.log(editorRef.current.getEditor().getContents())
          }
        >
          Show RawText
        </button>
      </span>
    </div>
  );
};

export default StoryTemplateCard;
