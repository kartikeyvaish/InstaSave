// Packages Imports
import { Theme } from "@react-navigation/native";

// interface for ThemeContext
export interface ThemeContextProps {
    ChangeMode?: (mode: string, isSystemDefault?: boolean) => void;
    theme?: Theme
    isSystemDefault?: boolean;
}

