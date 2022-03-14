// Packages Imports
import { useState } from "react";
import { Keyboard, StyleSheet, ToastAndroid, View } from "react-native";

// Component Imports
import AppButton from "../components/AppButton";
import AppContainer from "../components/AppContainer";
import AppText from "../components/AppText";
import AppTextInput from "../components/AppTextInput";

// Types and Utils Imports
import { AppScreenProps } from "../navigation/NavigationProps";
import ColorPallete from "../constants/ColorPallete";
import env from "../config/config";
import { GetPostDetailsAPI } from "../helper/helper";
import IconNames from "../constants/IconNames";
import useLinkPaster from "../hooks/useLinkPaster";

// function component for HomeScreen
function HomeScreen({ navigation }: AppScreenProps<"HomeScreen">) {
  const [Loading, SetLoading] = useState(false);

  // Custom hook to check if clipboard has an instagram link
  const { URI, SetURI, Error, SetTouched } = useLinkPaster();

  // Get the post details
  const GetPostDetails = async () => {
    try {
      if (!URI.includes(env.linkPrefix ?? "")) {
        ToastAndroid.show("Please paste a valid instagram link", ToastAndroid.SHORT);
        return;
      }

      SetLoading(true);
      const response = await GetPostDetailsAPI(URI);
      if (response) {
        navigation.navigate("NewDownloadScreen", { PostDetails: response });
      } else {
        ToastAndroid.show("Invalid URL or Post may be private.", ToastAndroid.LONG);
      }
      SetLoading(false);
    } catch (error) {
      SetLoading(false);
    }
  };

  // onClearPress
  const onClearPress = () => {
    SetURI("");
    Keyboard.dismiss();
  };

  // render
  return (
    <AppContainer style={styles.container}>
      <AppText
        text="Insta Save"
        size={30}
        style={{ fontWeight: "bold" }}
        color={ColorPallete.primary}
        marginBottom={20}
      />

      <View style={{ flex: 1, justifyContent: "center" }}>
        <AppTextInput
          placeholder="Enter a URL from instagram"
          autoComplete={undefined}
          onChangeText={SetURI}
          controlled={true}
          value={URI}
          error={Error}
          onBlur={() => SetTouched(true)}
          rightIconProps={{
            family: IconNames.FontAwesome,
            name: "remove",
            size: 20,
            onPress: Loading ? null : onClearPress,
          }}
        />

        <AppButton
          title="Download"
          roundness={100}
          disabled={URI.length === 0 || Loading === true ? true : false}
          onPress={GetPostDetails}
          marginBottom={30}
          loading={Loading}
          marginTop={15}
        />
      </View>
    </AppContainer>
  );
}

// exports
export default HomeScreen;

// styles
const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 15,
    paddingTop: 10,
  },
});
