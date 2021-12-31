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
                color={active ? "primary.500" : undefined}
                py="0.25rem"
                pos="relative"
                _hover={
                    !active
                        ? { color: "primary.500", textDecor: "none" }
                        : undefined
                }
                {...props}
            >
                {children}
            </Link>
        </NextLink>
    );
}
