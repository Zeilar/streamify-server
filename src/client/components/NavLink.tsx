import { Link, LinkProps, Text } from "@chakra-ui/react";
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
                pos="relative"
                rounded="md"
                transition="none"
                userSelect="none"
                _hover={{ _after: { w: "100%" } }}
                _after={{
                    content: `""`,
                    pos: "absolute",
                    bottom: 0,
                    left: 0,
                    h: "2px",
                    transition: "0.15s",
                    w: active ? "100%" : 0,
                    bgColor: active ? "primary.500" : "primary.300",
                }}
                {...props}
            >
                <Text textStyle="h6" color={active ? "primary.500" : undefined}>
                    {children}
                </Text>
            </Link>
        </NextLink>
    );
}
