import { Flex, Text, Divider } from "@chakra-ui/react";
import Head from "next/head";

interface Props {
    code: number;
    message: string;
}

export default function ErrorPage({ code, message }: Props) {
    return (
        <Flex flexGrow={1} alignItems="center" justifyContent="center">
            <Head>
                <title>mp4 | {code}</title>
            </Head>
            <Flex h="4rem" alignItems="center">
                <Text textStyle="h3" as="h3">
                    {code}
                </Text>
                <Divider orientation="vertical" mx="1.5rem" />
                <Text textStyle="h5">{message}</Text>
            </Flex>
        </Flex>
    );
}
