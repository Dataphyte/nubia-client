import {
  ChartBarIcon,
  PaperClipIcon,
  DocumentTextIcon,
} from '@heroicons/react/24/outline';

export const navigation = [
  {
    name: 'Stories',
    href: '/tool/stories',
    icon: DocumentTextIcon,
    current: true,
  },
  { name: 'Data', href: '/tool/data', icon: ChartBarIcon },
  { name: 'Class Names', href: '/tool/class-names', icon: PaperClipIcon },
];

export const userNavigation = [
  { name: 'Your Profile', href: '#' },
  { name: 'Settings', href: '#' },
  { name: 'Sign out', href: '#' },
];
