// Packages Imports
import "react-native-gesture-handler";
import { AppRegistry } from "react-native";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

// Local Files/App/Components/Store import
import App from "./App";
import { store, persistor } from "./store/configureStore";
import { GestureHandlerRootView } from "react-native-gesture-handler";

// Headless Check for PushNotifications
function HeadlessCheck({ isHeadless }) {
  return isHeadless ? null : (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistor}>
          <App />
        </PersistGate>
      </Provider>
    </GestureHandlerRootView>
  );
}

// registering the App
AppRegistry.registerComponent("main", () => HeadlessCheck);
