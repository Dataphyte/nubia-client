'use client';

import '../styles/globals.css';
import '../styles/fonts.css';
import Script from 'next/script';
import { useState, useEffect, ReactNode } from 'react';
import { QueryClientProvider, QueryClient } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { subscribeStore } from '@/global/subscribeStore';
import FeaturePopup from '@/components/pop-ups/feature-popup';
import { SessionProvider } from 'next-auth/react';
import 'react-quill/dist/quill.snow.css';
import React from 'react';

const queryClient = new QueryClient();

export default function RootLayout({ children }: { children: ReactNode }) {
  const [subModalOpen, setSubModalOpen] = useState(false);
  const { seen, setSeen } = subscribeStore();

  useEffect(() => {
    // 30 secs delay before showing pop-up
    setTimeout(() => {
      !seen && setSubModalOpen(true);
      setSeen();
    }, 30000);
  }, [seen]);

  return (
    <html lang='en'>
      <head />

      <body className='bg-white-off'>
        <SessionProvider>
          <Script src='https://cdn.lordicon.com/qjzruarw.js' />
          {subModalOpen && (
            <FeaturePopup
              state={subModalOpen}
              setState={setSubModalOpen}
              content={{
                title: 'Stay up to date with Nubia',
                icon: 'https://cdn.lordicon.com/jshbewmb.json',
                bg: 'bg-violet-main',
                btnText: "Let's Go!",
                btnLink: 'https://forms.gle/etCNQnfrcq3cwPQv7',
                body: 'Nubia is constantly growing and new features would continue to be added at the speed of light ⚡️. Subscribe to be notified of important features!',
              }}
            />
          )}
          <QueryClientProvider client={queryClient}>
            {children}
            <ReactQueryDevtools initialIsOpen={false} />
          </QueryClientProvider>
          <Script
            async
            id='g-analytics-script'
            data-nscript='afterinteractive'
            src='https://www.googletagmanager.com/gtag/js?id=G-JRMY44JJX0'
          >
            {` window.dataLayer = window.dataLayer || []; function gtag()
          {dataLayer.push(arguments)}
          gtag('js', new Date()); gtag('config', '${process.env.NEXT_PUBLIC_G_TAG}'')`}
          </Script>
        </SessionProvider>
      </body>
    </html>
  );
}
