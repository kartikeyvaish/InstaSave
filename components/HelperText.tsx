// Packages Imports
import { HelperText as HT } from "react-native-paper";

// Types Imports
import { HelperTextProps } from "../types/ComponentTypes";

// function component for HelperText
function HelperText(props: HelperTextProps) {
  // Destructuring props
  const { text, ...otherProps } = props;

  // render
  return (
    <HT type="error" {...otherProps}>
      {text}
    </HT>
  );
}

// exports
export default HelperText;
