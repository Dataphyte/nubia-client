'use client';

import { notificationStore } from '@/src/global/notificationStore';
import { projectStore } from '@/src/global/projectStore';
import { fileLoader } from '@/src/utils/file-loader';
import React, { useState, useEffect, useRef } from 'react';

const AddDataCard = () => {
  const fileInputRef = useRef(null);
  const { projectData, setProjectData, setStatus, status } = projectStore();
  const { setContent, setShow } = notificationStore();

  // ======= handle file change -->
  const handleFileChange = (e) => {
    const file = e.target.files && {
      fileName: e.target.files[0]?.name,
      fileSize: `${e.target.files[0].size}Kb`,
    };

    fileLoader(e, setProjectData, file, setShow, setContent);
  };

  useEffect(() => {
    console.log(projectData);

    // prettier-ignore
    projectData?.parsed?.data
      ? setStatus(2, true)
      : setStatus(2, false);
  }, [projectData]);

  return (
    <div className='grid w-full grid-cols-4 gap-3'>
      <div className='w-full h-max bg-white-main shadow-md px-3 py-3 flex flex-col border rounded border-gray-400 col-span-4 gap-4 lg:col-span-1'>
        <p className='text-lg font-bold text-text-light'>
          Select a dataset to add
        </p>
        <input
          type='file'
          accept='.csv'
          onChange={handleFileChange}
          ref={fileInputRef}
          className='hidden'
        />
        <span className='flex items-center gap-2'>
          <button
            className='py-1.5 px-6 rounded shadow border text-white-off bg-violet-main transition-all ease-out duration-200 hover:shadow-lg w-max text-sm'
            onClick={() => fileInputRef.current.click()}
          >
            Browse files
          </button>
          {projectData && (
            <button
              className='py-1.5 px-6 rounded shadow border text-white-off bg-green-main transition-all ease-out duration-200 hover:shadow-lg w-max text-sm'
              onClick={() => fileInputRef.current.click()}
            >
              Add to project
            </button>
          )}
        </span>
      </div>

      <div className='col-span-4'>
        <h3 className='text-base font-semibold leading-6 text-gray-900'>
          Project file details
        </h3>
        {!projectData && (
          <span className=' w-full border-2 border-dashed rounded-md py-10 flex items-center justify-center mt-3'>
            <p>Select a file to see details</p>
          </span>
        )}

        {/* -- ######################################## */}
        {/* -- show file details when file is selected */}
        {/* -- ######################################### */}
        {projectData && (
          <>
            <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
              {/* -- file name */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  File name
                </dt>
                <dd className='mt-1 text-xl font-semibold tracking-tight text-gray-900'>
                  {projectData.details?.fileName}
                </dd>
              </div>

              {/* -- file size */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  File size
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {projectData.details?.fileSize}
                </dd>
              </div>

              {/* -- row count */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Row count
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {projectData.parsed?.data?.length}
                </dd>
              </div>

              {/* -- filed count  */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Field count
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {projectData.parsed?.meta?.fields.length}
                </dd>
              </div>

              {/* -- Errors */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Parse Errors
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {projectData.parsed?.errors.length}
                </dd>
              </div>
            </dl>
            {/* -- ############################# */}
            {/* -- Data preview */}
            {/* -- ############################# */}
            <div className='px-4 sm:px-6 lg:px-8 my-8 bg-white-main rounded-md shadow-lg border py-5'>
              <div className='sm:flex sm:items-center'>
                <div className='sm:flex-auto'>
                  <h1 className='text-base font-semibold leading-6 text-gray-900'>
                    Data Preview
                  </h1>
                </div>
              </div>
              <div className='mt-8 flow-root'>
                <div className='-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8'>
                  <div className='inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8'>
                    <table className='min-w-full divide-y divide-gray-300'>
                      <thead>
                        <tr>
                          <th
                            scope='col'
                            className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                          >
                            s/n
                          </th>
                          {projectData.parsed?.meta?.fields.map(
                            (entry, idx) => (
                              <th
                                scope='col'
                                className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-0'
                                key={idx}
                              >
                                {entry}
                              </th>
                            )
                          )}
                        </tr>
                      </thead>
                      <tbody className='divide-y divide-gray-200'>
                        {projectData.parsed?.data
                          ?.slice(0, 10)
                          .map((entry, idx) => (
                            <tr key={idx}>
                              <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'>
                                {idx + 1}
                              </td>
                              {Object.values(entry).map((data, idx) => (
                                <td
                                  className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-0'
                                  key={idx}
                                >
                                  {data}
                                </td>
                              ))}
                            </tr>
                          ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </div>
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default AddDataCard;
