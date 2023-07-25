import {
  ChartBarIcon,
  PaperClipIcon,
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
    name: 'Stories',
    href: '/tool/stories',
    icon: DocumentTextIcon,
  },

  // TODO: move these under projects
  { name: 'Data', href: '/tool/data', icon: ChartBarIcon },
  { name: 'Class Names', href: '/tool/class-names', icon: PaperClipIcon },
];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
