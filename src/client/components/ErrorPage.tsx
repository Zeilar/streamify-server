import { Flex, Text, Divider } from "@chakra-ui/react";

interface Props {
    code: number;
    message: string;
}

export default function ErrorPage({ code, message }: Props) {
    return (
        <Flex flexGrow={1} alignItems="center" justifyContent="center">
            <Flex h="5rem" alignItems="center">
                <Text textStyle="h3" as="h3">
                    {code}
                </Text>
                <Divider
                    orientation="vertical"
                    mx="1rem"
                    borderWidth="1px"
                    borderColor="primary.500"
                />
                <Text textStyle="h3">{message}</Text>
            </Flex>
        </Flex>
    );
}
