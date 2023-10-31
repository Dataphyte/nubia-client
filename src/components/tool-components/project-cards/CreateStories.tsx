import { ProjectSchema } from '@/src/typescript/project';
import React, { useState, useEffect } from 'react';
import Lottie from 'lottie-react';
import { useParams, useRouter } from 'next/navigation';
import { projectStore } from '@/src/global/projectStore';
import OpenAI from 'openai';
import { FirebaseStorage } from '@/src/server/firebase';
import { getDownloadURL, ref } from 'firebase/storage';
import { ParseResult } from 'papaparse';
import Papa from 'papaparse';
import parse from 'html-react-parser';
import DataInsight from '../../slide-overs/data-insight';
import {
  useGetSingleProject,
  useUpdateProjectData,
} from '@/src/hooks/queries/useProject';
import NoStoriesLottie from '@/assets/animations/no-stories-lottie.json';
import {
  ClipboardDocumentCheckIcon,
  CodeBracketIcon,
} from '@heroicons/react/24/outline';
import { htmlToText } from 'html-to-text';

type ComponentProps = {
  projectDetails: ProjectSchema;
};

const CreateStories = ({ projectDetails }: ComponentProps) => {
  const { id } = useParams();
  const [prompt, setPrompt] = useState<
    | { role: 'user' | 'function' | 'system' | 'assistant'; content: string }[]
    | null
  >(null);
  const [response, setResponse] = useState<null | string>(null);
  const [openInsight, setOpenInsight] = useState<boolean>(false);
  const [localProjectdata, setLocalProjectData] =
    useState<ParseResult<any> | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const { data: queryProjectData, refetch: fetchProjectData } =
    useGetSingleProject(id as string);

  const { refetch: updateSIngleProject } = useUpdateProjectData(id as string);
  const { updateData, setUpdateData } = projectStore();
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // ======= handle request -->
  const openAICall = async () => {
    // console.log(projectData?.parsed.data);
    setLoading(true);
    prompt &&
      (await openai.chat.completions
        .create({
          model: 'gpt-4-0314',
          messages: prompt,
          temperature: 0,
          max_tokens: 2048,
        })
        .then((res) => {
          console.log(res);
          setResponse(res.choices[0].message.content as string);
          projectDetails.stories &&
            setUpdateData({
              stories: [
                ...projectDetails?.stories,
                {
                  tone: 'The economist style guide',
                  content: res.choices[0].message.content as string,
                },
              ],
            });

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        }));

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
    updateData &&
      updateSIngleProject().then(() => {
        fetchProjectData();
        setUpdateData(null);
      });
  }, [updateData]);

  useEffect(() => {}, [updateData]);

  useEffect(() => {
    prompt && !response && openAICall();
  }, [prompt]);

  return (
    <div className='flex flex-col w-full min-h-[400px] gap-4'>
      <DataInsight
        open={openInsight}
        setOpen={setOpenInsight}
        data={JSON.stringify(localProjectdata?.data)}
      />
      {localProjectdata?.data && (
        <div className='w-max h-max flex items-center py-3 px-5 gap-5 border shadow-md rounded-lg border-gray-400'>
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
      <div className='w-full h-max flex flex-col gap-4'>
        <h3 className='text-2xl'>Generate Your story</h3>

        <div className='w-full border border-gray-300 rounded min-h-[400px] h-auto flex flex-col items-center justify-center gap-4 py-5 px-4'>
          {(projectDetails.stories && projectDetails.stories?.length > 0) ||
          response ? (
            <>
              {queryProjectData?.data.stories &&
                queryProjectData.data.stories.map((story, idx) => (
                  <div key={idx}>
                    <>
                      <p>Story {idx + 1}</p>
                      <p>Tone - {story.tone}</p>
                      <div>
                        <button className='py-1 px-3 text-sm border border-gray-300 rounded-lg shadow duration-200 ease-out tranistion-all hoverL:shadow-lg m-2 w-max'>
                          &larr; Prev
                        </button>
                        <button className='py-1 px-3 text-sm border border-gray-300 rounded-lg shadow duration-200 ease-out tranistion-all hoverL:shadow-lg m-2 w-max'>
                          Next &rarr;
                        </button>
                      </div>
                      <div className='flex flex-col p-2 lg:px-4 shadow-lg rounded-lg bg-orange-100 mt-5 prose max-w-none'>
                        {parse(story.content)}
                        <div className='flex items-center gap-3 flex-wrap w-full mt-3'>
                          <button
                            className='py-1 px-6 text-sm text-white-off rounded-md shadow duration-300 ease-out hover:shadow-lg bg-violet-main w-max flex gap-1 items-center justify-center'
                            onClick={() =>
                              navigator.clipboard
                                .writeText(htmlToText(story.content))
                                .then(() =>
                                  alert('✅ Your story has been copied!')
                                )
                            }
                          >
                            Copy story
                            <ClipboardDocumentCheckIcon className='w-5 h-5 text-white-off' />
                          </button>
                          <button
                            className='py-1 px-6 text-sm text-white-off rounded-md shadow duration-300 ease-out hover:shadow-lg bg-green-main w-max flex gap-1 items-center justify-center'
                            onClick={() =>
                              navigator.clipboard
                                .writeText(story.content)
                                .then(() =>
                                  alert('✅ Your story has been copied!')
                                )
                            }
                          >
                            Copy HTML
                            <CodeBracketIcon className='w-5 h-5 text-white-off' />
                          </button>
                        </div>
                      </div>
                    </>
                    <div></div>
                  </div>
                ))}
            </>
          ) : (
            <>
              <Lottie
                animationData={NoStoriesLottie}
                autoplay
                loop
                style={{ width: '200px', height: '50%' }}
              />
              <p>This project has no stories</p>
              {loading ? (
                <p className='py-1 text-sm px-8 w-max border border-orange-500 text-orange-500 animate-pulse rounded-md shadow-lg '>
                  Loading...
                </p>
              ) : (
                <div className='flex items-center gap-4 flex-wrap'>
                  <button
                    className='py-1.5 text-sm px-4 rounded-md shadow duration-300 ease-out transition-all hover:shadow-lg text-white-off bg-green-main'
                    onClick={() =>
                      setPrompt(() => [
                        {
                          role: 'system',
                          content: `Act like a journalist. Give all of your responses using the economics style guide. enclose your response in html tags without the doctype, html, head, body and style tags`,
                        },
                        {
                          role: 'user',
                          content: `Writing in the economist style guide, write an 800 word news story article from the dataset ${JSON.stringify(
                            localProjectdata?.data
                          )}`,
                        },
                      ])
                    }
                  >
                    Autogenerate with AI
                  </button>
                  <button
                    className='py-1.5 text-sm px-4 rounded-md shadow duration-300 ease-out transition-all hover:shadow-lg text-white-off bg-violet-main'
                    onClick={() => {
                      if (!projectDetails.template?.content) {
                        return alert('Project has no template!');
                      }
                      setPrompt(() => [
                        {
                          role: 'system',
                          content: `A template would be sent alongside a dataset snapshot. return the exact template while only replacing the variable points enclosed in "{{}}" tags`,
                        },
                        {
                          role: 'user',
                          content: `Replacing the variables enclosed in "{{}}" in the template ${
                            projectDetails.template?.content
                          } with values from the data ${JSON.stringify(
                            localProjectdata?.data
                          )}, return the exact same template as a complete story.`,
                        },
                      ]);
                    }}
                  >
                    Generate from template
                  </button>
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default CreateStories;
