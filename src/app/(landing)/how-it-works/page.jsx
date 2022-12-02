import React from 'react';
import Head from './head';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/hero';

const HowItWorks = () => {
  return (
    <div className='page_container'>
      <Head />
      <Hero
        heading='NUBIA UNDER THE HOOD'
        subHeading='Get to know more about how Nubia works under the hood, navigating the site, our thought process and tools used'
      />

      {/* ====== ########## */}
      {/* ====== ########## */}
      {/* ====== Intro Section */}
      <div className='w-full '>
        {' '}
        <div className='overflow-hidden py-16'>
          <div className='mx-auto max-w-7xl space-y-8 px-4 sm:px-6 lg:px-8'>
            <div className='mx-auto max-w-prose text-base lg:max-w-none'>
              <h2 className='text-lg font-semibold text-violet-dark'>
                The tech Stuff
              </h2>
              <p className='mt-2 text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                Nubia: what&apos;s going on?
              </p>
            </div>
            <div className='relative z-10 mx-auto max-w-prose text-base lg:mx-0 lg:max-w-5xl lg:pr-72'>
              {/* ====== paragraph one */}
              <p className='text-lg text-gray-500'>
                As of now, Nubia has 2 major systems: The&nbsp;
                <strong>
                  <Link href='/' target='_blank'>
                    Client
                  </Link>
                </strong>
                &nbsp;&&nbsp;
                <strong>
                  <Link href='/' target='_blank'>
                    Server
                  </Link>
                </strong>
                . The Server does the story generation while the client side
                handles all of the rendering and display of articles. The Server
                was built using&nbsp;
                <strong>
                  <Link href='https://expressjs.com/' target='_blank'>
                    Express Js
                  </Link>
                </strong>
                , a framework for serving nodeJs apps. The API requests are
                captured by controllers and then these controllers call the
                services required based on the specification of the reqeust.
              </p>
            </div>

            {/* ====== paragraph two */}
            <div className='lg:grid lg:grid-cols-2 lg:items-start lg:gap-8'>
              <div className='relative z-10'>
                <div className='prose prose-indigo mx-auto text-gray-500 lg:max-w-none'>
                  <p>
                    Before a route can be valid for use, a series of things have
                    to be put in place. These things include
                  </p>
                  <ul role='list'>
                    <li>Creation of Story template</li>
                    <li>Adding of csv data source</li>
                    <li>Parsing of csv Data to JSON</li>
                    <li>Adding of controller for new story</li>
                    <li>Adding of service for new story</li>
                    <li>
                      Connecting the whole system in the sequence: Template
                      &rarr; Service &rarr; Controller &rarr; Route
                    </li>
                  </ul>
                </div>
              </div>
              <div className='relative mx-auto mt-12 max-w-prose text-base lg:mt-0 lg:max-w-none'>
                <svg
                  className='absolute top-0 right-0 -mt-20 -mr-20 lg:top-auto lg:right-auto lg:bottom-1/2 lg:left-1/2 lg:mt-0 lg:mr-0 xl:top-0 xl:right-0 xl:-mt-20 xl:-mr-20'
                  width={404}
                  height={384}
                  fill='none'
                  viewBox='0 0 404 384'
                  aria-hidden='true'
                >
                  <defs>
                    <pattern
                      id='bedc54bc-7371-44a2-a2bc-dc68d819ae60'
                      x={0}
                      y={0}
                      width={20}
                      height={20}
                      patternUnits='userSpaceOnUse'
                    >
                      <rect
                        x={0}
                        y={0}
                        width={4}
                        height={4}
                        className='text-text-thin'
                        fill='currentColor'
                      />
                    </pattern>
                  </defs>
                  <rect
                    width={404}
                    height={384}
                    fill='url(#bedc54bc-7371-44a2-a2bc-dc68d819ae60)'
                  />
                </svg>
                <blockquote className='relative rounded-lg bg-white-main shadow-lg'>
                  <div className='rounded-t-lg px-6 py-8 sm:px-10 sm:pt-10 sm:pb-8'>
                    <p className='font-black-ops text-text-light uppercase text-xl tracking-wider'>
                      NUBIA
                    </p>
                    <div className='relative mt-8 text-lg font-medium text-gray-700 font-inter'>
                      <p className='relative'>
                        <strong>Client</strong> &rarr; NextJs/React, Tailwind,
                        SWR, Zustand
                      </p>
                      <p className='relative'>
                        <strong>Server</strong> &rarr; ExpressJs, Rosaenlg,
                        csv-parser
                      </p>
                    </div>
                  </div>
                  <cite className='relative flex items-center rounded-b-lg bg-violet-dark py-5 px-6 not-italic sm:mt-10 sm:items-start sm:py-5 sm:pl-12 sm:pr-10'>
                    <span className='relative rounded-full border-2 border-white sm:absolute sm:top-0 sm:-translate-y-1/2 sm:transform'>
                      <Image
                        className='h-12 w-12 rounded-full bg-indigo-300 sm:h-20 sm:w-20'
                        src='https://www.tutorialsteacher.com/Content/images/home/typescript.svg'
                        width={300}
                        height={300}
                        style={{ objectFit: 'cover' }}
                        alt=''
                      />
                    </span>
                    <span className='relative ml-4 font-semibold leading-6 text-violet-light sm:ml-24 sm:pl-1'>
                      <span className='sm:inline'>
                        Major server language is <strong>Typescript</strong>
                      </span>
                    </span>
                  </cite>
                </blockquote>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== ########### */}
      {/* ====== ########### */}
      {/* ====== Steps section */}
      <div className='relative overflow-hidden bg-white py-16'>
        <div className='hidden lg:absolute lg:inset-y-0 lg:block lg:h-full lg:w-full lg:[overflow-anchor:none]'>
          <div
            className='relative mx-auto h-full max-w-prose text-lg'
            aria-hidden='true'
          >
            <svg
              className='absolute top-12 left-full translate-x-32 transform'
              width={404}
              height={384}
              fill='none'
              viewBox='0 0 404 384'
            >
              <defs>
                <pattern
                  id='74b3fd99-0a6f-4271-bef2-e80eeafdf357'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-text-light'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill='url(#74b3fd99-0a6f-4271-bef2-e80eeafdf357)'
              />
            </svg>
            <svg
              className='absolute top-1/2 right-full -translate-y-1/2 -translate-x-32 transform'
              width={404}
              height={384}
              fill='none'
              viewBox='0 0 404 384'
            >
              <defs>
                <pattern
                  id='f210dbf6-a58d-4871-961e-36d5016a0f49'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-text-light'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill='url(#f210dbf6-a58d-4871-961e-36d5016a0f49)'
              />
            </svg>
            <svg
              className='absolute bottom-12 left-full translate-x-32 transform'
              width={404}
              height={384}
              fill='none'
              viewBox='0 0 404 384'
            >
              <defs>
                <pattern
                  id='d3eb07ae-5182-43e6-857d-35c643af9034'
                  x={0}
                  y={0}
                  width={20}
                  height={20}
                  patternUnits='userSpaceOnUse'
                >
                  <rect
                    x={0}
                    y={0}
                    width={4}
                    height={4}
                    className='text-text-light'
                    fill='currentColor'
                  />
                </pattern>
              </defs>
              <rect
                width={404}
                height={384}
                fill='url(#d3eb07ae-5182-43e6-857d-35c643af9034)'
              />
            </svg>
          </div>
        </div>
        <div className='relative px-4 sm:px-6 lg:px-8'>
          <div className='mx-auto max-w-prose text-lg'>
            <h1>
              <span className='block text-center text-lg font-semibold text-violet-main'>
                Introducing
              </span>
              <span className='mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                Following the sequence
              </span>
            </h1>

            <p>
              After successful wiring up of the various components, the route is
              ready to be queried by a client and used to generate stories.
            </p>
          </div>
          <div className='prose prose-lg prose-indigo mx-auto mt-6 text-gray-500'>
            {/* ====== add csv data source */}
            <h3>Adding CSV Data source</h3>
            <p>
              At the moment, the data files are added to the repo under the data
              folder. This data is then run through an utility function that
              parses the data to Javascript objects. Very soon, data storage
              would be moved into a cloud file storage like AWS S3, Google cloud
              file storage, Azure or whatever cloud platform is deemed worthy at
              the time, then the urls would be stored in a database. The data
              parsing utility would also be re-written to accommodate cvs from
              urls
            </p>

            {/* ====== create template */}
            <h3>Creating the template</h3>
            <p>
              For templating, Nubia uses&nbsp;
              <strong>
                <Link
                  href='/'
                  target='_blank'
                  className=' no-underline font-bold text-text-light '
                >
                  Rosaenlg
                </Link>
              </strong>
              &nbsp; which is an NLG open-source tool built ontop of Pug
              (Actually, it&apos;s pug on steroids). Rosaenlg adds additional
              features to pug, making able to perform tasks pug normally would
              not ba able to achieve. This can be a little bit tricky as there
              is no syntax highling for rosae and a lot of the commands would be
              flagged as in-appropriate by the IDE or syntax formating plugins.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HowItWorks;
