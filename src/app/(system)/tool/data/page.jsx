'use client';

import React from 'react';
import NoStory from '@/components/NoStory';

// ======= utility imports -->
import { storyStore } from '@/global/storyStore';

const DataPage = () => {
  const { currentData, storyRoute } = storyStore();

  return (
    <>
      {!currentData && <NoStory toBeViewed='Data' />}
      {currentData && (
        <div className='px-4 sm:px-6 lg:px-8'>
          <div className='sm:flex sm:items-center'>
            <div className='sm:flex-auto'>
              <h1 className='text-xl font-semibold text-text-dark font-black-ops uppercase'>
                {storyRoute} data
              </h1>
              <p className='mt-2 text-sm text-gray-700'>
                A Complete table of the cleaned version of data used to generate
                the stories. This data is derived from a bigger data table and
                restructured to fit in the FAAC story template.
              </p>
            </div>
            <div className='mt-4 sm:mt-0 sm:ml-16 sm:flex-none'>
              <button
                type='button'
                className='inline-flex items-center justify-center rounded-md border border-transparent bg-violet-main px-4 py-2 text-sm font-medium text-white-off duration-200 hover:shadow-lg shadow-sm hover:bg-violet-dark outline-none sm:w-auto'
              >
                Download data
              </button>
            </div>
          </div>

          <div className='mt-8 flex flex-col'>
            <p className='text-sm mb-2 text-text-thin flex items-center gap-2'>
              Table is scrollable
              <lord-icon
                src='https://cdn.lordicon.com/zpcieyfp.json'
                trigger='loop'
                colors='primary:#121331,secondary:#6d28d9'
                style={{ width: '30px', height: '15px' }}
              />
            </p>
            <div className=' -mx-4 overflow-x-auto w-full rounded-md shadow border border-violet-main/60'>
              <div className='inline-block min-w-full py-2 align-middle'>
                <div className='overflow-hidden  md:rounded-lg overflow-x-scroll'>
                  <table className='min-w-full divide-y divide-gray-300'>
                    <thead className='bg-gray-50'>
                      <tr>
                        <th
                          scope='col'
                          className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 uppercase'
                        >
                          Index
                        </th>
                        {currentData &&
                          Object.keys(currentData[0]).map((data, idx) => (
                            <th
                              scope='col'
                              className='py-3.5 pl-4 pr-3 text-left text-sm font-semibold text-gray-900 sm:pl-6 uppercase'
                              key={idx}
                            >
                              {data}
                            </th>
                          ))}
                      </tr>
                    </thead>
                    <tbody className='bg-white-main'>
                      {currentData.map((data, dataIdx) => (
                        <tr
                          key={dataIdx}
                          className={
                            dataIdx % 2 === 0 ? undefined : 'bg-gray-50'
                          }
                        >
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                            {dataIdx + 1}
                          </td>
                          <td className='whitespace-nowrap py-4 pl-4 pr-3 text-sm font-medium text-gray-900 sm:pl-6'>
                            {data.state || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            ₦ {data.prev_state_value || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            ₦ {data.state_value || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            ₦ {data.prev_state_total || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            ₦ {data.state_total || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {data.population || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            ₦ {data.faac_per_capita || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {data.rank || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            {data.no_of_lgc || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            ₦ {data.difference || 'null'}
                          </td>
                          <td className='whitespace-nowrap px-3 py-4 text-sm text-gray-500'>
                            <button className='py-2 px-3 bg-blue-main rounded-md shadow hover:shadow-lg duration-200 ease-out text-xs font-inter text-white-off'>
                              View LGC Data
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default DataPage;
