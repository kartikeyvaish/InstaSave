// Packages Imports
import { StyleSheet } from "react-native";
import Animated, { Extrapolate, interpolate, useAnimatedStyle } from "react-native-reanimated";

// Local Imports
import ColorPallete from "../constants/ColorPallete";
import { DotsProps } from "../types/ComponentTypes";
import Layout from "../constants/Layout";

// Constans
const ScreenWidth = Layout.window.width;

// function component for Dots
function Dots(props: DotsProps) {
  // Destructuring props
  const { scrollX, index } = props;

  const animatedStyles = useAnimatedStyle(() => {
    const scale = interpolate(
      scrollX.value,
      [
        (index - 2) * ScreenWidth,
        (index - 1) * ScreenWidth,
        index * ScreenWidth,
        (index + 1) * ScreenWidth,
        (index + 2) * ScreenWidth,
      ],
      [0.2, 0.5, 1.2, 0.5, 0.2],
      Extrapolate.CLAMP
    );

    return { transform: [{ scale }] };
  });

  // render
  return <Animated.View style={[styles.container, animatedStyles]} />;
}

// exports
export default Dots;

// styles
const styles = StyleSheet.create({
  container: {
    width: 8,
    height: 8,
    backgroundColor: ColorPallete.primary,
    marginRight: 5,
    borderRadius: ScreenWidth,
  },
});
