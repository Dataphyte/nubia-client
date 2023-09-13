import PopImage1 from '../assets/images/hero-coding.jpg';
import PopImage2 from '../assets/images/hero-coding-2.jpg';
import PopImage3 from '../assets/images/hero-data-sheet.jpg';
import PopImage4 from '../assets/images/hero-data-sheet-2.jpg';
import { FeaturePopupProps } from '../components/pop-ups/feature-popup';

export const heroPopCards = [
  {
    name: 'card-1',
    icon: 'Something',
    position: '-translate-x-[180px] -translate-y-[200px]',
    size: 'w-40 h-24',
    ringed: true,
    image: PopImage1,
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
    image: PopImage4,
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
    image: PopImage1,
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
    image: PopImage3,
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
    image: PopImage2,
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
    image: PopImage4,
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
    animation: { enter: { x: 30 }, delay: 0.7 },
  },
  {
    iconUrl: 'https://cdn.lordicon.com/ufezupnm.json',
    text: 'Let NUBIA do the writing',
    shadow: 'shadow-lg',
    animation: { enter: { x: -80 }, delay: 0.4 },
  },
];

export const featureContent = {
  feat_1: {
    title: 'Story telling',
    bg: 'bg-[#1E293B]',
    body: 'Nubia Improves accuracy in story telling by taking off the burdern of Journalists from drawing insight from raw and dense data.',
    icon: 'https://cdn.lordicon.com/flqcnwch.json',
    btnText: 'Ok',
    btnLink: '/',
  },
  feat_2: {
    title: 'Data analysis',
    bg: 'bg-violet-main',
    body: 'The stories produced by Nubia have been pre-analyzed, restructured and sorted well enough to be used right away for story telling.',
    icon: 'https://cdn.lordicon.com/nbdmfygb.json',
    btnText: 'Ok',
    btnLink: '/',
  },
  feat_3: {
    title: 'Repetitive tasks',
    bg: 'bg-green-main',
    body: 'Due to the ability of Nubia to treat each entry point one after the other, There is no need for manual generation of stories that use the same template or have the same format.',
    icon: 'https://cdn.lordicon.com/jvucoldz.json',
    btnText: 'Ok',
    btnLink: '/',
  },
};
