import * as React from "react";
import {Typography} from "@mui/material";

import {BookInfoForm} from "./book-info-form";


export const NewBookModal: React.FC = () => {
  return (
    <React.Fragment>
      <Typography variant="h4">Заполнение данных новой книги</Typography>
      <BookInfoForm />
    </React.Fragment>
  );
};
