import FacebookIcon from '@/icons/facebook-icon';
import GitHubIcon from '@/icons/github-icon';
import InstagramIcon from '@/icons/instagram-icon';
import TwitterIcon from '@/icons/twitter-icon';

const navigation = {
  main: [
    { name: 'About', href: '#' },
    { name: 'Blog', href: '#' },
    { name: 'Jobs', href: '#' },
    { name: 'Press', href: '#' },
    { name: 'Accessibility', href: '#' },
    { name: 'Partners', href: '#' },
  ],

  social: [
    {
      name: 'Facebook',
      href: '#',
      icon: FacebookIcon,
    },
    {
      name: 'Instagram',
      href: '#',
      icon: InstagramIcon,
    },
    {
      name: 'Twitter',
      href: '#',
      icon: TwitterIcon,
    },
    {
      name: 'GitHub',
      href: '#',
      icon: GitHubIcon,
    },
  ],
};

const Footer = () => {
  return (
    <footer className='bg-[#0e1521]'>
      <div className='mx-auto max-w-7xl overflow-hidden py-12 px-4 sm:px-6 lg:px-8'>
        <nav
          className='-mx-5 -my-2 flex flex-wrap justify-center'
          aria-label='Footer'
        >
          {navigation.main.map((item) => (
            <div key={item.name} className='px-5 py-2'>
              <a
                href={item.href}
                className='text-base text-black-thin hover:text-violet-main duration-150'
              >
                {item.name}
              </a>
            </div>
          ))}
        </nav>
        <div className='mt-8 flex justify-center space-x-6'>
          {navigation.social.map((item) => (
            <a
              key={item.name}
              href={item.href}
              className='t text-black-thin hover:text-text-light duration-150'
            >
              <span className='sr-only'>{item.name}</span>
              <item.icon className='h-6 w-6' aria-hidden='true' />
            </a>
          ))}
        </div>
        <p className='mt-8 text-center text-base  text-black-thin'>
          &copy; 2022 Dataphyte, Inc. All rights reserved.
        </p>
      </div>
    </footer>
  );
};

export default Footer;
