import React, { ReactNode, createContext, useContext, useState } from "react"

const StoreContext = createContext<any>(null)

export const StoreProvider = ({ children }: { children: ReactNode }) => {
    const { Provider } = StoreContext
    const [loading, setLoading] = useState<boolean>(true);
    const [select, setSelect] = useState<boolean>(false);
    const [selectList, setSelectList] = useState<any[]>([]);
    const [doneList, setDoneList] = useState<any[]>([]);

    return (
        <Provider value={{ loading, setLoading, select, setSelect, selectList, setSelectList, doneList, setDoneList }}>
            {children}
        </Provider>
    )
}

export const useStoreContext = () => {
    return useContext(StoreContext);
};
