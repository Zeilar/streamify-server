import {
    Button,
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
                    <ModalHeader>
                        <Text
                            as="h4"
                            textAlign="center"
                            textStyle="h4"
                            textTransform="capitalize"
                        >
                            {activeTab}
                        </Text>
                    </ModalHeader>
                    <ModalBody overflowX="hidden" p={0}>
                        {activeTab === "login" && (
                            <LoginForm flip={() => setActiveTab("register")} />
                        )}
                        {activeTab === "register" && (
                            <RegisterForm flip={() => setActiveTab("login")} />
                        )}
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
