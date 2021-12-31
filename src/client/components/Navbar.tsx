import { Flex } from "@chakra-ui/react";
import NavLink from "./NavLink";

export default function Navbar() {
    return (
        <Flex as="nav">
            <Flex gridGap="1rem">
                <NavLink textStyle="h4" href="/">
                    mp4
                </NavLink>
                <NavLink textStyle="h4" href="/browse">
                    Browse
                </NavLink>
            </Flex>
            <Flex ml="auto" gridGap="1rem">
                Open Register
            </Flex>
        </Flex>
    );
}
