import { Transition } from '@headlessui/react';
import React, { ReactNode } from 'react'

interface Props {
    show?: boolean,
    onClose: any,
    transparent?: boolean,
    content?: ReactNode,
    messages?: any
}

const MyModal: React.FC<Props> = ({ show, onClose, transparent, content, messages }) => {
    const contentBg = transparent ? "" : "bg-white shadow-xl";
    const width = content ? "w-fit" : "w-full";

    return (
        show ?
            <Transition
                appear
                show={show}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className='fixed bg-black bg-opacity-40 z-10 min-h-full inset-0 flex items-center justify-center text-center' >
                    <div
                        className={
                            width +
                            " max-w-md transform overflow-hidden rounded-2xl " +
                            contentBg +
                            " p-6 mx-4 text-left align-middle transition-all"
                        }>
                        {/* <h3 className="text-lg font-medium leading-6 text-gray-900">Title</h3>
                        <p className="mt-2 text-sm text-gray-500">content</p> */}
                        {messages?.title && (
                            <h3 className="text-lg font-medium leading-6 text-gray-900">{messages?.title}</h3>
                        )}
                        {messages?.content && (
                            <p className="mt-2 text-sm text-gray-500">{messages?.content}</p>
                        )}
                        {content}
                        {messages?.result && <button
                            type='button'
                            onClick={onClose}
                            className="mt-4 inline-flex justify-center rounded-md border border-transparent bg-blue-100 px-4 py-2 text-sm font-medium text-blue-900 hover:bg-blue-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
                        >
                            {messages?.result}
                        </button>}
                    </div>
                </div>
            </Transition> : null
    );
}

export default MyModal