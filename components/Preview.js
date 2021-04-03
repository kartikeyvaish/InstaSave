import React from "react";
import { View, StyleSheet, Image } from "react-native";
import AppText from "./AppText";
import Card from "./Card";

function Preview({ uri, Count }) {
  return (
    <Card style={styles.container}>
      <Image
        style={{ width: "100%", height: "100%" }}
        resizeMode="cover"
        source={{ uri }}
      />
      <AppText Title={Count} size={15} />
    </Card>
  );
}

export default Preview;

const styles = StyleSheet.create({
  container: {
    width: "100%",
    maxHeight: 300,
    marginBottom: 10,
    elevation: 10,
    borderRadius: 12,
  },
});
