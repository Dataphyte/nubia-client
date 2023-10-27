import { ProjectSchema } from '@/src/typescript/project';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { useParams, useRouter } from 'next/navigation';
import NoDataLottie from '@/assets/animations/no-data-lottie.json';
import { projectStore } from '@/src/global/projectStore';
import OpenAI from 'openai';
import { FirebaseStorage } from '@/src/server/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { ParseResult } from 'papaparse';
import Papa from 'papaparse';
import parse from 'html-react-parser';
import DataInsight from '../../slide-overs/data-insight';
import { useGetSingleProject } from '@/src/hooks/queries/useProject';

type ComponentProps = {
  projectDetails: ProjectSchema;
};

const CreateStories = ({ projectDetails }: ComponentProps) => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState<string>('');
  const [response, setResponse] = useState<null | string>(null);
  const [openInsight, setOpenInsight] = useState<boolean>(false);
  const [localProjectdata, setLocalProjectData] =
    useState<ParseResult<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: queryProjectData, refetch: fetchProjectData } =
    useGetSingleProject(id as string);
  const { projectData } = projectStore();
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // ======= handle request -->
  const openAICall = async () => {
    console.log(projectData?.parsed.data);
    setLoading(true);
    await openai.chat.completions
      .create({
        model: 'gpt-4-0314',
        messages: [
          {
            role: 'system',
            content: `Act like a journalist. Give all of your responses using the economics style guide.`,
          },
          {
            role: 'user',
            content: '',
          },
        ],
        temperature: 0,
        max_tokens: 2048,
      })
      .then((res) => {
        console.log(res);
        setResponse(res.choices[0].message.content as string);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setLoading(false);
      });

    return;
  };

  // file download
  const handleFileDownload = async () => {
    if (!projectDetails.data) return alert('Project has no data stored');
    const pathRef = ref(
      FirebaseStorage,
      projectDetails.data.file_url as string
    );

    const downloadUrl = await getDownloadURL(pathRef);

    console.log(downloadUrl);
    // setDataUrl(downloadUrl as string);

    try {
      // @ts-ignore
      Papa.parse(downloadUrl, {
        download: true,
        complete: (result) => {
          setLocalProjectData(result);

          console.log(result);
        },
      });
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    handleFileDownload();
  }, []);

  useEffect(() => {
    fetchProjectData();
  }, []);

  useEffect(() => {}, [queryProjectData]);

  return (
    <div className='flex flex-col w-full min-h-[400px] gap-4'>
      <DataInsight
        open={openInsight}
        setOpen={setOpenInsight}
        data={JSON.stringify(localProjectdata?.data)}
      />
      {localProjectdata?.data && (
        <div className='w-full h-max flex items-center py-2 px-5 gap-5'>
          <p>Your Data is ready</p>
          <button
            className='py-1 px-6 rounded-lg shadow border bg-violet-main duration-300 ease-out transition-all text-white-off hover:shadow-lg'
            onClick={() => setOpenInsight(true)}
          >
            Talk to your data
          </button>
        </div>
      )}

      {/* -- ############################### */}
      {/* -- Story Section */}
      {/* -- ############################### */}
      <div className='w-full h-44 flex flex-col gap-4'>
        <h3 className='text-2xl'>Generate Your story</h3>
        <div className='w-full border border-gray-300 rounded min-h-[200px]'>
          {projectDetails.stories}
        </div>
      </div>
    </div>
  );
};

export default CreateStories;
