import { IonBackButton, IonButton, IonButtons, IonContent, IonHeader, IonIcon, IonItem, IonLabel, IonPage, IonTitle, IonToolbar } from '@ionic/react'
import { logoutUser } from '../api/touristApi';
import React, { ReactNode, useContext, useEffect, useState } from 'react'
import { logOut, logIn } from 'ionicons/icons';
import { useHistory } from 'react-router-dom'
import { UserContext } from './MyUserContext';
import { RouteComponentProps } from 'react-router';
import { NavigateProps } from '../utility/types';
import { makePublicRequest } from '../api/capacitorApi';
import LoadingComponent from './LoadingComponent';

interface Props {
    children?: ReactNode,
    backButton?: boolean,
    title?: string,
}

/* interface Props {
    children?: ReactNode,
    backButton?:boolean,
    title?:string,
} */

const MyHeader: React.FC<Props> = ({ children, backButton, title }) => {
    const navigate = useHistory();
    const userContext = useContext(UserContext);
    const [isLoading, setIsLoading] = useState<boolean>(false)

    const logout = async () => {
        setIsLoading(true);
        try {
            const res = await logoutUser({ refresh_token: localStorage.getItem("refresh_token") });
            console.log(res);
            localStorage.clear();
            userContext.setUserInfo(null);
            navigate.replace('/login');
        } catch (error) {
            console.log(error)
        } finally {
            setIsLoading(false);
        }
    }

    useEffect(() => {
        userContext.setUserInfo(localStorage.getItem('access_token'));
    }, [localStorage.getItem("access_token")])


    const LogInButton = userContext.userInfo.isAuth ? (
        <button
            type="button"
            onClick={() => {
                //TODO. rivedere per il context
                logout();

                /* logoutUser({ refresh_token: localStorage.getItem("refresh_token") })
                    .then((res) => {
                        console.log(res);
                        localStorage.clear();
                        userContext.setUserInfo(null);
                        navigate.replace('/login');
                    })
                    .catch(err => console.log(err))
                    .finally(() => {
                        setIsLoading(false);
                    }) */
            }}
        >
            {userContext.userInfo.isAuth === true ? userContext.userInfo.username : ""}
            <IonIcon icon={logOut} slot='end' size='large' color='primary' className='align-middle' />
        </button>
    ) : (
        <button
            type="button"
            onClick={() => {
                navigate.replace("/login");
                console.log(userContext.userInfo)
            }}
        >
            <IonIcon icon={logIn} slot='end' size='large' color='primary' className='align-middle' />
        </button>
    );

    return (
        <IonPage>
            <IonHeader>
                <IonToolbar>
                    {backButton && <IonButtons slot="start">
                        <IonBackButton defaultHref="/home" />
                    </IonButtons>}
                    <IonTitle>{title}</IonTitle>
                    <IonButtons slot="end">
                        {LogInButton}
                    </IonButtons>
                </IonToolbar>
            </IonHeader>
            <IonContent fullscreen={true} >
                {isLoading ? <LoadingComponent /> : children}
            </IonContent>
        </IonPage>
    )
}

export default MyHeader