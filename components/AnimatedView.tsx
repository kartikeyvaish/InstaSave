// Packages Imports
import Animated, { FadeInRight, FadeOutLeft, Layout } from "react-native-reanimated";

// Types Imports
import { AnimatedViewProps } from "../types/ComponentTypes";

// function component for AnimatedView
function AnimatedView(props: AnimatedViewProps) {
  // Destructuring props
  const {
    children,
    entering = FadeInRight,
    exiting = FadeOutLeft,
    layout = Layout,
    style,
    ...otherProps
  } = props;

  const finalStyles = [{ flex: 1 }, style];

  // Render
  return (
    <Animated.View
      entering={entering}
      exiting={exiting}
      layout={layout}
      style={finalStyles}
      {...otherProps}
    >
      {children}
    </Animated.View>
  );
}

// Exports
export default AnimatedView;
