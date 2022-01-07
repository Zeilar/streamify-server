import { Box, Button, FormControl, FormLabel, Input } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { useAuth } from "../../hooks";
import FormError from "../FormError";

interface Fields {
    email: string;
    password: string;
    passwordConfirmation: string;
}

export default function RegisterForm() {
    const auth = useAuth();
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
        getValues,
    } = useForm<Fields>();

    async function onSubmit({ email, password }: Fields) {
        await auth.register({ email, password });
    }

    return (
        <Box p="1.5rem" as="form" onSubmit={handleSubmit(onSubmit)}>
            <FormControl isInvalid={Boolean(errors.email)} mb="1.5rem">
                <FormLabel htmlFor="email">Email</FormLabel>
                <Input
                    autoFocus
                    id="email"
                    placeholder="john.doe@example.com"
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
                {errors.password && (
                    <FormError message={errors.password.message} />
                )}
            </FormControl>
            <FormControl
                isInvalid={Boolean(errors.passwordConfirmation)}
                mb="1.5rem"
            >
                <FormLabel htmlFor="password">Confirm Password</FormLabel>
                <Input
                    type="password"
                    id="password"
                    placeholder="••••••••••"
                    {...register("passwordConfirmation", {
                        required: "Password confirmation is required",
                        validate: (value) =>
                            value === getValues().password
                                ? true
                                : "Passwords do not match",
                    })}
                />
                {errors.passwordConfirmation && (
                    <FormError message={errors.passwordConfirmation.message} />
                )}
            </FormControl>
            <Button isLoading={isSubmitting} type="submit">
                Register
            </Button>
        </Box>
    );
}
