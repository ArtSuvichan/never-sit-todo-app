import "bootstrap/dist/css/bootstrap.min.css";
import '../styles/global.css'
import type { AppProps } from 'next/app'
import { AuthProvider } from '../components/helper/AuthProvider';
import { useEffect } from "react";
import Layout from "../components/layout";
import { StoreProvider } from "../components/helper/StoreProvider";
import 'bootstrap-icons/font/bootstrap-icons.css';

function MyApp({ Component, pageProps }: AppProps) {
    useEffect(() => {
        import("bootstrap/dist/js/bootstrap");
    }, []);

    return (
        <AuthProvider>
            <StoreProvider>
                <Layout>
                    <Component {...pageProps} />
                </Layout>
            </StoreProvider>
        </AuthProvider>
    )
}
export default MyApp