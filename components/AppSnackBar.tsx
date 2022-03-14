// Packages Imports
import { Snackbar } from "react-native-paper";

// Local imports
import { AppSnackBarProps } from "../types/ComponentTypes";
import ColorPallete from "../constants/ColorPallete";

// function component for AppSnackBar
function AppSnackBar(props: AppSnackBarProps) {
  // Destructuring props
  const { text, backgroundColor = ColorPallete.danger, ...otherProps } = props;

  // render
  return !text ? null : (
    <Snackbar duration={2000} style={{ backgroundColor: backgroundColor }} {...otherProps}>
      {text}
    </Snackbar>
  );
}

// exports
export default AppSnackBar;
