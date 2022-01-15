import {
    Alert,
    AlertDescription,
    AlertIcon,
    AlertTitle,
    Button,
} from "@chakra-ui/react";

interface Props {
    onClick(): void;
}

export default function ConversionSuccessful({ onClick }: Props) {
    return (
        <Alert
            status="success"
            flexDirection="column"
            textAlign="center"
            colorScheme="primary"
            py="2rem"
            rounded="md"
        >
            <AlertIcon color="primary.500" boxSize="2rem" mr={0} />
            <AlertTitle my="1rem" textStyle="h5">
                File converted!
            </AlertTitle>
            <AlertDescription maxWidth="sm">
                If there is a problem with the converted file, please contact me
                and let me know.
            </AlertDescription>
            <Button mt="1rem" onClick={onClick}>
                Convert another
            </Button>
        </Alert>
    );
}
