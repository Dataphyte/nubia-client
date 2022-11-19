'use client';

import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import Hero from '@/components/hero/about-hero';
import AboutImg from '../../../assets/images/2022-Fellows-jai.webp';

const stats = [
  { label: 'Started', value: '2022' },
  { label: 'Maintainers', value: '4' },
  { label: 'Beta Users', value: '32' },
  { label: 'Cost', value: 'Free' },
];

const Page = () => {
  return (
    <div className='page__container'>
      <Hero />

      {/* ====== ########## */}
      {/* ====== ########## */}
      {/* ====== ABOUT SECTION */}
      <div className='relative bg-white py-5 sm:py-16'>
        <div className='lg:mx-auto lg:grid lg:max-w-7xl lg:grid-cols-2 lg:items-start lg:gap-24 lg:px-8'>
          <div className='relative sm:py-16 lg:py-0'>
            <div
              aria-hidden='true'
              className='hidden sm:block lg:absolute lg:inset-y-0 lg:right-0 lg:w-screen'
            >
              <div className='absolute inset-y-0 right-1/2 w-full rounded-r-3xl bg-gray-50 lg:right-72' />
              <svg
                className='absolute top-8 left-1/2 -ml-3 lg:-right-8 lg:left-auto lg:top-12'
                width={404}
                height={392}
                fill='none'
                viewBox='0 0 404 392'
              >
                <defs>
                  <pattern
                    id='02f20b47-fd69-4224-a62a-4c9de5c763f7'
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
                      className='text-gray-200'
                      fill='currentColor'
                    />
                  </pattern>
                </defs>
                <rect
                  width={404}
                  height={392}
                  fill='url(#02f20b47-fd69-4224-a62a-4c9de5c763f7)'
                />
              </svg>
            </div>
            <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:max-w-none lg:px-0 lg:py-20'>
              {/* Testimonial card*/}
              <div className='relative overflow-hidden rounded-2xl pt-64 pb-10 shadow-xl'>
                <Image
                  className='absolute inset-0 h-full w-full object-cover'
                  src={AboutImg}
                  alt=''
                />
                <div className='absolute inset-0 bg-violet-light mix-blend-multiply' />
                <div className='absolute inset-0 bg-gradient-to-t from-violet-dark opacity-90' />
                <div className='relative px-8'>
                  <blockquote className='mt-8 h-32 relative'>
                    <footer className='mt-4 absolute bottom-0'>
                      <p className='text-base font-semibold text-violet-light'>
                        Joshua Olufemi, CEO at Dataphyte
                      </p>
                    </footer>
                  </blockquote>
                </div>
              </div>
            </div>
          </div>

          <div className='relative mx-auto max-w-md px-4 sm:max-w-3xl sm:px-6 lg:px-0'>
            {/* Content area */}
            <div className='pt-12 sm:pt-16 lg:pt-20'>
              <h2 className='text-3xl font-bold tracking-tight text-gray-900 sm:text-4xl '>
                On a mission to <b className='text-violet-dark'>Empower</b>
                &nbsp;News Rooms
              </h2>
              <div className='mt-6 space-y-6 text-text-thin text-sm md:text-base lg:text-lg font-inter'>
                <p className='text-lg'>
                  <b className='font-black-ops text-text-light'>NUBIA</b>, a
                  project conceived at the Journalism-AI 2022 fellowship by
                  Datahpyte Nigeria and Fedrelandsvennen, is an open-source tool
                  which was initially aimed at being an AI-powered news
                  distribution platform that transforms web camera, geospatial
                  and socioeconomic data into data-driven alerts and reports.
                </p>
                <p className='text-base leading-7'>
                  Nubia algorithmically generates news. It is designed to help
                  journalists improve their productivity by giving them access
                  to the tool required to produce automated articles. In turn,
                  it allows developers to collaborate with journalists and
                  gather feedback from editors, readers and the whole news room
                  at large.
                </p>
                <p className='text-base leading-7'>
                  Nubia helps you to build, manage and publish news articles.
                  You can automate the news article generation process for
                  multiple articles, create custom templates or view templates
                  directly from the tool using the contribution guidelines.
                </p>
              </div>
            </div>

            {/* Stats section */}
            <div className='mt-10'>
              <dl className='grid grid-cols-2 gap-x-4 gap-y-8'>
                {stats.map((stat) => (
                  <div
                    key={stat.label}
                    className='border-t-2 border-black-light pt-6'
                  >
                    <dt className='text-base font-medium text-text-light'>
                      {stat.label}
                    </dt>
                    <dd className='text-3xl font-bold tracking-tight text-text-dark font-black-ops'>
                      {stat.value}
                    </dd>
                  </div>
                ))}
              </dl>
              <div className='mt-10'>
                <Link
                  href='about'
                  className='text-base font-medium text-violet-main group flex'
                >
                  Learn more about how Nubia works
                  <span
                    aria-hidden='true'
                    className='group-hover:translate-x-2 duration-300 ease-out ml-1'
                  >
                    &rarr;
                  </span>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ====== ########### */}
      {/* ====== ########### */}
      {/* ====== WHY SECTION */}
      <section className='home__section-container'>
        <div className='home__section-box'>
          <h3 className='home__section-heading text-left'>
            BUT <b className='text-violet-main'>WHY?</b>
          </h3>
          <p className='text-left'>
            The vast size of Africa, it&apos;s thousands of localities, are
            under-reported and sparsely contextualised leading to many unknown
            and unreported grassroots economies, politics and natural resources.
          </p>
          <p className='text-left'>
            Country level and international data on climate change, health,
            education, agriculture, poverty and many more are produced
            periodically across Africa. Yet, little amount of the data is
            reproduced as insights, analyses or development news
          </p>
          <p className='text-left'>
            Over 40 million African diaspora population rely heavily on
            international news platforms to understand their home countries
            which oftentimes lack in-depth analysis and local context which are
            often locked in data silos and unprocessed data sources such as
            satellite imagery and geospatial research
          </p>
        </div>

        <div className='w-full max-w-lg h-400 flex items-center justify-center px-0 md:px-10 py-10 relative'>
          <lord-icon
            src='https://cdn.lordicon.com/fazmtdnb.json'
            trigger='loop'
            colors='primary:#121331,secondary:#6d28d9'
            class='w-32 h-32 absolute z-10 -left-10 md:left-12 lg:top-5 hover:animate-spin cursor-pointer'
          />
          <span className='bg-white-main w-80 h-80 shadow-lg hover:shadow-2xl rounded-full mt-16 ml-0 md:ml-16 border border-black-thin relative flex items-center justify-center duration-300 ease-out cursor-pointer'>
            <lord-icon
              src='https://cdn.lordicon.com/utzmfilx.json'
              trigger='hover'
              colors='primary:#121331,secondary:#6d28d9'
              class='w-full h-full'
            />
          </span>
        </div>
      </section>
    </div>
  );
};
// https://cdn.lordicon.com/utzmfilx.json

export default Page;

/*
https://images.unsplash.com/photo-1584931423298-c576fda54bd2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=2070&q=80
*/
