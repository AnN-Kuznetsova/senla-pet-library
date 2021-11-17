import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";


export const NewBookModal: React.FC = () => {
  return (
    <React.Fragment>
      <h2>Заполнение данных новой книги</h2>

      <FormControl>
        <InputLabel htmlFor="book-title">Введите название</InputLabel>
        <Input id="book-title" name="book-title" type="text" value="" autoFocus={true} />
      </FormControl>
    </React.Fragment>
  );
};
