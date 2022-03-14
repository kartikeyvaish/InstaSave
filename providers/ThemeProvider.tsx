// Packages Imports
import { useEffect } from "react";
import { Appearance, StatusBar } from "react-native";
import { DefaultTheme, Provider as PaperProvider } from "react-native-paper";
import * as NavigationBar from "expo-navigation-bar";
import { useDispatch, useSelector } from "react-redux";

// Local component and context imports
import ThemeActionCreators from "../store/theme/actions";
import ThemeContext from "../context/ThemeContext";

// ThemeProvider function component
function ThemeProvider(props: { children?: React.ReactNode }) {
  // Destructuring props
  const { children } = props;

  // Holds the State
  const { ThemeState } = useSelector((state: any) => state);

  // Get the current theme
  const { theme } = ThemeState;

  // Dispatcher
  const dispatch = useDispatch();

  // function to change theme
  const ChangeMode = (mode: string) => dispatch(ThemeActionCreators.ChangeMode(mode));

  // Set the initial navigation bar color
  useEffect(() => {
    NavigationBar.setBackgroundColorAsync(theme.colors.background);
  }, []);

  // Light/Dark mode change listener
  useEffect(() => {
    Appearance.addChangeListener(({ colorScheme }: any) => ChangeMode(colorScheme));

    return () => Appearance.removeChangeListener(({ colorScheme }: any) => ChangeMode(colorScheme));
  }, []);

  // Bar Style
  const barStyle = theme.dark === false ? "dark-content" : "light-content";

  // StatusBar background color
  const barBackgroundColor = theme.colors.background;

  // React Native Paper Theme Provider
  const ReactNativePaperTheme = {
    ...DefaultTheme,
    ...theme,
  };

  // Render component based on user authentication status
  return (
    <ThemeContext.Provider value={{ ChangeMode, theme }}>
      {/* StatusBar */}
      <StatusBar barStyle={barStyle} backgroundColor={barBackgroundColor} animated={true} />
      {/* React Native Paper Theme */}
      <PaperProvider theme={ReactNativePaperTheme}>
        {/* children components */}
        {children}
      </PaperProvider>
    </ThemeContext.Provider>
  );
}

// Exports
export default ThemeProvider;
