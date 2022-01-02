import { Button } from "@chakra-ui/react";

interface TabProps {
    active: boolean;
    onClick(): void;
    children: React.ReactNode;
}

export default function Tab({ active, onClick, children }: TabProps) {
    return (
        <Button
            fontSize="1.25rem"
            w="100%"
            variant="unstyled"
            onClick={onClick}
            color={active ? "primary.500" : "text.default"}
        >
            {children}
        </Button>
    );
}
