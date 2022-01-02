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
import Icon from "../Icon";

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
                    <ModalHeader>
                        <Text textAlign="center" textStyle="h4">
                            Authentication
                        </Text>
                    </ModalHeader>
                    <ModalBody overflowX="hidden" p={0}>
                        <Flex
                            justifyContent="space-evenly"
                            alignItems="center"
                            mx="1.5rem"
                            pos="relative"
                            mb="1rem"
                        >
                            <Tab
                                onClick={() => openModal("login")}
                                active={activeTab === "login"}
                            >
                                <Icon icon="mdiLockOpen" mr="0.5rem" />
                                Login
                            </Tab>
                            <Tab
                                onClick={() => openModal("register")}
                                active={activeTab === "register"}
                            >
                                <Icon icon="mdiAccountPlus" mr="0.5rem" />
                                Register
                            </Tab>
                        </Flex>
                        {activeTab === "login" && <LoginForm />}
                        {activeTab === "register" && <RegisterForm />}
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
