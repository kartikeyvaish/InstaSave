// Packages Imports
import { StyleProp, TextStyle, ViewStyle } from "react-native";
import { Button } from "react-native-paper";

// Types Imports
import { AppButtonProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// function component for AppButton
function AppButton(props: AppButtonProps) {
  // Destructuring props
  const {
    title,
    onPress,
    mode = "contained",
    height = 50,
    backgroundColor,
    color,
    roundness,
    margin,
    marginBottom,
    marginLeft,
    marginRight,
    marginTop,
    style,
    labelStyle,
    elevation = 5,
    ...otherProps
  } = props;

  // Disable the onPress if loading is true or disabled is true
  const finalOnPress = otherProps.disabled || otherProps.loading ? undefined : onPress;

  // Get the disable state acording to the loading and disabled props
  const finalDisabled = otherProps.disabled || otherProps.loading;

  // labelStyles
  const labelStyles: StyleProp<TextStyle>[] = [
    {
      color: color ? color : ColorPallete.white,
    },
    labelStyle,
  ];

  // buttonStyles
  const buttonStyles: StyleProp<ViewStyle>[] = [
    {
      margin,
      marginBottom,
      marginLeft,
      marginRight,
      marginTop,
      elevation: finalDisabled ? 0 : elevation,
      height,
    },
    style,
  ];

  // render
  return !title ? null : (
    <Button
      mode={mode}
      onPress={finalOnPress}
      disabled={finalDisabled}
      color={backgroundColor}
      labelStyle={labelStyles}
      style={buttonStyles}
      contentStyle={{ height: height }}
      theme={{ roundness: roundness }}
      {...otherProps}
    >
      {title}
    </Button>
  );
}

// exports
export default AppButton;
