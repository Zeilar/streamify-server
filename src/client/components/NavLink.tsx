import { Link, LinkProps } from "@chakra-ui/react";
import NextLink from "next/link";
import { useRouter } from "next/router";

interface Props extends LinkProps {
    href: string;
    children: React.ReactNode;
}

export default function Logo({ href, children, ...props }: Props) {
    const router = useRouter();
    const active = href === router.pathname;
    return (
        <NextLink href={href} passHref>
            <Link
                py="0.25rem"
                px="1rem"
                pos="relative"
                rounded="md"
                transition="none"
                fontSize="1.25rem"
                fontWeight={500}
                bgColor={active ? "primary.500" : undefined}
                color={active ? "black" : "text.default"}
                userSelect="none"
                _hover={{
                    textDecor: "none",
                    color: !active ? "primary.500" : undefined,
                }}
                {...props}
            >
                {children}
            </Link>
        </NextLink>
    );
}
