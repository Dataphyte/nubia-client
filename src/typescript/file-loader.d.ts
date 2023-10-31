import React, { SetStateAction } from 'react';

interface FileLoaderProps {
  event: React.ChangeEvent<HTMLInputElement>;
  setState: (projectData: any) => void;
  details: { fileName: string; fileSize: string };
  setShow: React.Dispatch<SetStateAction<boolean>>;
  setNotificationContent: (content: NotificationContentType) => void;
}
//=============================================>
// ======= EXPORTS -->
//=============================================>
export { FileLoaderProps };
