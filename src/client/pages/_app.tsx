import { ChakraProvider, Flex } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/index";
import { DependencyContextProvider } from "../contexts/DependencyContext";
import { AuthContextProvider } from "../contexts/AuthContext";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <DependencyContextProvider>
                <AuthContextProvider>
                    <Flex justifyContent="center">
                        <Flex flexDir="column" w="65rem">
                            <Component {...pageProps} />
                        </Flex>
                    </Flex>
                </AuthContextProvider>
            </DependencyContextProvider>
        </ChakraProvider>
    );
}
