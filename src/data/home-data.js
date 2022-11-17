export const heroPopCards = [
  {
    name: 'card-1',
    icon: 'Something',
    position: '-translate-x-[180px] -translate-y-[200px]',
    size: 'w-40 h-24',
    ringed: true,
    animation: {
      enter: { x: -180, y: -200 },
      transition: { delay: 0.3 },
    },
  },
  {
    name: 'card-2',
    icon: 'something',
    position: '-translate-x-[300px] -translate-y-[50px]',
    size: 'w-64 h-36',
    ringed: false,
    animation: {
      enter: { x: -300, y: -50 },
      transition: { delay: 0.4 },
    },
  },
  {
    name: 'card-3',
    icon: 'something',
    position: '-translate-x-[200px] translate-y-[120px]',
    size: 'w-48 h-28',
    ringed: true,
    animation: {
      enter: { x: -200, y: 120 },
      transition: { delay: 0.4 },
    },
  },
  {
    name: 'card-4',
    icon: 'something',
    position: 'translate-x-[200px] -translate-y-[160px]',
    size: 'w-48 h-28',
    ringed: false,
    animation: {
      enter: { x: 200, y: -160 },
      transition: { delay: 0.5 },
    },
  },
  {
    name: 'card-5',
    icon: 'something',
    position: 'translate-x-[290px] -translate-y-[10px]',
    size: 'w-64 h-36',
    ringed: true,
    animation: {
      enter: { x: 290, y: -10 },
      transition: { delay: 0.7 },
    },
  },
  {
    name: 'card-6',
    icon: 'something',
    position: 'translate-x-[200px] translate-y-[160px]',
    size: 'w-56 h-32',
    ringed: false,
    animation: {
      enter: { x: 200, y: 160 },
      transition: { delay: 0.5 },
    },
  },
];

export const stepCards = [
  {
    iconUrl: 'https://cdn.lordicon.com/wrprwmwt.json',
    text: 'Upload your Data',
    shadow: 'shadow',
    animation: { enter: { x: -20 }, delay: 0.3 },
  },
  {
    iconUrl: 'https://cdn.lordicon.com/ubfkjuri.json',
    text: 'Create your template',
    shadow: 'shadow-2xl',
    animation: { enter: { x: 30 }, delay: 0.4 },
  },
  {
    iconUrl: 'https://cdn.lordicon.com/ufezupnm.json',
    text: 'Let NUBIA do the writing',
    shadow: 'shadow-lg',
    animation: { enter: { x: -80 }, delay: 0.7 },
  },
];
