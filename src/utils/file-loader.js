import Papa from 'papaparse';

export const fileLoader = (event, setState, details, setShow, setContent) => {
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
            setContent({
              text: 'Parsing Complete',
              type: 'success',
              description:
                'Your data has been parsed. You may continue to preview or customize your features.',
            });
            setShow(true);
          },
        }),
        contents,
        details,
        features: [
          {
            id: 1,
            name: 'GraphQL API',
            href: '#',
            type: 'Data',
            formula: 'Age * 300 - ( start_time )',
          },
          {
            id: 2,
            name: 'GraphQL API',
            href: '#',
            type: 'Custom',
            formula: 'Age * 300 - ( start_time )',
          },
          {
            id: 3,
            name: 'New feature API',
            href: '#',
            type: 'Custom',
            formula: 'Age * 300 - ( start_time )',
          },
        ],
      });

    if (!setState)
      throw new Error(
        'File Loader expected a setState function but got nothing'
      );
  };

  reader.readAsText(file);
};
