import Papa from 'papaparse';
import { FileLoaderProps } from '../typescript/file-loader';

export const fileLoader = ({
  event,
  setState,
  details,
  setShow,
  setNotificationContent,
}: FileLoaderProps) => {
  const file = event.target.files?.[0];

  // ======= check for file availability -->
  if (!file) return;

  // ======= create file reader  -->
  const reader = new FileReader();

  reader.onload = (e) => {
    const contents = e.target?.result;

    setState &&
      setState({
        parsed: Papa.parse(contents, {
          header: true,
          complete: () => {
            setNotificationContent({
              text: 'Parsing Complete',
              type: 'success',
              description:
                'Your data has been parsed. You may continue to preview or customize your features.',
            });
            setShow(true);
          },
        }),
        contents,
        features: [],
        details,
      });

    if (!setState)
      throw new Error(
        'File Loader expected a setState function but got nothing'
      );
  };

  reader.readAsText(file);
};