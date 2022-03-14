// Modules imports
import { createContext } from "react";

// Local Imports
import { ThemeContextProps } from "../types/ThemeContextTypes";

// initial value
const defaultValue = {}

// Context
const ThemeContext = createContext<ThemeContextProps>(defaultValue);

// exports
export default ThemeContext;
