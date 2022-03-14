// Packages Imports
import { Theme } from "@react-navigation/native";

export interface ThemeInitialStateProps {
    mode?: string,
    theme?: Theme,
}

// ThemeActionProps interface
export interface ThemeActionProps {
    type: string;
    payload?: ThemeInitialStateProps;
}