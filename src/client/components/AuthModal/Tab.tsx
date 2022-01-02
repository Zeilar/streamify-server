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
            h="4rem"
            pos="relative"
            variant="unstyled"
            onClick={onClick}
            color={active ? "primary.500" : "text.default"}
            _after={
                active
                    ? {
                          content: `""`,
                          w: "100%",
                          h: "2px",
                          bgColor: "primary.500",
                          bottom: 0,
                          left: 0,
                          pos: "absolute",
                      }
                    : undefined
            }
        >
            {children}
        </Button>
    );
}
