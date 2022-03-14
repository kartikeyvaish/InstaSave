// Imports
import { Appearance } from "react-native";
import * as NavigationBar from "expo-navigation-bar"

// types and utils imports
import * as actionTypes from "./actionTypes";
import Colors from "../../theme/Colors";
import { ThemeActionProps, ThemeInitialStateProps } from "./types";

// Getting the initial scheme
const defaultScheme = Appearance.getColorScheme();

// Defining the initial state
const InitialState: ThemeInitialStateProps = {
  mode: defaultScheme === "dark" ? "dark" : "light",
  theme: defaultScheme === "dark" ? Colors.dark : Colors.light,
};

// Reducers

// Reducer for the theme
const themeReducer = (state = InitialState, action: ThemeActionProps) => {
  switch (action.type) {
    // Theme Change
    case actionTypes.CHANGE_MODE: {
      const myState = { ...state };
      myState.mode = action.payload?.mode;
      myState.theme = action.payload?.mode === "light" ? Colors.light : Colors.dark;
      NavigationBar.setBackgroundColorAsync(myState.theme.colors.background);
      return myState;
    }

    // Default
    default:
      return state;
  }
};

// Exports
export default themeReducer;
