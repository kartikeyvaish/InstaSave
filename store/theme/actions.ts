// Imports
import * as actionTypes from "./actionTypes";
import { ThemeActionProps } from "./types";

// Action Creators for the theme

// Action Creators: Change theme state variable
function ChangeMode(mode: string): ThemeActionProps {
  return {
    type: actionTypes.CHANGE_MODE,
    payload: {
      mode: mode,
    }
  }
}

// Assemble ThemeActionCreators
const ThemeActionCreators = { ChangeMode }

// export the ThemeActionCreators
export default ThemeActionCreators;
