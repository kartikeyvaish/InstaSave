// Packages Imports
import { useEffect, useState } from "react";
import * as Clipboard from "expo-clipboard";

// Local imports
import env from "../config/config";
import useAppState from "./useAppState";

// Custom hook to paste a link if user comes to the app
export default function useLinkPaster() {
  const AppState = useAppState();

  const [URI, SetURI] = useState("");
  const [Error, SetError] = useState("");
  const [Touched, SetTouched] = useState(false);

  // on every app state change check if clipboard has an instagram link
  useEffect(() => {
    if (AppState) {
      CheckClipboard();
    }
  }, [AppState]);

  // whenever URI changes
  useEffect(() => {
    if (URI.length) checkForErrors();
    else SetError("URI is required");
  }, [URI]);

  // Check if link entered is valid or not
  // the link should include env.linkPrefix in it
  const checkForErrors = () => {
    if (URI.includes(env.linkPrefix)) {
      SetError("");
    } else {
      SetError("Invalid URL");
    }
  };

  // Check if Clipboard has a link with instagram prefix
  const CheckClipboard = async () => {
    try {
      const clipboardText = await Clipboard.getStringAsync();
      if (clipboardText.includes(env.linkPrefix)) SetURI(clipboardText);
    } catch (error) { }
  };

  return { URI, SetURI, Error: Touched ? Error : "", SetTouched };
}
