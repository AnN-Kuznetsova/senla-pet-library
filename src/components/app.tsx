import * as React from "react";
import {BrowserRouter, Route, Routes} from "react-router-dom";
import {ThemeProvider} from '@mui/material/styles';

import {AppRoute, THEME} from "../const";
import {BooksSection} from "./books-section/books-section";
import {ChartPage} from "./chart-page";
import {MainPage} from "./main-page";
import {NotFoundPage} from "./not-found-page";
import {ReadersSection} from "./readers-section";


export const App: React.FC = (): JSX.Element => {
  return (
    <ThemeProvider theme={THEME}>
      <BrowserRouter>
        <Routes>
          <Route path={AppRoute.MAIN} element={<MainPage />}>
            <Route index element={<>
              <BooksSection />
              <ReadersSection />
            </>} />
            <Route path={AppRoute.CHART_PAGE} element={<ChartPage />} />
          </Route>
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </BrowserRouter>
    </ThemeProvider>
  );
};
