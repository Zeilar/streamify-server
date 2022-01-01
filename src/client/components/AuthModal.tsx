import {
    Button,
    Flex,
    Modal,
    ModalBody,
    ModalCloseButton,
    ModalContent,
    ModalHeader,
    ModalOverlay,
    useDisclosure,
} from "@chakra-ui/react";
import { useState } from "react";

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
                    <ModalHeader>Header</ModalHeader>
                    <ModalBody>Body</ModalBody>
                </ModalContent>
            </Modal>
            <Flex ml="auto" gridGap="1rem">
                <Button variant="secondary" onClick={() => openModal("login")}>
                    Login
                </Button>
                <Button variant="primary" onClick={() => openModal("register")}>
                    Register
                </Button>
            </Flex>
        </>
    );
}
