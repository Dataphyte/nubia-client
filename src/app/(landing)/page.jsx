'use client';

import { motion } from 'framer-motion';
import Hero from '../../components/hero/home-hero';
import { classNames } from 'src/utils/classnames';
import ScrollTexts from '@/components/scroll-texts';
import { heroPopCards } from '@/data/home-data';

export default function Home() {
  return (
    <div className='min-h-screen w-full flex items-center justify-start flex-col bg-white-off'>
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
      <section className='flex w-full h-max flex-col items-center gap-6 py-16 text-center'>
        {/* ====== header */}
        <h3 className='font-magistral text-3xl text-text-dark font-bold'>
          Boost your accuracy in
        </h3>

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

          <p className='mx-2 text-xl font-medium font-magistral'>&</p>

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
        <p className='font-inter font-light text-text-thin max-w-xl mt-4 w-full'>
          <b>Data</b>. It's everywhere. And it's ard to work with.
          <b className='font-black-ops'>NUBIA</b>
          &nbsp;makes it easy for you to use your data in a way that makes sense
          and helps you understand what's really happening. You have a lot of
          data. but it's not fitting into reports. You're ready to interpret it,
          but it doesn't make sense on it's own. You cannot work with the data
          in it's raw form because it doesn't fit into your report format.
        </p>
      </section>

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== SCROLLING TEXT SECTION */}
      <ScrollTexts />

      {/* ====== ###### */}
      {/* ====== ###### */}
      {/* ====== METHOD SECTION */}
      <section className='w-full py-32 flex items-center gap-16 justify-center'>
        {/* ====== text section */}
        <div className='w-full max-w-lg flex flex-col gap-6'>
          <h3 className='text-text-dark font-magistral text-3xl font-bold'>
            Use&nbsp;
            <b className='uppercase font-black-ops text-violet-main'>NUBIA</b>
            your way!
          </h3>

          {/* ====== content */}
          <p className='font-inter text-text-thin'>
            <b className='font-black-ops'>NUBIA</b> is at it's first big break
            and lerom ipsum wjidnjin wdijcvndijsc wijdcnijwc wijdcnw ciwdc wcidj
            wi ciwdjcwdncij wdciwjcnw dciwdjc wdijc widcj wdciwjdciwdcj dwicjwd
            cwidjc wdicjwd ciwdjc dwciwdjc wdic idwc dciwjd cidcj dciwjc widcjdc
            widcj ciwdjc dcidjc wijc .
          </p>
        </div>

        {/* ====== image section */}
        <motion.div
          initial={{ opacity: 0, x: 300 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ delay: 0.3 }}
          className='w-full max-w-lg h-300 bg-white-main rounded-xl shadow-xl'
        />
      </section>
    </div>
  );
}
