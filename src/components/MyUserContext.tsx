import React, { ReactNode, createContext, useState } from 'react';
import { getUsernameFromJwt, getRoleFromJwt } from '../api/jwtDecoder';

interface UserInfo {
    isAuth: boolean,
    username: string | undefined | null,
    role: string | undefined | null,
};

interface UserInfoContextType {
    userInfo: UserInfo,
    setUserInfo: (token: string | null) => void
};


interface Props {
    children?: ReactNode
}

let token = localStorage.getItem("access_token");

const defaultInfo: UserInfo = token!==null ? { isAuth: true, username: getUsernameFromJwt(token), role: getRoleFromJwt(token) } : { isAuth: false, username: "", role: "" };

export const UserContext = createContext<UserInfoContextType>({
    userInfo:{ isAuth: false, username: "", role: "" },
    setUserInfo: () => { }
});

export const MyUserContext: React.FC<Props> = ({ children }) => {
    const [userInfo, setUserInfo] = useState<UserInfo>(defaultInfo);
/*     useEffect(() => {
      setInfo(token);
    }, [token]) */
    

    function setInfo(token:string | null) {
        if (token!==null) {
            setUserInfo({ isAuth: true, username: getUsernameFromJwt(token), role: getRoleFromJwt(token) });
        } else setUserInfo({ isAuth: false, username: "", role: "" });
        /* console.log(userInfo); */
    }
    return (
        <UserContext.Provider value={{ userInfo: userInfo, setUserInfo: setInfo }}>
            {children}
        </UserContext.Provider>
    )
}