import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../FormError";

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
