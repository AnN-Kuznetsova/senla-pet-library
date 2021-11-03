import React from "react";
import {Stack} from "@mui/material";

import {BooksSection} from "./books-section";
import { ReadersSection } from "./readers-section";


export const MainPage = () => {
  return (
    <main>
      <Stack spacing={2} direction="row">
        <BooksSection />
        <ReadersSection />
      </Stack>
    </main>
  );
};
