import { Fragment } from 'react';
import { useRouter } from 'next/navigation';
import { classNames } from '@/utils/classnames';
import { Transition, Dialog } from '@headlessui/react';
import Link from 'next/link';

type FeaturePopupProps = {
  state: boolean;
  setState: React.Dispatch<React.SetStateAction<Boolean>>;
  content: {
    icon: string | null;
    title: string;
    body: string;
    bg: string | null;
    btnText: string;
    btnLink: string;
  };
};

export default function FeaturePopup({
  state,
  setState,
  content = {
    icon: null,
    title: '',
    body: '',
    bg: null,
    btnText: '',
    btnLink: '/',
  },
}: FeaturePopupProps) {
  const router = useRouter();

  return (
    <Transition.Root show={state} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={setState}>
        <Transition.Child
          as={Fragment}
          enter='ease-out duration-300'
          enterFrom='opacity-0 -left-[300px]'
          enterTo='opacity-100 left-0'
          leave='ease-in duration-300'
          leaveFrom='opacity-100 left-0'
          leaveTo='opacity-0 left-[300px]'
        >
          <div className='fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity' />
        </Transition.Child>

        <div className='fixed inset-0 z-10 overflow-y-auto'>
          <div className='flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0'>
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-300'
              enterFrom='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
              enterTo='opacity-100 translate-y-0 sm:scale-100'
              leave='ease-in duration-200'
              leaveFrom='opacity-100 translate-y-0 sm:scale-100'
              leaveTo='opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95'
            >
              <Dialog.Panel className='relative transform overflow-hidden rounded-lg bg-white-main px-4 pt-5 pb-4 text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-sm sm:p-6'>
                <div className='flex flex-col items-center justify-center'>
                  {/* @ts-ignore */}
                  <lord-icon
                    src={content.icon}
                    trigger='loop'
                    delay='1000'
                    colors='primary:#121331,secondary:#6d28d9'
                    style={{ width: '70px', height: '70px' }}
                  />
                  <div className='mt-3 text-center sm:mt-5'>
                    <Dialog.Title
                      as='h3'
                      className='text-xl font-medium leading-6 text-text-light font-black-ops'
                    >
                      {content.title}
                    </Dialog.Title>
                    <div className='mt-2'>
                      <p className='text-sm text-gray-500'>{content.body}</p>
                    </div>
                  </div>
                </div>
                <div className='mt-5 sm:mt-6'>
                  {content.btnLink ? (
                    <Link
                      type='button'
                      className={classNames(
                        content.bg,
                        'w-full py-1.5 duration-300 hover:shadow-lg rounded-md shadow-md text-white-off flex items-center justify-center'
                      )}
                      onClick={() => setState(false)}
                      href={content.btnLink}
                      target='_blank'
                    >
                      {content.btnText}
                    </Link>
                  ) : (
                    <button
                      type='button'
                      className={classNames(
                        content.bg,
                        'w-full py-1.5 duration-300 hover:shadow-lg rounded-md shadow-md text-white-off'
                      )}
                      onClick={() => setState(false)}
                    >
                      {content.btnText}
                    </button>
                  )}
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition.Root>
  );
}
