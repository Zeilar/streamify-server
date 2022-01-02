import { IconProps, Icon as ChakraIcon } from "@chakra-ui/react";
import * as MdiIcons from "@mdi/js";
import MdiIcon from "@mdi/react";

interface Props extends IconProps {
    icon?: keyof typeof MdiIcons;
}

export default function Icon({ icon, ...props }: Props) {
    return (
        <ChakraIcon
            as={MdiIcon}
            path={MdiIcons[icon]}
            minW="1rem"
            minH="1rem"
            verticalAlign="middle"
            {...props}
        />
    );
}
