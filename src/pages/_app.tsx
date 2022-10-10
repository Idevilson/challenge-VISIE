import '../styles/globals.scss'
import type {AppProps} from 'next/app'
import {DevSupport} from "@react-buddy/ide-toolbox";
import {ComponentPreviews, useInitial} from "../dev";
import { ProductsProvider } from "../hooks/useProducts";


function MyApp({Component, pageProps}: AppProps) {
    return (
        <>
            <DevSupport ComponentPreviews={ComponentPreviews}
                        useInitialHook={useInitial}
            >   
                <ProductsProvider>
                    <Component {...pageProps} />
                </ProductsProvider>
            </DevSupport>
        </>
    )

}

export default MyApp
