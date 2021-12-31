import {
    Button,
    Modal,
    ModalBody,
    ModalContent,
    ModalHeader,
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
            <Modal isOpen={state.isOpen} onClose={state.onClose}>
                <ModalContent>
                    <ModalHeader>Header</ModalHeader>
                    <ModalBody>Body</ModalBody>
                </ModalContent>
            </Modal>
            <Button variant="unstyled" onClick={() => openModal("login")}>
                Login
            </Button>
            <Button variant="unstyled" onClick={() => openModal("register")}>
                Register
            </Button>
        </>
    );
}
