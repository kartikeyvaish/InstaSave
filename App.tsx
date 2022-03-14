// Packages Imports
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Local Files/App/Components/Store import
import AppNavigator from "./navigation/AppNavigator";
import NavigationProvider from "./providers/NavigationProvider";
import { store, persistor } from "./store/configureStore";
import ThemeProvider from "./providers/ThemeProvider";

// export default App
export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <ThemeProvider>
            <NavigationProvider>
              <AppNavigator />
            </NavigationProvider>
          </ThemeProvider>
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}
