import {
    Box,
    Button,
    Divider,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    Text,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";
import Tab from "./Tab";
import RegisterForm from "./RegisterForm";
import LoginForm from "./LoginForm";

type Tab = "login" | "register";

export default function AuthModal() {
    const state = useDisclosure();
    const [activeTab, setActiveTab] = useState<Tab>("register");

    function openModal(tab: Tab) {
        setActiveTab(tab);
        state.onOpen();
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
                    <ModalHeader mb="1rem">
                        <Text textAlign="center" textStyle="h4">
                            Authentication
                        </Text>
                    </ModalHeader>
                    <ModalBody overflowX="hidden" p={0}>
                        <Flex
                            justifyContent="space-evenly"
                            h="2rem"
                            mb="1rem"
                            alignItems="center"
                        >
                            <Tab
                                onClick={() => openModal("login")}
                                active={activeTab === "login"}
                            >
                                Login
                            </Tab>
                            <Divider orientation="vertical" />
                            <Tab
                                onClick={() => openModal("register")}
                                active={activeTab === "register"}
                            >
                                Register
                            </Tab>
                        </Flex>
                        <Box
                            pos="relative"
                            transition="transform 0.15s ease-in-out"
                            transform={`translateX(${
                                activeTab === "register" ? "100%" : 0
                            })`}
                        >
                            <LoginForm />
                            <RegisterForm />
                        </Box>
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
