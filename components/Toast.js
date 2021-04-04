import { Toast } from "native-base";

function show(
  text = "Error",
  type = "danger",
  buttonText,
  style,
  duration = 2000
) {
  Toast.show({
    text: text,
    position: "bottom",
    type: type,
    duration: duration,
    buttonText: buttonText,
    style: style,
  });
}

export default {
  show,
};
