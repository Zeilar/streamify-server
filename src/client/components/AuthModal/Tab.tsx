import { Button } from "@chakra-ui/react";

interface TabProps {
    active: boolean;
    onClick(): void;
    children: React.ReactNode;
}

export default function Tab({ active, onClick, children }: TabProps) {
    return (
        <Button
            rounded="none"
            fontSize="1.25rem"
            w="100%"
            h="3rem"
            pos="relative"
            variant="unstyled"
            onClick={onClick}
            zIndex={10}
            color={active ? "primary.500" : "text.default"}
            _after={{
                content: `""`,
                w: "100%",
                h: "2px",
                bgColor: active ? "primary.500" : "border.default",
                bottom: 0,
                left: 0,
                pos: "absolute",
                rounded: "pill",
            }}
        >
            {children}
        </Button>
    );
}
