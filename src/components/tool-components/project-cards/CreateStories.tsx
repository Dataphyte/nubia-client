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
  PencilIcon,
  TrashIcon,
} from '@heroicons/react/24/outline';
import removeMarkdown from 'markdown-to-text';
import Markdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

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
  const [tone, setTone] = useState<string>('The economist style');
  const [openInsight, setOpenInsight] = useState<boolean>(false);
  const [storyToShow, setStoryToShow] = useState<number>(0);
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
          model: 'gpt-4o',
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
                  tone,
                  content: res.choices[0].message.content as string,
                },
              ],
            });

          setLoading(false);
          setPrompt(null);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
          setPrompt(null);
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

        <div className='w-full border border-gray-300 rounded min-h-[400px] h-auto flex flex-col items-center justify-center gap-4 py-5 px-1 lg:px-4'>
          {(projectDetails.stories && projectDetails.stories?.length > 0) ||
          response ? (
            <>
              {queryProjectData?.data.stories &&
                queryProjectData.data.stories.map(
                  (story, idx) =>
                    idx === storyToShow && (
                      <div key={idx}>
                        <>
                          <p className='tracking-widest'>
                            Story {idx + 1} of&nbsp;
                            {queryProjectData?.data.stories?.length}
                          </p>
                          <p>Tone - {story.tone}</p>
                          <div>
                            <button
                              className='py-1 px-3 text-sm border border-gray-300 rounded-lg shadow-sm duration-200 ease-out tranistion-all hoverL:shadow-lg m-2 w-max hover:shadow-lg'
                              disabled={storyToShow === 0}
                              onClick={() =>
                                setStoryToShow((state) => (state -= 1))
                              }
                            >
                              &larr; Prev
                            </button>
                            <button
                              className='py-1 px-3 text-sm border border-gray-300 rounded-lg shadow-sm duration-200 ease-out tranistion-all hoverL:shadow-lg m-2 w-max hover:shadow-lg'
                              disabled={
                                storyToShow ===
                                queryProjectData?.data.stories?.length! - 1
                              }
                              onClick={() =>
                                setStoryToShow((state) => (state += 1))
                              }
                            >
                              Next &rarr;
                            </button>
                          </div>
                          <div className='flex items-center py-1 my-2 px-2 gap-3 flex-wrap'>
                            <select
                              className='focus:border-violet-main rounded-lg shadow-md text-sm cursor-pointer'
                              onChange={(e) => setTone(e.target.value)}
                            >
                              <option>~ Selct Story tone ~</option>
                              <option value='The economist style'>
                                The economist style
                              </option>
                              <option value='persuasive'>Persuasive</option>
                              <option value='professional'>Professional</option>
                              <option value='journalistic'>Journalistic</option>
                              <option value='funny'>Funny</option>
                              <option value='statistical'>Statistical</option>
                              <option value='sad'>Sad</option>
                            </select>
                            {loading ? (
                              <p className='py-1 text-sm px-8 w-max border border-orange-500 text-orange-500 animate-pulse rounded-md shadow-lg'>
                                Loading...
                              </p>
                            ) : (
                              <button
                                className='py-1.5 text-sm px-4 rounded-md shadow duration-300 ease-out transition-all hover:shadow-lg text-white-off bg-green-main'
                                onClick={() =>
                                  queryProjectData?.data.stories?.length! <= 10
                                    ? setPrompt(() => [
                                        {
                                          role: 'system',
                                          content:
                                            'Embed all your responses in markdown format',
                                        },
                                        {
                                          role: 'system',
                                          content: `Act like a journalist whose wrting style is ${tone}`,
                                        },
                                        {
                                          role: 'user',
                                          content: `write a full news report article using the dataset ${JSON.stringify(
                                            localProjectdata?.data
                                          )}`,
                                        },
                                      ])
                                    : alert('⚠️Maximum of 10 stories allowed!')
                                }
                              >
                                Generate again with AI
                              </button>
                            )}
                          </div>
                          <div className='flex flex-col py-5 px-2 lg:px-4 shadow-2xl border-2 border-gray-400 rounded-lg bg-orange-100 mt-5 prose max-w-none'>
                            {/* {parse(story.content)} */}
                            <Markdown remarkPlugins={[remarkGfm]}>
                              {story.content}
                            </Markdown>
                            <div className='flex items-center justify-center px-1 lg:px-5 w-full gap-4 flex-wrap bg-white-main/10 border py-4 my-5 shadow-lg border-gray-400 rounded-md'>
                              <button
                                className='py-2 px-6 text-sm text-black-bg hover:text-white-off rounded-md shadow duration-300 ease-out hover:shadow-lg border border-gray-300 bg-white-main/10 hover:bg-violet-main w-max flex gap-1 items-center justify-center'
                                onClick={() =>
                                  navigator.clipboard
                                    .writeText(removeMarkdown(story.content))
                                    .then(() =>
                                      alert('✅ Your story has been copied!')
                                    )
                                }
                              >
                                Copy story
                                <ClipboardDocumentCheckIcon className='w-5 h-5 text-white-off' />
                              </button>
                              <button
                                className='py-2 px-6 text-sm text-black-bg hover:text-white-off rounded-md shadow duration-300 ease-out hover:shadow-lg border border-gray-300 bg-white-main/10 hover:bg-green-main w-max flex gap-1 items-center justify-center'
                                onClick={() =>
                                  navigator.clipboard
                                    .writeText(story.content)
                                    .then(() =>
                                      alert('✅ Your story has been copied!')
                                    )
                                }
                              >
                                Copy Markdown
                                <CodeBracketIcon className='w-5 h-5 text-white-off' />
                              </button>

                              <button
                                className='py-2 px-6 text-sm text-black-bg hover:text-white-off rounded-md shadow duration-300 ease-out hover:shadow-lg border border-gray-300 bg-white-main/10 hover:bg-red-main w-max flex gap-1 items-center justify-center'
                                onClick={() =>
                                  navigator.clipboard
                                    .writeText(story.content)
                                    .then(() =>
                                      alert('✅ Your story has been copied!')
                                    )
                                }
                              >
                                Delete story
                                <TrashIcon className='w-5 h-5 text-white-off' />
                              </button>
                            </div>
                          </div>
                        </>
                        <div></div>
                      </div>
                    )
                )}
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
                          content:
                            'Embed all your responses in markdown format',
                        },
                        {
                          role: 'system',
                          content: `Act like a journalist whose wrting style is ${tone}`,
                        },
                        {
                          role: 'user',
                          content: `Write a full news report article using the dataset ${JSON.stringify(
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
                          content:
                            'Embed all your responses in markdown format',
                        },
                        {
                          role: 'system',
                          content: `A template would be sent alongside a dataset snapshot. return the exact template while replacing the variable points enclosed in "{{}}" tags.`,
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
