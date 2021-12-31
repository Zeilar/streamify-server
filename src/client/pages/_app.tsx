import { ChakraProvider, CSSReset, Flex } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/index";
import { DependencyContextProvider } from "../contexts/DependencyContext";
import { AuthContextProvider } from "../contexts/AuthContext";
import Navbar from "../components/Navbar";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <CSSReset />
            <DependencyContextProvider>
                <AuthContextProvider>
                    <Flex flexDir="column" w="65rem">
                        <Navbar />
                        <Component {...pageProps} />
                    </Flex>
                </AuthContextProvider>
            </DependencyContextProvider>
        </ChakraProvider>
    );
}
