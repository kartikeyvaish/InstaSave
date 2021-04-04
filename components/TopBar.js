import React from "react";
import { View, StyleSheet, TouchableWithoutFeedback } from "react-native";
import { useTheme } from "@react-navigation/native";

import AppText from "./AppText";
import Icon from "./Icon";

function TopBar({ Name, weight = "normal", onBackPress, style, color }) {
  const { colors } = useTheme();

  return (
    <View style={[styles.TopBar, style]}>
      <TouchableWithoutFeedback onPress={onBackPress}>
        <View style={styles.BackBTN}>
          <Icon
            Name="Ionicons"
            IconName="ios-arrow-back"
            size={25}
            color={color ? color : colors.text}
          />
        </View>
      </TouchableWithoutFeedback>

      <View style={styles.Header}>
        <AppText
          Title={Name}
          size={25}
          family="Muli"
          weight={weight}
          color={color ? color : colors.text}
        />
      </View>
    </View>
  );
}

export default TopBar;

const styles = StyleSheet.create({
  TopBar: {
    flexDirection: "row",
    height: 50,
  },
  BackBTN: {
    flex: 2,
    justifyContent: "center",
    alignItems: "center",
  },
  Header: {
    flex: 9,
    justifyContent: "center",
  },
});
