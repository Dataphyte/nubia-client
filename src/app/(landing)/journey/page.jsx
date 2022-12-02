import React from 'react';
import Link from 'next/link';
import Image from 'next/image';
import HighRes from '../../../assets/images/high-res-prototype.jpeg';
import LowRes from '../../../assets/images/low-res-prototype.jpeg';
import Hero from '@/components/hero';
import Head from './head';

const comTools = [
  { name: 'YSeop', link: 'https://www.yseop.com/' },
  { name: 'AX Semantics', link: 'https://en.ax-semantics.com/' },
  { name: 'Narrativa', link: 'https://www.narrativa.com/' },
  { name: 'Arria', link: 'https://www.arria.com/' },
  { name: 'RADAR', link: 'https://pa.media/radar/' },
  { name: 'Wordsmith', link: 'https://automatedinsights.com/wordsmith/' },
];
const openSource = [
  { name: 'Core NLG', link: 'https://github.com/societe-generale/core-nlg' },
  { name: 'Simplenlg', link: 'https://github.com/simplenlg/simplenlg' },
  {
    name: 'Page detector',
    link: 'https://wordpress.org/plugins/page-detector/',
  },
];

const Journey = () => {
  return (
    <div className='page__container'>
      <Head />
      <Hero
        heading='OUR JOURNEY'
        subHeading='The call, the crawl, and the counsels'
      />

      {/* ====== ########## */}
      {/* ====== ########## */}
      {/* ====== STORY SECTION */}
      <div className='relative py-16'>
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
                    className='text-gray-500'
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
                    className='text-gray-500'
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
                    className='text-gray-500'
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
              <span className='block text-center text-lg font-semibold text-indigo-600'>
                Introducing
              </span>
              <span className='mt-2 block text-center text-3xl font-bold leading-8 tracking-tight text-gray-900 sm:text-4xl'>
                The walk through
              </span>
            </h1>
            <p className='mt-8 text-xl leading-8 text-gray-500'>
              For 2022&apos;s JournalismAI Fellowship, Dataphyte Nigeria and
              Fædrelandsvennen from Norway bonded over the mission to develop an
              AI tool that can automatically create content from satellite,
              socioeconomic, weather, and web camera data to deliver customised
              content for local, regional and global audiences.
            </p>
          </div>

          <div className='prose prose-lg prose-indigo mx-auto mt-6 text-gray-500'>
            <p>
              We tagged the project &apos;Nubia&apos;, based on the historical
              and anthropological significance of the name to Africa and the
              world. The name reflects the paradox about the vast size of Africa
              but the thousands of localities that are under-reported and
              sparsely contextualised, leading to many unknown and unreported
              grassroots economies, politics, and natural resources.
            </p>
            <p>
              Country-level and international data on climate change, health,
              education, agriculture, and poverty is produced periodically
              across Africa. Yet, little data is reproduced as insights,
              analysis, or development news.
            </p>
            {/* ====== The call */}
            <h2>
              The <b className='text-violet-dark'>call</b>
            </h2>
            <p>
              The Fellowship project was born out of realisation that newsrooms
              with small teams are constrained from producing content from the
              enormous amount of data they curate or mine from various sources.
            </p>
            <p>
              In many African countries, hundreds of socioeconomic datasets are
              frequently published by various sources but rarely turned into
              journalistic stories. Take, for example, revenue distribution data
              published by the Nigerian Bureau of Statistics (NBS). Journalists
              write at best five reports from the monthly dataset. At Dataphyte,
              we wish we could tell 800 stories based on the 800 distinct states
              and local governments highlighted in the dataset.
            </p>
            <p>
              Taking the lead from our Norwegian colleagues&apos; reality, we
              also saw a great opportunity to explore the use of web camera
              data, by building an AI tool that could spot irregular patterns or
              events on camera. For instance, the tool might spot car accidents
              or riots and alert journalists of a potential story to follow.
              Specific segments of the population&#45; such as drivers, farmers,
              and security agencies &#45; could leverage media insights from
              satellite and web cameras to make preventive decisions informed by
              data.
            </p>
            <p>
              Altogether, we were driven by the goal of offering customised data
              and development reporting to specific audiences based on their
              location and interests. So we tasked the team to auto-generate
              news reports and data insights that can be distributed directly to
              the newsroom from satellite, socioeconomic, weather and web camera
              data.
            </p>
            {/* ====== The crawl */}
            <h2>
              The <b className='text-violet-dark'>crawl</b>, or what we learnt
              later &#45; but not too late
            </h2>
            <p>
              As we began working on the project, we outlined our plan anchored
              on the primary goal to build a tool that would serve our editorial
              staff and target audiences with content based on real-time data.
              We planned to start with web cameras and satellite images. Next,
              we planned to do the same with weather data. The final step was to
              see how we could automate the aggregation and transformation of
              massive public data on socioeconomic indicators and development
              themes across cities, countries, and continents.
            </p>
            <p>
              We started by designing a tool to parse datasets and store data as
              JSON files. From there, the data is managed and organised in a way
              that allows for the generation of articles that could be published
              more or less directly to the news site.
            </p>
            {/* ====== low res image */}
            <figure>
              <Image
                className='w-full rounded-lg'
                src={LowRes}
                alt='Low-Res Prototype'
                width={1310}
                height={873}
              />
              <figcaption>Low-Res Prototype</figcaption>
            </figure>
            <p>
              While we were hoping to build a model that aggregates data, parses
              it, and then generates insights all together, we realised that we
              might not have enough time to achieve all of the above during the
              Fellowship. After all, we were trying to perform three
              related-but-distinct operations at once: NLP, NLG, and Web alert.
            </p>
            <p>
              We understood that for the duration of the Fellowship, we should
              narrow our goal to creating a tool that takes clean datasets and
              manually-written templates to generate articles based on multiple
              locations or named entities in the datasets.
            </p>
            <p>
              At this rate, we realised we might only need an algorithm
              framework which can replace entry points pre-defined in a template
              with the value of an external dataset parsed to javascript objects
              to generate sentences. From there, we can proceed to return those
              generated articles as a response from API endpoints to whatever
              client side is receiving or calling them.
            </p>
            {/* ====== high res image */}{' '}
            <figure>
              <Image
                className='w-full rounded-lg'
                src={HighRes}
                alt='High-Res Prototype'
                width={1310}
                height={873}
              />
              <figcaption>High-Res Prototype</figcaption>
            </figure>
            <p>
              The MVP will require us to provide support to anyone who wants to
              generate stories via Nubia. In the future, we plan to add features
              that will allow users to upload their own datasets and design
              their template without support from the Nubia team.
            </p>
            <p>
              Based on consultations, we realised our work could be simplified
              if we had access to OpenAI API, but the platform is currently
              inaccessible to our region, Africa.
            </p>
            {/* ====== The counsel */}
            <h2>
              The <b className='text-violet-dark'>counsel</b>: what we&apos;ve
              learnt
            </h2>
            <p>
              We&aos;re still building out our idea, but we&apos;ve already
              learned a few things worth sharing along the way. First lesson is
              to be clear about the aspect(s) of AI or machine learning that
              your project requires. Thanks to counsel from&nbsp;
              <Link
                href='https://uk.linkedin.com/in/grogers'
                target='_blank'
                className='inline-link'
              >
                Gary Rogers
              </Link>
              , we were able to understand that the data types we initially
              thought to use had to be different from what we planned to use for
              our project.
            </p>
            <p>
              We have also reviewed various&nbsp;
              <Link
                href='https://github.com/accelerated-text/awesome-nlg'
                target='_blank'
                className='inline-link'
              >
                listings
              </Link>
              ,&nbsp;
              <Link
                href='https://www.npmjs.com/search?q=NLG'
                target='_blank'
                className='inline-link'
              >
                libraries
              </Link>
              , and frameworks dedicated to Natural Language Generation (NLG).
              One of our favourite posts, and the one we found most useful for
              building our MVP is&nbsp;
              <Link
                href='https://medium.com/voice-tech-podcast/introducing-rosaenlg-an-open-source-natural-language-generation-library-7ea711989621'
                target='_blank'
                className='inline-link'
              >
                RosaeNLG
              </Link>
              . Below you can find a list of other commercial and open-source
              tools we tested before settling on RosaeNLG.
            </p>
            <p>
              <strong>Commercial tools for NLG:</strong>
            </p>
            <ul role='list'>
              {comTools.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.link}
                    target='_blank'
                    className='inline-link'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
            </ul>
            <p>
              <strong>Open-source tools and libraries:</strong>
            </p>
            <ul role='list'>
              {openSource.map((link, idx) => (
                <li key={idx}>
                  <Link
                    href={link.link}
                    target='_blank'
                    className='inline-link'
                  >
                    {link.name}
                  </Link>
                </li>
              ))}
              <li>
                Rosae NLG &#45;&nbsp;
                <Link
                  href='https://rosaenlg.org/rosaenlg/3.2.5/index.html'
                  target='_blank'
                  className='inline-link'
                >
                  Documentation
                </Link>
                &nbsp; &&nbsp;
                <Link
                  href='https://github.com/RosaeNLG'
                  target='_blank'
                  className='inline-link'
                >
                  Github Repository
                </Link>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
