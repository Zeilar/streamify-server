import { Flex, Link } from "@chakra-ui/react";
import NavLink from "./NavLink";
import AuthModal from "./AuthModal";
import NextLink from "next/link";

export default function Navbar() {
    return (
        <Flex as="nav" py="1rem" alignItems="center">
            <Flex gridGap="1rem" alignItems="center">
                <NextLink passHref href="/">
                    <Link
                        textStyle="h3"
                        color="primary.500"
                        _hover={{ textDecor: "none" }}
                        mr="1rem"
                    >
                        MP4
                    </Link>
                </NextLink>
                <NavLink href="/browse">Browse</NavLink>
            </Flex>
            <AuthModal />
        </Flex>
    );
}
