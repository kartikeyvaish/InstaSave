// Packages Imports
import { View } from "react-native";
import { TextInput } from "react-native-paper";
import { useTheme } from "@react-navigation/native";

// Types Imports
import AppIcon from "./AppIcon";
import { AppTextInputProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";
import HelperText from "./HelperText";

// function component for AppTextInput
function AppTextInput(props: AppTextInputProps) {
  // Destructuring props
  const {
    error,
    mode = "outlined",
    placeholderTextColor,
    style,
    helperTextProps,
    left,
    right,
    leftIconProps,
    rightIconProps,
    containerStyle,
    value,
    controlled,
    roundness = 5,
    showHelper = true,
    autoComplete = undefined,
    ...otherProps
  } = props;

  // get theme
  const { colors } = useTheme();

  // leftIcon
  const leftIcon = left ? (
    left
  ) : leftIconProps?.family ? (
    <TextInput.Icon name={() => <AppIcon {...leftIconProps} />} />
  ) : null;

  // rightIcon
  const rightIcon = right ? (
    right
  ) : rightIconProps?.family ? (
    <TextInput.Icon
      onPress={rightIconProps?.onPress}
      name={() => <AppIcon {...rightIconProps} />}
    />
  ) : null;

  // render
  return (
    <View style={containerStyle}>
      <TextInput
        autoComplete={autoComplete}
        error={error ? true : false}
        placeholderTextColor={error ? ColorPallete.danger : undefined}
        style={[{ backgroundColor: colors.background }, style]}
        left={leftIcon}
        right={rightIcon}
        mode={mode}
        theme={{ roundness: roundness }}
        underlineColor={colors.text}
        activeUnderlineColor={colors.primary}
        outlineColor={colors.text}
        activeOutlineColor={colors.primary}
        {...(controlled ? { value: value } : {})}
        {...otherProps}
      />

      {showHelper ? (
        <HelperText visible={error ? true : false} text={error} {...helperTextProps} />
      ) : null}
    </View>
  );
}

// exports
export default AppTextInput;
