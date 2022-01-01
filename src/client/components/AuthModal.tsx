import {
    Button,
    Flex,
    FormControl,
    FormErrorMessage,
    FormLabel,
    Input,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { useAuth } from "../hooks";

type Tab = "login" | "register";

interface Fields {
    email: string;
    password: string;
}

export default function AuthModal() {
    const state = useDisclosure();
    const auth = useAuth();
    const [activeTab, setActiveTab] = useState<Tab>("register");
    const {
        handleSubmit,
        register,
        formState: { errors, isSubmitting },
    } = useForm<Fields>();

    function openModal(tab: Tab) {
        setActiveTab(tab);
        state.onOpen();
    }

    async function onSubmit(fields: Fields) {
        await auth.register(fields);
    }

    return (
        <>
            <Modal
                isOpen={state.isOpen}
                onClose={state.onClose}
                blockScrollOnMount
            >
                <ModalOverlay />
                <ModalContent>
                    <ModalCloseButton />
                    <ModalHeader>Header</ModalHeader>
                    <ModalBody as="form" onSubmit={handleSubmit(onSubmit)}>
                        <FormControl isInvalid={Boolean(errors.email)}>
                            <FormLabel htmlFor="email">Email</FormLabel>
                            <Input
                                id="email"
                                placeholder="email"
                                {...register("email", {
                                    required: "Email is required",
                                    minLength: {
                                        value: 3,
                                        message:
                                            "Minimum length is 3 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Maximum length is 50 characters",
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
                                        message:
                                            "Minimum length is 6 characters",
                                    },
                                    maxLength: {
                                        value: 50,
                                        message:
                                            "Maximum length is 50 characters",
                                    },
                                })}
                            />
                            <FormErrorMessage>
                                {errors.password && errors.password.message}
                            </FormErrorMessage>
                        </FormControl>
                        <Button
                            mt={4}
                            colorScheme="teal"
                            isLoading={isSubmitting}
                            type="submit"
                        >
                            Submit
                        </Button>
                    </ModalBody>
                </ModalContent>
            </Modal>
            <Button variant="secondary" onClick={() => openModal("login")}>
                Login
            </Button>
            <Button variant="primary" onClick={() => openModal("register")}>
                Register
            </Button>
        </>
    );
}
