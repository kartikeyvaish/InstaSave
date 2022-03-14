// Local Files/App/Components/Store import
import AppNavigator from "./navigation/AppNavigator";
import NavigationProvider from "./providers/NavigationProvider";
import ThemeProvider from "./providers/ThemeProvider";

// export default App
export default function App() {
  return (
    <ThemeProvider>
      <NavigationProvider>
        <AppNavigator />
      </NavigationProvider>
    </ThemeProvider>
  );
}
