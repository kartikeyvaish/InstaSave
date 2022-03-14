import ColorPallete, { ReactNativePaperColors } from "../constants/ColorPallete"

const dark = {
    colors: {
        ...ReactNativePaperColors,
        background: ColorPallete.black,
        border: ColorPallete.grey,
        card: ColorPallete.primary,
        notification: ColorPallete.primary,
        primary: ColorPallete.primary,
        text: ColorPallete.white,
        placeholder: ColorPallete.placeholderDark,
        onSurface: ColorPallete.black,
        surface: ColorPallete.black,
    },
    dark: true,
    mode: "exact",
    roundness: 2,
}

const light = {
    colors: {
        ...ReactNativePaperColors,
        background: ColorPallete.white,
        border: ColorPallete.grey,
        card: ColorPallete.primary,
        notification: ColorPallete.primary,
        primary: ColorPallete.primary,
        text: ColorPallete.black,
        placeholder: ColorPallete.placeholderLight,
        onSurface: ColorPallete.white,
        surface: ColorPallete.white,
    },
    dark: false,
    mode: "exact",
    roundness: 2,
}

export default { dark, light }