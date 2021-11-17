import * as React from "react";
import {useState} from "react";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useDispatch} from "react-redux";

import {addNewBook} from "../store/books/books";


const getInputTextValidation = (text: string): boolean => {
  return !!text;
};


export const NewBookModal: React.FC = () => {
  const dispatch = useDispatch();
  let isValidate = false;

  const [title, setTitle] = useState("");
  const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [autor, setAutor] = useState("");
  const handleInputAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newBook = {
      title,
      autor,
      coverImgUrl: "",
    };

    dispatch(addNewBook(newBook));
  };

  isValidate = getInputTextValidation(title) && getInputTextValidation(autor);

  return (
    <React.Fragment>
      <Typography variant="h4">Заполнение данных новой книги</Typography>

      <form onSubmit={handleSubmit}>
        <FormControl
          className="form-control"
          error={!getInputTextValidation(title)}
        >
          <InputLabel htmlFor="book-title">Введите название</InputLabel>
          <Input id="book-title" name="book-title" type="text" value={title} onChange={handleInputTitleChange} autoFocus={true} />
        </FormControl>

        <FormControl
          className="form-control"
          error={!getInputTextValidation(autor)}
        >
          <InputLabel htmlFor="book-autor">Введите автора</InputLabel>
          <Input id="book-autor" name="book-autor" type="text" value={autor} onChange={handleInputAutorChange} />
        </FormControl>

        <Button
          variant="contained"
          disabled={!isValidate}
          type="submit"
        >
          Send
        </Button>
      </form>
    </React.Fragment>
  );
};
