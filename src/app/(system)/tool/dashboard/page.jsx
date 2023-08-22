import React from 'react';

const dataCards = [
  { name: 'Total Subscribers', stat: '71,897' },
  { name: 'Avg. Open Rate', stat: '58.16%' },
  { name: 'Avg. Click Rate', stat: '24.57%' },
  { name: 'Avg. Bounces', stat: '24.57%' },
];

const Dashboard = () => {
  return (
    <div className='w-full py-5 px-2 md:px-5 grid grid-cols-5 gap-7'>
      {/* -- section 1 */}
      <div className='col-span-2 h-56 rounded-md shadow-md bg-white-main border'></div>

      <div className='col-span-3 h-56 rounded-md shadow-md bg-white-main'></div>

      {/* -- section2  */}
      <dl className='mt-5 grid grid-cols-1 gap-5 sm:grid-cols-4 col-span-5'>
        {dataCards.map((item) => (
          <div
            key={item.name}
            className='overflow-hidden rounded-lg bg-white-main px-4 py-5 shadow sm:p-6 border'
          >
            <dt className='truncate text-sm font-medium text-gray-500'>
              {item.name}
            </dt>
            <dd className='mt-1 text-3xl font-semibold tracking-tight text-gray-900'>
              {item.stat}
            </dd>
          </div>
        ))}
      </dl>

      {/* -- section 3 */}
      <div className='col-span-3 h-500 rounded-md shadow-md bg-white-main'></div>

      <div className='col-span-2 h-500 rounded-md shadow-md bg-white-main'></div>
    </div>
  );
};

export default Dashboard;
