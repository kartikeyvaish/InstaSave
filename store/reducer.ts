// Imports
import { combineReducers } from "@reduxjs/toolkit";

// Import reducers  
import themeReducer from "./theme/reducer";

// Combining all the reducers and exporting
export default combineReducers({
    // Theme Reducer
    ThemeState: themeReducer
});
