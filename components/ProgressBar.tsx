// Packages Imports
import { View, StyleSheet } from "react-native";
import Animated, {
  FadeIn,
  FadeOut,
  interpolate,
  SharedValue,
  useAnimatedStyle,
  Layout as LT,
} from "react-native-reanimated";

// Local Imports
import ColorPallete from "../constants/ColorPallete";
import Layout from "../constants/Layout";

// Constants
const ProgressBarWidth = Layout.window.width * 0.8;

// interface for ProgressBar
export interface ProgressBarProps {
  progress: SharedValue<number>;
}

// function component for ProgressBar
function ProgressBar(props: ProgressBarProps) {
  // Destructuring props
  const { progress } = props;

  const animatedStyles = useAnimatedStyle(() => {
    const progressWidth = interpolate(progress.value, [0, 100], [0, ProgressBarWidth]);

    return {
      width: progressWidth,
    };
  });

  // render
  return (
    <Animated.View entering={FadeIn} exiting={FadeOut} layout={LT} style={styles.container}>
      <Animated.View style={[styles.progressBar, animatedStyles]} />
    </Animated.View>
  );
}

// exports
export default ProgressBar;

// styles
const styles = StyleSheet.create({
  container: {
    backgroundColor: ColorPallete.grey,
    width: ProgressBarWidth,
    height: 5,
    alignSelf: "center",
    borderRadius: 100,
    marginTop: 10,
  },
  progressBar: {
    backgroundColor: ColorPallete.primary,
    position: "absolute",
    top: 0,
    left: 0,
    height: "100%",
  },
});
