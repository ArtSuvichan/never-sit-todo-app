import React, { ReactNode, createContext, useContext, useEffect, useState } from "react"

import { useRouter } from "next/router"

const AuthContext = createContext<any>(null)

export const AuthProvider = ({ children }: { children: ReactNode }) => {
    const { Provider } = AuthContext
    const router = useRouter();
    const [token, setToken] = useState<string>('');

    useEffect(() => {
        const isAuthenticated = localStorage.getItem('session');
        if (!isAuthenticated) {
            router.push('/login-page');
        } else {
            setTokenSession(isAuthenticated)
        }
    }, []);

    const setTokenSession = async (isAuthenticated) => {
        await setToken(isAuthenticated)
        await router.push('/main-page')
    }

    return (
        <Provider value={{ token, setToken }}>
            {children}
        </Provider>
    )
}

export const useMyContext = () => {
    return useContext(AuthContext);
};
