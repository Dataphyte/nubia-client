import React from 'react';
import Hero from '@/components/hero';

const Journey = () => {
  return (
    <div className='page__container'>
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
                    className='text-gray-200'
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
                    className='text-gray-200'
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
                    className='text-gray-200'
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
              Faucibus commodo massa rhoncus, volutpat.
              <strong>Dignissim</strong> sed <strong>eget risus enim</strong>.
              Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit. Faucibus commodo massa rhoncus, volutpat.
              Dignissim sed eget risus enim.
              <a href='#'>Mattis mauris semper</a> sed amet vitae sed turpis id.
            </p>
            <ul role='list'>
              <li>Quis elit egestas venenatis mattis dignissim.</li>
              <li>
                Cras cras lobortis vitae vivamus ultricies facilisis tempus.
              </li>
              <li>Orci in sit morbi dignissim metus diam arcu pretium.</li>
            </ul>
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
            <blockquote>
              <p>
                Sagittis scelerisque nulla cursus in enim consectetur quam.
                Dictum urna sed consectetur neque tristique pellentesque.
                Blandit amet, sed aenean erat arcu morbi.
              </p>
            </blockquote>
            <p>
              We started by designing a tool to parse datasets and store data as
              JSON files. From there, the data is managed and organised in a way
              that allows for the generation of articles that could be published
              more or less directly to the news site.
            </p>
            <figure>
              <img
                className='w-full rounded-lg'
                src='https://images.unsplash.com/photo-1500648767791-00dcc994a43e?ixlib=rb-1.2.1&auto=format&fit=facearea&w=1310&h=873&q=80&facepad=3'
                alt=''
                width={1310}
                height={873}
              />
              <figcaption>
                Sagittis scelerisque nulla cursus in enim consectetur quam.
              </figcaption>
            </figure>

            {/* ====== The counsel */}
            <h2>
              The <b className='text-violet-dark'>counsel</b>: what we&apos;ve
              learnt
            </h2>
            <p>
              Purus morbi dignissim senectus mattis <a href='#'>adipiscing</a>.
              Amet, massa quam varius orci dapibus volutpat cras. In amet eu
              ridiculus leo sodales cursus tristique. Tincidunt sed tempus ut
              viverra ridiculus non molestie. Gravida quis fringilla amet eget
              dui tempor dignissim. Facilisis auctor venenatis varius nunc,
              congue erat ac. Cras fermentum convallis quam.
            </p>
            <p>
              Faucibus commodo massa rhoncus, volutpat. Dignissim sed eget risus
              enim. Mattis mauris semper sed amet vitae sed turpis id. Id dolor
              praesent donec est. Odio penatibus risus viverra tellus varius sit
              neque erat velit.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Journey;
