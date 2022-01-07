import {
    FormErrorMessage,
    FormErrorMessageProps,
    Text,
} from "@chakra-ui/react";
import Icon from "./Icon";

interface Props extends FormErrorMessageProps {
    message: string;
}

export default function FormError({ message, ...props }: Props) {
    return (
        <FormErrorMessage {...props}>
            <Icon icon="mdiAlertCircle" mr="0.25rem" w="1.25rem" h="1.25rem" />
            <Text>{message}</Text>
        </FormErrorMessage>
    );
}
