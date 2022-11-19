'use client';

import Image from 'next/image';
import { motion } from 'framer-motion';
import Hero from '../../components/hero/home-hero';
import { classNames } from 'src/utils/classnames';
import ScrollTexts from '@/components/scroll-texts';
import { heroPopCards, stepCards } from '@/data/home-data';

export default function Home() {
  return (
    <div className='page__container'>
      <Hero />

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== image illustration section */}
      <section className='flex w-full h-[500px] items-center justify-center relative'>
        {/* ====== main content */}
        <motion.div
          initial={{ opacity: 0, scale: 1.5 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className='w-72 h-[400px] rounded-3xl shadow-2xl z-10 bg-white-main border border-black-thin'
        />

        {/* ====== pop-out cards */}
        {heroPopCards.map((card) => (
          <motion.div
            initial={{ opacity: 0, x: 0, y: 0 }}
            whileInView={{
              opacity: 1,
              x: card.animation.enter.x,
              y: card.animation.enter.y,
            }}
            transition={{ delay: card.animation.transition.delay }}
            viewport={{ once: true }}
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
      <section className='flex w-full h-max flex-col items-center gap-6 py-16 px-5 text-center'>
        {/* ====== header */}
        <h3 className='home__section-heading'>Boost your accuracy in</h3>

        {/* ====== tags */}
        <span className='flex w-full items-center justify-center gap-2'>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, ease: 'easeOut' }}
            className='feature__tag bg-[#1E293B]'
          >
            Story telling
          </motion.p>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.2 }}
            className='feature__tag bg-violet-main'
          >
            Data analysis
          </motion.p>

          <p className='md:mx-2 text-xl font-medium font-magistral'>&</p>

          <motion.p
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, ease: 'easeOut', delay: 0.4 }}
            className='feature__tag bg-green-main'
          >
            Recurssion
          </motion.p>
        </span>

        {/* ====== content */}
        <p className='font-inter font-light text-text-thin max-w-2xl mt-4 w-full text-base lg:text-lg  px-5'>
          <b>Data</b>. It&apos;s everywhere. And it&apos;s ard to work with.
          <b className='font-black-ops'>NUBIA</b>
          &nbsp;makes it easy for you to use your data in a way that makes sense
          and helps you understand what&apos;s really happening. You have a lot
          of data. but it&apos;s not fitting into reports. You&apos;re ready to
          interpret it, but it doesn&apos;t make sense on it&apos;s own. You
          cannot work with the data in it&apos;s raw form because it
          doesn&apos;t fit into your report format.
        </p>
      </section>

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== SCROLLING TEXT SECTION */}
      <ScrollTexts />

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== METHOD SECTION */}
      <section className='home__section-container'>
        {/* ====== text section */}
        <div className='home__section-box'>
          <h3 className='home__section-heading'>
            Use&nbsp;
            <b className='uppercase font-black-ops text-violet-main'>NUBIA</b>
            your way!
          </h3>

          {/* ====== content */}
          <p className='font-inter text-text-thin text-base xl:text-lg'>
            <b className='font-black-ops'>NUBIA</b> is at it&apos;s first big
            break and is open to contributions and suggestons. For now, you can
            create templates, add services and load data or upload locally and
            even save to a database or cloud service, always remember to include
            the class names in the response Just create a route and do it your
            own way! It&apos;s that simple.
          </p>
        </div>

        {/* ====== image section */}
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className='w-full max-w-lg h-300 bg-white-main rounded-xl shadow-xl relative overflow-hidden border border-black-thin'
        >
          <Image
            src='https://images.unsplash.com/photo-1508921340878-ba53e1f016ec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Nnx8bmV3c3xlbnwwfHwwfHw%3D&auto=format&fit=crop&w=900&q=60'
            fill
            className='object-cover object-center'
          />
        </motion.div>
      </section>

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== STEPS SECTION */}
      <section className='home__section-container flex-col-reverse lg:flex-row pt-0'>
        <div className='flex flex-col w-full ml-14 lg:m-0 max-w-lg items-center justify-center gap-5'>
          {stepCards.map((card, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -200 }}
              whileInView={{ opacity: 1, x: card.animation.enter.x }}
              transition={{ delay: card.animation.delay }}
              className={classNames(
                'flex items-center justify-between px-8 rounded-xl bg-white-main w-[250px] lg:w-[350px] py-1 border border-black-thin',
                card.shadow
              )}
            >
              <lord-icon
                src={card.iconUrl}
                trigger='loop'
                colors='primary:#121331,secondary:#6d28d9'
                style={{ width: '70px', height: '70px' }}
              />
              <p className='font-magistral text-text-thin text-lg'>
                {card.text}
              </p>
            </motion.div>
          ))}
        </div>

        {/* ====== text area */}
        <div className='home__section-box'>
          <h3 className='home__section-heading'>
            Create Stories in&nbsp;
            <b className='uppercase font-black-ops text-violet-main'>3 steps</b>
          </h3>
          <p className='font-magistral text-text-thin text-base lg:text-lg'>
            Lorem ipsum dolor sit amet consectetur, adipisicing elit. Totam
            excepturi velit expedita maxime dolorem quod nulla, officia,
            molestiae tenetur culpa corporis? Corrupti deleniti magnam
            consectetur tempora et sunt atque non. Natus vitae libero labore.
            Temporibus, ex adipisci rerum eveniet, maxime eius nemo aliquid
            repellendus dolore autem, magnam officia nostrum repellat explicabo
            ducimus dicta praesentium quae laudantium sunt ullam ab dolorum!
          </p>
        </div>
      </section>
    </div>
  );
}
