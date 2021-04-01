import React, { useEffect, useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import AppLoading from "expo-app-loading";
import { Root } from "native-base";
import { Appearance, AppearanceProvider } from "react-native-appearance";

import AppNavigator from "./navigation/AppNavigator";
import Theme from "./themes/Theme";
import useFonts from "./hooks/useFonts";

function GetTheme(Mode) {
  return Mode === "Default" ? Theme[Appearance.getColorScheme()] : Theme[Mode];
}
const defaultScheme = Appearance.getColorScheme();

export default function App() {
  const [IsReady, SetIsReady] = useState(false);
  const [Mode, SetMode] = useState(defaultScheme);

  useEffect(() => {
    const subscription = Appearance.addChangeListener(({ colorScheme }) => {
      SetMode(colorScheme);
    });
    return () => subscription.remove();
  }, []);

  const LoadFonts = async () => {
    await useFonts();
  };

  if (!IsReady) {
    return (
      <AppLoading
        startAsync={LoadFonts}
        onFinish={() => SetIsReady(true)}
        onError={() => {}}
      />
    );
  }

  return (
    <AppearanceProvider>
      <NavigationContainer theme={GetTheme(Mode)}>
        <Root>
          <AppNavigator />
        </Root>
      </NavigationContainer>
    </AppearanceProvider>
  );
}
