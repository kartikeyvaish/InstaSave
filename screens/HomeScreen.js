import React, { useState } from "react";
import { StyleSheet } from "react-native";

import AppButton from "../components/AppButton";
import AppText from "../components/AppText";
import Container from "../components/Container";
import TextInput from "../components/TextInput";

function HomeScreen({ navigation }) {
  const [Link, SetLink] = useState("");

  return (
    <Container style={styles.container}>
      <AppText
        Title="InstaSave"
        size={50}
        family="Berkshire"
        letterSpacing={3}
      />

      <TextInput
        placeholder="Paste Link Here.."
        style={styles.InputBox}
        onChangeText={(text) => SetLink(text)}
      />

      <AppButton
        Title="Download"
        marginTop={20}
        marginBottom={30}
        Active={Link.length ? true : false}
        onPress={() => navigation.navigate("DownloadingScreen", { Link })}
      />
    </Container>
  );
}

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingLeft: 20,
    paddingRight: 20,
    alignItems: "center",
    paddingTop: 30,
  },
  InputBox: { width: "100%", marginTop: 200 },
});
