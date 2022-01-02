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

export default function LoginForm() {
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
        <Box p="1.5rem" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.email)} mb="1rem">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    id="email"
                    placeholder="john.doe@example.com"
                    type="email"
                    autoFocus
                    {...register("email", { required: "Email is required" })}
                />
                <FormErrorMessage>
                    {errors.email && errors.email.message}
                </FormErrorMessage>
            </FormControl>
            <FormControl isInvalid={Boolean(errors.password)} mb="1rem">
                <FormLabel htmlFor="password">Password</FormLabel>
                <Input
                    type="password"
                    id="password"
                    placeholder="••••••••••"
                    {...register("password", {
                        required: "Password is required",
                    })}
                />
                <FormErrorMessage>
                    {errors.password && errors.password.message}
                </FormErrorMessage>
            </FormControl>
            <Button isLoading={isSubmitting} type="submit">
                Login
            </Button>
        </Box>
    );
}
