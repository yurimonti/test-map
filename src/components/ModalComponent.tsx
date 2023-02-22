import { Transition } from '@headlessui/react'
import { IonIcon } from '@ionic/react'
import { backspaceOutline, checkmarkCircle, clipboardOutline, closeCircle, locationSharp } from 'ionicons/icons'
import { FC, Fragment, ReactNode } from 'react'
import './icon.css';

interface Props {
    title: string,
    children: ReactNode,
    open: boolean,
    accept?: any,
    deny?: any,
    onClose: any,
    modify?: any
}

const ModalComponent: FC<Props> = ({
    title,
    children,
    open,
    deny,
    accept,
    onClose,
    modify
}) => {
    return (
        <Transition.Root show={open} as={Fragment}>
            <div className="absolute z-10">
                <Transition.Child
                    as={Fragment}
                    enter="ease-out duration-300"
                    enterFrom="opacity-0"
                    enterTo="opacity-100"
                    leave="ease-in duration-200"
                    leaveFrom="opacity-100"
                    leaveTo="opacity-0"
                >
                    <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
                </Transition.Child>

                <div className="fixed z-10 inset-0 overflow-y-auto">
                    <div className="flex items-end justify-center min-h-full pb-6 text-center ">
                        <Transition.Child
                            as={Fragment}
                            enter="ease-out duration-300"
                            enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                            enterTo="opacity-100 translate-y-0 sm:scale-100"
                            leave="ease-in duration-200"
                            leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                            leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        >
                            <div className="relative bg-white rounded-lg text-left overflow-hidden shadow-xl transform transition-all w-full mx-8">
                                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                                    <div>
                                        <div className="mx-auto flex-shrink-0 flex items-center justify-center h-12 w-12 rounded-full bg-sky-100 sm:mx-0 sm:h-10 sm:w-10">
                                            <IonIcon icon={locationSharp} color='primary' size='large' className='align-middle my-auto' />
                                        </div>
                                        <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                                            <h3 className="text-lg leading-6 font-sans text-gray-900">
                                                {title}
                                            </h3>
                                            <div className="mt-2">{children}</div>
                                        </div>
                                    </div>
                                </div>
                                <div className="bg-gray-50 px-4 py-3 flex justify-evenly ">
                                    {deny && <button
                                        type="button"
                                        className="inline-flex justify-center rounded-xl ring-2 ring-red-400 shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-white"
                                        onClick={deny.action}
                                        title={deny.title}
                                    >
                                        <IonIcon icon={closeCircle} size='large' className='icon icon-false' />
                                    </button>}
                                    {accept && <button
                                        type="button"
                                        className="inline-flex justify-center rounded-xl ring-2 ring-green-600 shadow-sm py-2 px-4 bg-white-600 text-base font-medium text-white"
                                        onClick={accept.action}
                                        title={accept.title}
                                    >
                                        <IonIcon icon={checkmarkCircle} size='large' className='icon icon-true' />
                                    </button>}
                                    {modify && (
                                        <button
                                            type="button"
                                            className="inline-flex justify-center rounded-xl ring-2 ring-yellow-400 shadow-sm px-4 py-2 bg-white-600 text-base font-medium text-white"
                                            onClick={modify.action}
                                            title={modify.title}
                                        >
                                            <IonIcon icon={clipboardOutline} color='warning' size='large' className='align-middle my-auto' />
                                        </button>
                                    )}
                                    <button
                                        type="button"
                                        className="inline-flex justify-center rounded-xl ring-2 ring-blue-500 shadow-sm py-2 px-4 bg-white-600 text-base font-medium text-white"
                                        onClick={onClose}
                                    >
                                        <IonIcon icon={backspaceOutline} color='secondary' size='large' className='align-middle my-auto' />
                                    </button>
                                </div>
                            </div>
                        </Transition.Child>
                    </div>
                </div>
            </div>
        </Transition.Root>
    )
}

export default ModalComponent