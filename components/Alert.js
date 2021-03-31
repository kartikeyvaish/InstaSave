import { Alert } from "react-native";

function alert({
  Title = "",
  Description = "",
  TextOne = "",
  OnePress = null,
  TextTwo = "",
  TwoPress = null,
  cancelable = true,
}) {
  Alert.alert(
    Title,
    Description,
    [
      {
        text: TextOne,
        onPress: OnePress,
        style: "Cancel",
      },
      { text: TextTwo, onPress: TwoPress },
    ],
    { cancelable: cancelable }
  );
}

export default {
  alert,
};
