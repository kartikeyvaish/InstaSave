// Packages Imports
import { useContext } from "react";
import { NavigationContainer } from "@react-navigation/native";

// Context Imports
import AppContainer from "../components/AppContainer";
import ThemeContext from "../context/ThemeContext";

// function component for NavigationProvider
function NavigationProvider(props: { children?: React.ReactNode }) {
  // Destructuring props
  const { children } = props;

  // Get the theme from the context
  const { theme } = useContext(ThemeContext);

  // render
  return (
    <NavigationContainer theme={theme}>
      <AppContainer>{children}</AppContainer>
    </NavigationContainer>
  );
}

// exports
export default NavigationProvider;
