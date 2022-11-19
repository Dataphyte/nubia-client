'use client';

import '../styles/globals.css';
import '../styles/fonts.css';
import Script from 'next/script';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />

      <body className='bg-white-off'>
        <Script src='https://cdn.lordicon.com/qjzruarw.js' />

        {children}
      </body>
    </html>
  );
}
