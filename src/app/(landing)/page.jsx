import Link from 'next/link';
import Hero from './hero';

export default function Home() {
  return (
    <div className='h-screen w-full flex items-center justify-start py-32 flex-col gap-3 bg-white-off'>
      <Hero />
    </div>
  );
}
