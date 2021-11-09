import * as React from "react";
import {Stack} from "@mui/material";

import {BooksSection} from "./books-section";
import {ReadersSection} from "./readers-section";


export const MainPage: React.FC = () => {
  return (
    <main>
      <Stack spacing={2} direction="row">
        <BooksSection />
        <ReadersSection />
      </Stack>
    </main>
  );
};
