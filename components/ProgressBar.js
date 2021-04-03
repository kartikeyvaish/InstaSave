import React from "react";
import { View, StyleSheet } from "react-native";

import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";

function ProgressBar({ Percent = 20 }) {
  return (
    <View style={styles.container}>
      <View
        style={{
          height: "100%",
          width: `${Percent}%`,
          position: "absolute",
          left: 0,
          backgroundColor: ColorPallete.primary,
        }}
      ></View>
      <AppText
        Title={`${Percent}%`}
        color={Percent > 45 ? "white" : "black"}
        family="MuliBold"
        style={{ position: "absolute" }}
      />
    </View>
  );
}

export default ProgressBar;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    height: 30,
    backgroundColor: "lightgrey",
    borderRadius: 10,
    overflow: "hidden",
    justifyContent: "center",
    alignItems: "center",
  },
});
