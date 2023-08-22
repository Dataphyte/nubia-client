import {
  Cog8ToothIcon,
  UserIcon,
  DocumentTextIcon,
  BriefcaseIcon,
  HomeIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    name: 'Dashboard',
    href: '/tool/dashboard',
    icon: HomeIcon,
  },
  {
    name: 'Projects',
    href: '/tool/projects',
    icon: BriefcaseIcon,
  },
  {
    name: 'Profile',
    href: '/tool/profile',
    icon: UserIcon,
  },
  // {
  //   name: 'Stories',
  //   href: '/tool/stories',
  //   icon: DocumentTextIcon,
  // },

  // // TODO: move these under projects
  // { name: 'Data', href: '/tool/data', icon: ChartBarIcon },
  // { name: 'Class Names', href: '/tool/class-names', icon: PaperClipIcon },
  {
    name: 'Settings',
    href: '/tool/settings',
    icon: Cog8ToothIcon,
  },
];

export const userNavigation = [
  { name: 'Your Profile', href: 'profile' },
  { name: 'Settings', href: 'settings' },
  { name: 'Sign out', href: '/auth', action: (setUser) => setUser(null) },
];
