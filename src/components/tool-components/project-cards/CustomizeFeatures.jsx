'use client';

import { projectStore } from '@/src/global/projectStore';
import React from 'react';

const CustomizeFeatures = () => {
  const { projectData, setProjectData } = projectStore();

  return <div>CustomizeFeatures</div>;
};

export default CustomizeFeatures;
