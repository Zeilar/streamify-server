import {
    Box,
    Button,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
} from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";

interface Fields {
    email: string;
    password: string;
}

export default function RegisterForm() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();

    async function onSubmit(fields: Fields) {
        await auth.register(fields);
    }

    return (
        <Box
            pos="absolute"
            left="-100%"
            top={0}
            p="1.5rem"
            as="form"
            w="100%"
            onSubmit={handleSubmit(onSubmit)}
        >
            <FormControl isInvalid={Boolean(errors.email)} mb="1rem">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    placeholder="email"
                    {...register("email", {
                        required: "Email is required",
                        minLength: {
                            value: 3,
                            message: "Minimum length is 3 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "Maximum length is 50 characters",
                        },
                    })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)}>
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                    type="password"
                    id="password"
                    placeholder="password"
                    {...register("password", {
                        required: "Password is required",
                        minLength: {
                            value: 6,
                            message: "Minimum length is 6 characters",
                        },
                        maxLength: {
                            value: 50,
                            message: "Maximum length is 50 characters",
                        },
                    })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button mt="2rem" isLoading={isSubmitting} type="submit">
                Register
            </Button>
        </Box>
    );
}
