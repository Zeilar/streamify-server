import { Flex } from "@chakra-ui/react";
import NavLink from "./NavLink";
import AuthModal from "./AuthModal";

export default function Navbar() {
    return (
        <Flex as="nav" py="1rem">
            <Flex gridGap="1rem">
                <NavLink href="/">mp4</NavLink>
                <NavLink href="/browse">Browse</NavLink>
            </Flex>
            <Flex ml="auto" gridGap="1rem">
                <AuthModal />
            </Flex>
        </Flex>
    );
}
