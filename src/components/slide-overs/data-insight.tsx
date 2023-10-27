import React, {
  Fragment,
  SetStateAction,
  useState,
  useEffect,
  useRef,
} from 'react';
import { Dialog, Transition } from '@headlessui/react';
import { XMarkIcon } from '@heroicons/react/24/outline';
import { PaperAirplaneIcon } from '@heroicons/react/20/solid';
import { userStore } from '@/src/global/userStore';
import { useGetUser } from '@/src/hooks/queries/useUser';
import OpenAI from 'openai';
import parse from 'html-react-parser';
import { notificationStore } from '@/src/global/notificationStore';
import {
  useGetSingleProject,
  useUpdateProjectData,
} from '@/src/hooks/queries/useProject';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import { projectStore } from '@/src/global/projectStore';
import { classNames } from '@/src/utils/classnames';

type PageProps = {
  open: boolean;
  setOpen: React.Dispatch<SetStateAction<Boolean>>;
  data: string;
};
// TODO: Limit chat memory usage to 10 user messages

export default function DataInsight({ open, setOpen, data }: PageProps) {
  const promptInputRef = useRef(null);
  const { user } = userStore();
  const { refetch } = useGetUser();
  const { id } = useParams();
  const [response, setResponse] = useState<null | string>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [prompt, setPrompt] = useState<string>('');
  const { setShow, setContent } = notificationStore();
  const [messages, setMessages] = useState<
    { role: 'user' | 'system' | 'function' | 'assistant'; content: string }[]
  >([{ role: 'user', content: 'Say there is no data uploaded' }]);
  const { refetch: fetchSingleProject, data: projectData } =
    useGetSingleProject(id as string);
  const { refetch: updateProjectData } = useUpdateProjectData(id as string);
  const { setUpdateData, updateData } = projectStore();

  // ======= initialize openai -->
  const openai = new OpenAI({
    apiKey: process.env.NEXT_PUBLIC_OPEN_AI_API_KEY,
    dangerouslyAllowBrowser: true,
  });

  // ======= handle request -->
  const openAICall = async () => {
    console.log(data);
    setLoading(true);
    if (!data) {
      setLoading(false);
      setContent({
        type: 'error',
        text: 'Missing data',
        description: 'The current chat instance has no data to analyze',
      });
      setShow(true);
      return;
    }
    data &&
      (await openai.chat.completions
        .create({
          model: 'gpt-4-0314',
          messages: messages,
          temperature: 0,
          max_tokens: 2048,
        })
        .then((res) => {
          console.log(res);
          setResponse(res.choices[0].message.content as string);
          setMessages((state) => [
            ...state,
            {
              role: res.choices[0].message.role,
              content: res.choices[0].message.content as string,
            },
          ]);

          setLoading(false);
        })
        .catch((error) => {
          console.log(error);
          setLoading(false);
        }));

    return;
  };

  useEffect(() => {
    if (data) {
      projectData && projectData?.data.chat_logs.length > 0
        ? setMessages(projectData?.data.chat_logs)
        : setMessages(() => [
            {
              role: 'system',
              content: `Embed all of your responses in html tags without the doctype, head and body tags.`,
            },
            {
              role: 'system',
              content: `Give journalistic insight into the data ${data}`,
            },
          ]);
    }
  }, [projectData, data]);

  useEffect(() => {
    // console.log(messages);
    setUpdateData({ chat_logs: messages });
    !loading &&
      messages.length > 2 &&
      messages[messages.length - 1]?.role === 'user' &&
      openAICall();
    fetchSingleProject();
  }, [messages]);

  useEffect(() => {
    data && updateProjectData().then(() => fetchSingleProject());
  }, [updateData]);

  return (
    <Transition.Root show={open} as={Fragment}>
      <Dialog as='div' className='relative z-10' onClose={setOpen}>
        <Transition.Child
          as={Fragment}
          enter='ease-in-out duration-500'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in-out duration-500'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-gray-700 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 overflow-hidden'>
          <div className='absolute inset-0 overflow-hidden'>
            <div className='pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10'>
              <Transition.Child
                as={Fragment}
                enter='transform transition ease-in-out duration-500 sm:duration-700'
                enterFrom='translate-x-full'
                enterTo='translate-x-0'
                leave='transform transition ease-in-out duration-500 sm:duration-700'
                leaveFrom='translate-x-0'
                leaveTo='translate-x-full'
              >
                <Dialog.Panel className='pointer-events-auto relative w-screen max-w-4xl'>
                  <Transition.Child
                    as={Fragment}
                    enter='ease-in-out duration-500'
                    enterFrom='opacity-0'
                    enterTo='opacity-100'
                    leave='ease-in-out duration-500'
                    leaveFrom='opacity-100'
                    leaveTo='opacity-0'
                  >
                    <div className='absolute left-0 top-0 -ml-8 flex pr-2 pt-4 sm:-ml-10 sm:pr-4'>
                      <button
                        type='button'
                        className='relative rounded-md text-gray-300 hover:text-white-main focus:outline-none focus:ring-2 focus:ring-white'
                        onClick={() => setOpen(false)}
                      >
                        <span className='absolute -inset-2.5' />
                        <span className='sr-only'>Close panel</span>
                        <XMarkIcon className='h-6 w-6' aria-hidden='true' />
                      </button>
                    </div>
                  </Transition.Child>
                  <div className='flex h-full flex-col overflow-y-scroll bg-black-bg shadow-xl'>
                    <div className='px-4 sm:px-6 bg-violet-main py-5 text-white-off flex items-center justify-between '>
                      <Dialog.Title className='text-base font-semibold leading-6 text-white-off'>
                        Data Insight Panel
                      </Dialog.Title>
                      {/* TODO: Delete this line */}
                      <p>chat count - {projectData?.data.chat_logs.length}</p>
                      <p className='text-sm'>
                        Memory usage:{' '}
                        {
                          projectData?.data.chat_logs.filter(
                            (item) => item.role === 'user'
                          ).length
                        }
                        /10
                      </p>
                    </div>
                    {loading && (
                      <p className='text-orange-400 absolute right-10 bg-black-bg py-1 px-3 rounded-md shadow-lg border border-orange-400 top-20 z-50'>
                        loading...
                      </p>
                    )}
                    <div className='relative mt-6 flex-1 px-4 sm:px-6 bg-green-min flex flex-col items-center justify-between pb-24'>
                      {/* Your content */}
                      <div className='w-full h-full flex flex-col items-center justify-center'>
                        {user ? (
                          <span className='w-full flex flex-col h-full px-3 py-5 overflow-hidden overflow-y-scroll no-scrollbar gap-5'>
                            {projectData &&
                              projectData.data.chat_logs.map((item, idx) => (
                                <div key={idx} className='flex gap-2 w-full'>
                                  {
                                    {
                                      assistant: (
                                        <div className='w-12 h-12 rounded-xl shadow-lg flex items-center justify-center bg-gray-700'>
                                          {/* @ts-ignore */}
                                          <lord-icon
                                            src='https://cdn.lordicon.com/zorvjzqh.json'
                                            trigger='loop'
                                            colors='primary:#ffffff,secondary:#6d28d9'
                                            style={{
                                              width: '40px',
                                              height: '40px',
                                            }}
                                          />
                                        </div>
                                      ),
                                      user: (
                                        <div className='p-1 w-max h-max rounded-xl flex items-center justify-center  relative'>
                                          <Image
                                            src={user.image}
                                            alt='user-image'
                                            className='rounded-xl shadow-lg'
                                            width={45}
                                            height={45}
                                          />
                                        </div>
                                      ),
                                    }[item.role]
                                  }
                                  {item.role !== 'system' && (
                                    <div
                                      className={classNames(
                                        'prose prose-sm xl:prose-lg max-w-none text-white-off/70 w-full  px-2 lg:px-4 py-5 rounded-lg shadow-lg prose-h1:text-white-main prose-h1:text-xl prose-h2:text-lg text-sm prose-h2:text-white-main prose-h3:text-base prose-h3:text-white-main prose-strong:text-white-main',
                                        item.role !== 'user'
                                          ? 'bg-gray-700'
                                          : 'bg-white-main/10'
                                      )}
                                    >
                                      {parse(item.content)}
                                    </div>
                                  )}
                                </div>
                              ))}

                            {/* {!loading && (
                              <div className='prose w-full text-white-main'>
                                {response && parse(response)}
                              </div>
                            )} */}
                          </span>
                        ) : (
                          <>
                            <p className='text-white-off text-lg'>
                              User needs to be logged in!
                            </p>
                            <button className='' onClick={() => refetch()}>
                              Connect to chat
                            </button>
                          </>
                        )}
                      </div>
                    </div>
                    {/* -- input area */}
                    <div className='w-full px-2 lg:px-12 py-3 pb-5 flex items-center justify-center absolute bottom-0'>
                      {projectData && projectData.data.chat_logs.length > 2 ? (
                        <>
                          <textarea
                            placeholder='Talk to your data...'
                            className='bg-gray-700 focus:outline-none focus:ring-0 text-white-off py- text-sm pl-3 pr-5 placeholder-gray-300 focus:border-violet-main rounded-md shadow-lg w-full h-max'
                            value={prompt}
                            ref={promptInputRef}
                            onChange={(e) => setPrompt(e.target.value)}
                          />
                          <span
                            className='absolute right-3 lg:right-14 text-white-off shadow bg-violet-main px-2 py-1 flex items-center justify-center transition-all duration-300 ease-out hover:shadow-lg hover:bg-green-main rounded-md cursor-pointer'
                            onClick={() => {
                              setMessages((state) => [
                                ...state,
                                {
                                  role: 'user',
                                  content: prompt,
                                },
                              ]);
                              setPrompt(() => '');
                            }}
                          >
                            <PaperAirplaneIcon className='w-4 h-5' />
                          </span>
                        </>
                      ) : data ? (
                        <button
                          onClick={() => openAICall()}
                          className='py-2 w-full rounded-lg shadow-lg mx-auto bg-violet-main text-white-main hover:bg-green-main transition-all ease-out duration-300'
                        >
                          Start Instance
                        </button>
                      ) : (
                        <p className='w-full py-2 border rounded-lg text-lg border-dashed border-red-main text-red-main  flex items-center justify-center'>
                          No data
                        </p>
                      )}
                    </div>
                  </div>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
