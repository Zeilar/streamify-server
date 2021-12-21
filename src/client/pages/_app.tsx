import { ChakraProvider, Flex } from "@chakra-ui/react";
import { AppProps } from "next/app";
import theme from "../theme/index";

export default function App({ Component, pageProps }: AppProps) {
    return (
        <ChakraProvider theme={theme}>
            <Flex justifyContent="center">
                <Flex flexDir="column" w="65rem">
                    <Component {...pageProps} />
                </Flex>
            </Flex>
        </ChakraProvider>
    );
}
