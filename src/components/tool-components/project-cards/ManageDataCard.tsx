'use client';

import { ProjectSchema } from '@/src/typescript/project';
import { notificationStore } from '@/src/global/notificationStore';
import { projectStore } from '@/src/global/projectStore';
import Lottie from 'lottie-react';
import React, { useState, useEffect, useRef } from 'react';
import NoDataLottie from '@/assets/animations/no-data-lottie.json';
import { FirebaseStorage, FirebaseUserStorageRef } from '@/src/server/firebase';
import { getDownloadURL, ref, uploadBytes } from 'firebase/storage';
import { useSession } from 'next-auth/react';
import { useUpdateProjectData } from '@/src/hooks/queries/useProject';
import Papa, { ParseResult } from 'papaparse';
import { queryClient } from '@/src/app/layout';

type PageProps = {
  projectDetails: ProjectSchema;
};

const ManageDataCard = ({ projectDetails }: PageProps) => {
  const { data: session } = useSession();

  // ======= states -->
  const {
    projectData,
    setProjectData,
    setStatus,
    status,
    setUpdateData,
    setDataUrl,
  } = projectStore();
  const { setContent, setShow } = notificationStore();
  const [uploadSuccess, setUploadSuccess] = useState(false);

  const fileInputRef = useRef<HTMLInputElement>(null);
  const [localProjectData, setLocalProjectData] = useState<{
    parsed: ParseResult<any>;
    details: { fileName: string; fileSize: string };
  } | null>(null);

  // ======= queries -->
  const {
    data: updatedProject,
    refetch: fetchProjectUpdate,
    isError: fetProjectUpdate,
  } = useUpdateProjectData(projectDetails.id);

  // ======= handlers and methods -->
  // file changes
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files && {
      fileName: e.target.files[0]?.name,
      fileSize: `${(e.target.files[0].size / 1000).toFixed(2)} Kb`,
    };

    // fileLoader({
    //   event: e,
    //   setState: setProjectData,
    //   details: file!,
    //   setNotificationContent: setContent,
    //   setShow,
    // });

    e.target.files &&
      Papa.parse(e.target.files?.[0], {
        header: true,
        complete: (result) => {
          setLocalProjectData({
            parsed: result,
            details: {
              fileName: file?.fileName as string,
              fileSize: file?.fileSize as string,
            },
          });

          setProjectData({ parsed: result });
          console.log(result);
          setContent({
            text: 'Parsing Complete',
            type: 'success',
            description:
              'Your data has been parsed. You may continue to preview or customize your features.',
          });
          setShow(true);
        },
      });
  };

  // file upload
  const handleFileUpload = async () => {
    if (!fileInputRef.current?.files || fileInputRef.current.files.length < 1) {
      setContent({
        text: 'Missing file',
        description:
          'No Data File selected. Please select a datafile from your local system to continue',
        type: 'error',
      });
      setShow(true);
      return;
    }
    const file = fileInputRef.current?.files[0];
    const dataRef = ref(
      FirebaseUserStorageRef,
      `${session?.user?.id}/projects/${projectDetails.name}_[${projectDetails.id}]/projectData.csv`
    );

    try {
      // ======= upload to firebase -->
      const snapshot = await uploadBytes(dataRef, file);
      setUpdateData({
        data: {
          fields: localProjectData!.parsed.meta.fields as string[],
          file_url: snapshot.metadata.fullPath,
          file_size: `${snapshot.metadata.size / 1000}kb`,
          file_name: localProjectData!.details.fileName,
        },
      });
      setUploadSuccess(() => true);

      console.log(snapshot);
    } catch (error) {
      console.log(error);
    }
  };

  // file download
  const handleFileDownload = async () => {
    if (!projectDetails.data) return alert('Project has no data stored');
    const pathRef = ref(
      FirebaseStorage,
      projectDetails.data.file_url as string
    );

    const downloadUrl = await getDownloadURL(pathRef);

    console.log(downloadUrl);
    setDataUrl(downloadUrl as string);

    try {
      // @ts-ignore
      Papa.parse(downloadUrl, {
        download: true,
        header: true,
        complete: (result) => {
          setLocalProjectData({
            parsed: result,
            details: {
              fileName: projectDetails.data.file_name,
              fileSize: projectDetails.data.file_size,
            },
          });

          setProjectData({ parsed: result });
          console.log(result);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  // ======= effects -->
  useEffect(() => {
    console.log(projectData);

    // prettier-ignore
    if (projectDetails.data?.file_url) {
      setStatus(2, true)
      handleFileDownload();
    }
    else setStatus(2, false);
  }, [projectDetails.data]);

  useEffect(() => {
    console.log(projectDetails);
  }, []);

  useEffect(() => {
    uploadSuccess === true &&
      (async () =>
        await fetchProjectUpdate().then(() => {
          setContent({
            text: 'File Added',
            description:
              'You have successfully added this file to the current project. You can go ahead to customize your features.',
            type: 'success',
          });
          setShow(true);
          queryClient.refetchQueries('get-single-project');
        }))();
  }, [uploadSuccess]);

  return (
    <div className='grid w-full grid-cols-4 gap-3'>
      <input
        type='file'
        accept='.csv'
        onChange={handleFileChange}
        ref={fileInputRef}
        className='hidden'
      />
      <div className='col-span-4'>
        <h3 className='text-lg font-semibold leading-6 text-gray-900 mb-4'>
          Project file details
        </h3>
        {!localProjectData && !projectDetails.data && (
          <span className=' w-full border-2 border-dashed rounded-md py-10 flex items-center justify-center mt-3 flex-col gap-3'>
            <Lottie
              animationData={NoDataLottie}
              autoplay
              loop
              style={{ width: '400px', height: '150px' }}
            />
            <p className='text-sm text-text-light'>
              This project has no Data file
            </p>
            <button
              className='py-1.5 px-6 rounded shadow border text-white-off bg-violet-main transition-all ease-out duration-200 hover:shadow-lg w-max text-sm mt-4'
              onClick={() => fileInputRef.current?.click()}
            >
              Upload a file
            </button>
          </span>
        )}

        {/* -- ######################################## */}
        {/* -- show file details when file is selected */}
        {/* -- ######################################### */}
        {localProjectData !== null && (
          <>
            <div className='w-max h-max bg-white-main shadow-md px-3 py-3 flex flex-col border rounded border-gray-400 col-span-4 gap-4'>
              <p className='text-lg font-bold text-text-light'>
                Select a dataset to add
              </p>
              <button onClick={handleFileDownload}>Download data</button>
              <span className='flex items-center gap-2 w-max'>
                <button
                  className='py-1.5 px-6 rounded shadow border text-white-off bg-violet-main transition-all ease-out duration-200 hover:shadow-lg w-max text-sm'
                  onClick={() => fileInputRef.current?.click()}
                >
                  Browse files
                </button>
                {localProjectData && (
                  <button
                    className='py-1.5 px-6 rounded shadow border text-white-off bg-green-main transition-all ease-out duration-200 hover:shadow-lg w-max text-sm'
                    onClick={() => handleFileUpload()}
                  >
                    {projectDetails.data
                      ? 'Replace project data'
                      : 'Add to project'}
                  </button>
                )}
              </span>
            </div>
            <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-3'>
              {/* -- file name */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  File name
                </dt>
                <dd className='mt-1 text-xl font-semibold tracking-tight text-gray-900'>
                  {localProjectData.details?.fileName}
                </dd>
              </div>

              {/* -- file size */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  File size
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {localProjectData.details?.fileSize}
                </dd>
              </div>

              {/* -- row count */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Row count
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {localProjectData.parsed?.data?.length}
                </dd>
              </div>

              {/* -- filed count  */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Field count
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {localProjectData.parsed?.meta?.fields?.length}
                </dd>
              </div>

              {/* -- Errors */}
              <div className='overflow-hidden rounded-lg bg-white px-4 py-5 shadow-md border sm:p-6 bg-white-main'>
                <dt className='truncate text-sm font-medium text-gray-500'>
                  Parse Errors
                </dt>
                <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
                  {localProjectData.parsed?.errors.length}
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
                          {localProjectData.parsed?.meta?.fields?.map(
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
                        {localProjectData.parsed?.data
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
                                  {data as string}
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

export default ManageDataCard;
