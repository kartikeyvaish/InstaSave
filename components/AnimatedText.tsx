// packages imports
import { StyleProp, TextStyle } from "react-native";
import { useTheme } from "@react-navigation/native";

// Types imports
import Animated from "react-native-reanimated";
import { AnimatedTextProps } from "../types/ComponentTypes";

// function component for the AnimatedText component
function AnimatedText(props: AnimatedTextProps) {
  // Getting Theme Colors
  const { colors } = useTheme();

  // Destructuring props
  const {
    text,
    style,
    color,
    textProps,
    size,
    family,
    onPress,
    entering,
    exiting,
    layout,
    animatedTextKey,
    ...otherProps
  } = props;

  // Container Styles
  const textStyles: StyleProp<TextStyle> = [
    {
      color: color ? color : colors.text,
      fontSize: size ? size : 16,
      fontFamily: family,
      ...otherProps,
    },
    style,
  ];

  if (!text) return null;

  // Rendering the AnimatedText component
  return (
    <Animated.Text
      entering={entering}
      exiting={exiting}
      layout={layout}
      key={animatedTextKey ? animatedTextKey : text}
      style={textStyles}
      onPress={onPress}
      {...textProps}
    >
      {text}
    </Animated.Text>
  );
}

// Exports
export default AnimatedText;
