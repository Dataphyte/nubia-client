import '../styles/globals.css';
import '../styles/fonts.css';

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <head />

      <body className='bg-white-off'>{children}</body>
    </html>
  );
}
