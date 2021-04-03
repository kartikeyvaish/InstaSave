import React from "react";
import { View, StyleSheet, Image } from "react-native";

import AppText from "./AppText";
import Icon from "./Icon";

function PostTopBar({ uri, Name, Verified }) {
  return (
    <View style={styles.container}>
      <Image source={{ uri }} style={styles.ProfilePicture} />
      <AppText Title={Name} family="Muli" size={23} />
      {Verified ? (
        <Icon
          Name="Octicons"
          IconName="verified"
          size={18}
          style={styles.Icon}
        />
      ) : null}
    </View>
  );
}

export default PostTopBar;

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 10,
  },
  Icon: {
    marginTop: 5,
    marginLeft: 10,
  },
  ProfilePicture: {
    width: 40,
    height: 40,
    borderRadius: 40,
    marginLeft: 10,
    marginRight: 20,
  },
});
