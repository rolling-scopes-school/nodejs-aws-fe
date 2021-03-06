import {createSlice} from "@reduxjs/toolkit";
import {RootState} from "./store";

interface ThemeState {
  darkMode: boolean;
}

const match = window.matchMedia('(prefers-color-scheme: dark)');

const initialState: ThemeState = {
  darkMode: match.matches
}

export const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleDarkMode: state => {
      state.darkMode = !state.darkMode
    }
  }
})

export const {toggleDarkMode} = themeSlice.actions

export const selectDarkMode = (state: RootState) => state.theme.darkMode

export default themeSlice.reducer
