import React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {lime, lightGreen} from '@mui/material/colors';

import {MainPage} from "./main-page";


const THEME = createTheme({
  palette: {
    primary: {
      light: lime[100],
      main: lime[300],
      dark: lime[600],
      contrastText: lightGreen[800],
    },
    /* secondary: {
      light: '#ff7961',
      main: '#f44336',
      dark: '#ba000d',
      contrastText: '#000',
    }, */
  },
});


export const App = () => {
  return (
    <ThemeProvider theme={THEME}>
      <MainPage />
    </ThemeProvider>
  );
};
