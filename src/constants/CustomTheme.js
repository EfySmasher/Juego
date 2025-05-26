import { DefaultTheme } from "@react-navigation/native";
import colors from "./colors";

const CustomTheme = {
    ...DefaultTheme,
    colors:{
        ...DefaultTheme.colors,
        backgroud: colors.gradiente1,
        card: colors.botones1,
        text: colors.default,
        border: colors.nubes1,
        notification: colors.botones1
    }
}

export default CustomTheme;