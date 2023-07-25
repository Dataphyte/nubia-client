'use client';

import { notificationStore } from '@/src/global/notificationStore';
import { projectStore } from '@/src/global/projectStore';
import { fileLoader } from '@/src/utils/file-loader';
import React, { useState, useEffect, useRef } from 'react';

const AddDataCard = () => {
  const fileInputRef = useRef(null);
  const [file, setFile] = useState(null);
  const { projectData, setProjectData } = projectStore();
  const { setContent, setShow } = notificationStore();

  // ======= handle file change -->
  const handleFileChange = (e) => {
    fileLoader(e, setFile, setProjectData, setShow, setContent);
    console.log(e.target.files[0]);
  };

  useEffect(() => {
    console.log(file);
  }, [file]);

  return (
    <div className='w-full h-400 bg-white-main shadow-md px-3 py-3 flex flex-col gap-2'>
      <p>Select a dataset to add</p>{' '}
      <input
        type='file'
        accept='.csv'
        onChange={handleFileChange}
        ref={fileInputRef}
      />
      <span className='bg-red-light flex flex-col w-400 h-200'>
        <p>Features: {file ? file.meta?.fields.map((txt) => `${txt}, `) : 0}</p>
        <p>Rows: {file ? file.data?.length : 0}</p>
      </span>
    </div>
  );
};

export default AddDataCard;
