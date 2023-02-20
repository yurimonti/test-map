import React from 'react'
import MyModal from './MyModal';
import LoadIcon from './LoadIcon';
import { Transition } from '@headlessui/react';

interface Props { isLoading?: boolean }

const LoadingComponent: React.FC = () => {

    return (
            <Transition
                appear
                show={true}
                enter="ease-out duration-300"
                enterFrom="opacity-0"
                enterTo="opacity-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100"
                leaveTo="opacity-0"
            >
                <div className='fixed bg-black bg-opacity-40 z-10 min-h-full inset-0 flex items-center justify-center text-center' >
                    <div className="w-fit max-w-md transform overflow-hidden rounded-2xl p-6 text-left align-middle transition-all">
                        <>
                            <LoadIcon />
                            <p className="pt-2 text-xl text-center">Caricamento...</p>
                        </>
                    </div>
                </div>
            </Transition>
    );
    /* return (
        <MyModal
            transparent
            show={isLoading}
            onClose={onClose}
            content={
                <>
                    <LoadIcon />
                    <p className="pt-2 text-xl text-center">Caricamento...</p>
                </>
            }
        />
    ); */
}

export default LoadingComponent