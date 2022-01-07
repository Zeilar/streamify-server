import {
    Box,
    Button,
    Flex,
    FormControl,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../FormError";
import Icon from "../Icon";

interface Fields {
    email: string;
    password: string;
}

interface Props {
    flip(): void;
}

export default function LoginForm({ flip }: Props) {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();

    async function onSubmit(fields: Fields) {
        await auth.login(fields);
    }

    return (
        <Box p="1.5rem" pt={0} as="form" onSubmit={handleSubmit(onSubmit)}>
            <Flex mb="1rem">
                <Button
                    variant="unstyled"
                    onClick={flip}
                    ml="auto"
                    display="flex"
                >
                    Register
                    <Icon icon="mdiChevronRight" w="1.25rem" h="1.25rem" />
                </Button>
            </Flex>
            <FormControl isInvalid={Boolean(errors.email)} mb="1.5rem">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    type="email"
                    autoFocus
                    {...register("email", { required: "Email is required" })}
                />
                {errors.email && <FormError message={errors.email.message} />}
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)} mb="1.5rem">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                    type="password"
                    id="password"
                    placeholder="••••••••••"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                {errors.password && (
                    <FormError message={errors.password.message} />
                )}
            </FormControl>
            <Button isLoading={isSubmitting} type="submit">
                Login
            </Button>
        </Box>
    );
}
