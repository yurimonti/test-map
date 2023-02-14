import React, { ReactNode, createContext, useContext, useState } from 'react';

interface PageInfo {
    title: string,
    backButton: boolean,
    tabStatus: boolean[]
};

interface PageInfoContextType {
    page:PageInfo,
    setPage:(page:PageInfo) => void
};


interface Props {
    children?: ReactNode
}

const defaultPage:PageInfo = {title:'title',backButton:false,tabStatus:[false,false,false]};

export const PageInfoContext = createContext<PageInfoContextType>({
    page:defaultPage,
    setPage:()=>{}
});

export const HeaderProvider: React.FC<Props> = ({children}) => {
    const [pageInfo, setPageInfo] = useState<PageInfo>(defaultPage);

    const updateState = (state:PageInfo)=> {
        setPageInfo(state);
        console.log(pageInfo);
    }
    return (
        <PageInfoContext.Provider value={{page:pageInfo,setPage:updateState}}>
                {children}
        </PageInfoContext.Provider>
    )
}