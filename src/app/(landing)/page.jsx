import Hero from '../../components/hero/home-hero';
import { classNames } from 'src/utils/classnames';
import ScrollTexts from '@/components/scroll-texts';

const heroPopCards = [
  {
    name: 'card-1',
    icon: 'Something',
    position: '-translate-x-[180px] -translate-y-[200px]',
    size: 'w-40 h-24',
    ringed: true,
  },
  {
    name: 'card-2',
    icon: 'something',
    position: '-translate-x-[300px] -translate-y-[50px]',
    size: 'w-64 h-36',
    ringed: false,
  },
  {
    name: 'card-3',
    icon: 'something',
    position: '-translate-x-[200px] translate-y-[120px]',
    size: 'w-48 h-28',
    ringed: true,
  },
  {
    name: 'card-4',
    icon: 'something',
    position: 'translate-x-[200px] -translate-y-[160px]',
    size: 'w-48 h-28',
    ringed: false,
  },
  {
    name: 'card-5',
    icon: 'something',
    position: 'translate-x-[290px] -translate-y-[10px]',
    size: 'w-64 h-36',
    ringed: true,
  },
  {
    name: 'card-6',
    icon: 'something',
    position: 'translate-x-[200px] translate-y-[160px]',
    size: 'w-56 h-32',
    ringed: false,
  },
];

export default function Home() {
  return (
    <div className='min-h-screen w-full flex items-center justify-start flex-col bg-white-off'>
      <Hero />

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== image illustration section */}
      <section className='flex w-full h-[500px] items-center justify-center relative'>
        {/* ====== main content */}
        <div className='w-72 h-[400px] rounded-3xl shadow-2xl z-10 bg-white-main border border-black-thin' />

        {/* ====== pop-out cards */}
        {heroPopCards.map((card) => (
          <div
            className={classNames(
              'bg-white-main rounded-lg shadow-lg absolute',
              card.position,
              card.size,
              card.ringed &&
                'ring-2 ring-violet-main ring-offset-4 border border-black-thin'
            )}
            key={card.name}
          />
        ))}
      </section>

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== FEATURE SECTION */}
      <section className='flex w-full h-max flex-col items-center gap-6 py-32 text-center'>
        {/* ====== header */}
        <h3 className='font-magistral text-3xl text-text-dark font-bold'>
          Boost accuracy in
        </h3>

        {/* ====== tags */}
        <span className='flex w-full items-center justify-center gap-2'>
          <p className='feature__tag bg-[#1E293B]'>Story telling</p>
          <p className='feature__tag bg-violet-main'>Data analysis</p>
          <p className='mx-3 text-xl'>&</p>
          <p className='feature__tag bg-green-main'>Recurssion</p>
        </span>

        {/* ====== content */}
        <p className='font-inter font-light text-text-thin max-w-xl mt-4 w-full'>
          <b>Data</b>. It's everywhere. And it's ard to work with.{' '}
          <b className='font-black-ops'>NUBIA</b>
          &nbsp;makes it easy for you to use your data in a way that makes sense
          and helps you understand what's really happening. You have a lot of
          data. but it's not fitting into reports. You're ready to interpret it,
          but it doesn't make sense on it's own. You cannot work with the data
          in it's raw form because it doesn't fit into your report format.
        </p>
      </section>

      <ScrollTexts />
    </div>
  );
}
