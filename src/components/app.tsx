import * as React from "react";
import {createTheme, ThemeProvider} from '@mui/material/styles';
import {lime, lightGreen, pink} from '@mui/material/colors';

import {MainPage} from "./main-page";


const THEME = createTheme({
  palette: {
    primary: {
      light: lime[100],
      main: lime[300],
      dark: lime[600],
      contrastText: lightGreen[800],
    },
    secondary: {
      light: pink[300],
      main: pink[500],
      dark: pink[700],
      contrastText: lightGreen[800],
    },
  },
});


export const App: React.FC = () => {
  return (
    <ThemeProvider theme={THEME}>
      <MainPage />
      
      <div id="modal" className="modal"></div>
    </ThemeProvider>
  );
};
