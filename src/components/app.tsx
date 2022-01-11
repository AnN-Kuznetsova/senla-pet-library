import * as React from "react";
import {ThemeProvider} from '@mui/material/styles';

import {THEME} from "../const";
import {MainPage} from "./main-page";


export const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={THEME}>
      <MainPage />
    </ThemeProvider>
  );
};
