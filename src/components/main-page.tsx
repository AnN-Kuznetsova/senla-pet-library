import * as React from "react";
import {Stack} from "@mui/material";

import {BooksSection} from "./books-section/books-section";
import {ReadersSection} from "./readers-section";


export const MainPage: React.FC = (): JSX.Element => {
  return (
    <main>
      <Stack spacing={2} direction="row" style={{width: "100%"}}>
        <BooksSection />
        <ReadersSection />
      </Stack>
    </main>
  );
};
