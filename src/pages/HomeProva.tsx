import { IonContent, IonHeader, IonPage, IonTitle, IonToolbar, IonButton } from '@ionic/react';
import React from 'react'
import { Link } from 'react-router-dom';
import { NavigateProps } from '../utility/types';
import MyHeader from '../components/MyHeader'


const HomeProva: React.FC<NavigateProps> = ({ history, match }) => {
    return (
        <MyHeader title='Home'>
                <div /* className="relative bg-white overflow-hidden" */>
                    <div /* className="max-w-7xl mx-auto" */>
                        <div /* className="relative z-10 pb-8 bg-white sm:pb-16 md:pb-20 lg:max-w-2xl lg:w-full lg:pb-28 xl:pb-32" */>
                            {/* <svg
                                className="hidden lg:block absolute right-0 inset-y-0 h-full w-48 text-white transform translate-x-1/2"
                                fill="currentColor"
                                viewBox="0 0 100 100"
                                preserveAspectRatio="none"
                                aria-hidden="true"
                            >
                                <polygon points="50,0 100,0 50,100 0,100" />
                            </svg> */}
                            <main className="mt-10 mx-auto max-w-7xl px-4 sm:mt-12 sm:px-6 md:mt-16 lg:mt-20 lg:px-8 xl:mt-28">
                                <div className="sm:text-center lg:text-left">
                                    <h1 className=" mb-4 text-4xl tracking-tight font-extrabold text-gray-900 sm:text-5xl md:text-6xl">
                                        <span className="text-shadow-black block">
                                            EPPOI{" "}
                                        </span>{" "}
                                        <span className="text-shadow-indigo block text-indigo-600">
                                            Scopri la bellezza dell'entroterra
                                        </span>
                                    </h1>
                                    <span className="mt-3 text-base text-gray-500 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0">
                                        <p className="inline text-indigo-600 font-semibold">
                                            Crea, segui e condividi
                                        </p>{" "}
                                        percorsi nelle piccole realtà dell'entroterra
                                    </span>
                                    <div className="mt-5 sm:mt-8 sm:flex sm:justify-center lg:justify-start">
                                        <div>
                                            <IonButton onClick={(e) => {
                                                e.preventDefault();
                                                history.push("/login");
                                            }}>
                                                Sign In
                                            </IonButton>
                                        </div>
                                    </div>
                                </div>
                            </main>
                        </div>
                    </div>
                    {/* <div className="lg:absolute lg:inset-y-0 lg:right-0 lg:w-1/2">
                        <img
                            className="h-56 w-full object-cover sm:h-72 md:h-96 lg:w-full lg:h-full"
                            src="home_background.jpg"
                            alt=""
                        />
                    </div> */}
                </div>
            </MyHeader>
    );
}
export default HomeProva;