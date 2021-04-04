import React, { useRef, useState } from "react";
import { useTheme } from "@react-navigation/native";
import { StyleSheet, View, TouchableWithoutFeedback } from "react-native";
import { TextInput as AppTextInput } from "react-native-paper";
import { Ionicons } from "@expo/vector-icons";

import AppText from "./AppText";
import ColorPallete from "../config/ColorPallete";
import Icon from "./Icon";

function TextInput(props) {
  const { colors } = useTheme();
  const [ShowPassword, SetShowPassword] = useState(false);
  const TextInputRef = useRef();

  const Themes = {
    colors: {
      ...colors,
      underlineColor: colors.primary,
      placeholder: colors.text,
    },
  };

  let { Error, ErrorVisibility } = props;

  const HiddenRender = () => (
    <Ionicons
      name={ShowPassword === false ? "md-eye" : "md-eye-off"}
      size={24}
      color={colors.text}
      style={{ paddingTop: 0 }}
    />
  );

  return (
    <View
      style={{
        marginBottom: ErrorVisibility === true && Error ? 5 : 8,
        ...props.style,
      }}
    >
      <View
        style={{
          width: "100%",
          flexDirection: "row",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AppTextInput
          {...props}
          ref={TextInputRef}
          blurOnSubmit
          mode="outlined"
          style={styles.TextInput}
          theme={Themes}
          dense={props.multiline === true ? false : true}
          placeholderTextColor="grey"
          textAlignVertical="top"
          secureTextEntry={
            props.secureTextEntry ? !ShowPassword : props.secureTextEntry
          }
          right={
            props.secureTextEntry && props.secureTextEntry === true ? (
              <AppTextInput.Icon
                name={() => HiddenRender()}
                onPress={() => SetShowPassword(!ShowPassword)}
              />
            ) : null
          }
        />

        {props.ShowClearButton ? (
          <TouchableWithoutFeedback
            onPress={() => {
              props.ClearTextInput();
              TextInputRef.current.clear();
            }}
          >
            <View
              style={{
                width: 45,
                height: 45,
                alignSelf: "flex-end",
                paddingLeft: 5,
              }}
            >
              <Icon Name="Entypo" IconName="cross" size={45} />
            </View>
          </TouchableWithoutFeedback>
        ) : null}
      </View>

      {ErrorVisibility === true && Error ? (
        <AppText
          Title={props.Error}
          size={13}
          color={ColorPallete.red}
          style={{ paddingLeft: 2, paddingTop: 2 }}
        />
      ) : null}

      {props.NormalText ? (
        <AppText
          Title={props.NormalText}
          size={12}
          style={{ paddingLeft: 2, paddingTop: 2 }}
          color={props.normalTextColor ? props.normalTextColor : null}
        />
      ) : null}
    </View>
  );
}

export default TextInput;

const styles = StyleSheet.create({
  TextInput: {
    flex: 9,
    fontSize: 18,
    maxHeight: 150,
  },
});
