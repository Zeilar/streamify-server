import { extendTheme, theme } from "@chakra-ui/react";
import { colors } from "./colors";
import * as components from "./components";
import { config } from "./config";
import { fonts } from "./fonts";
// import { shadows } from "./shadows";
import { styles } from "./styles";
import { withDefaults } from "./withDefaults";
// import { breakpoints } from "./breakpoints";
import { textStyles } from "./textStyles";
import { radii } from "./radii";

export default extendTheme(
    {
        config,
        colors,
        // shadows,
        fonts,
        components: { ...theme.components, ...components },
        styles,
        // breakpoints,
        textStyles,
        radii,
    },
    textStyles,
    ...withDefaults
);
