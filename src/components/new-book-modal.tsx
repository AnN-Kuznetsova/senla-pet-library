import * as React from "react";
import {Button, FormControl, Input, InputLabel, Typography} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {FetchStatus} from "../api";
import {ErrorComponent} from "./error-component";
import {Wait} from "./wait";
import {addNewBook, resetAddNewBookError} from "../store/books/books";
import {getBooksAddNewError, getBooksStatus} from "../store/books/selectors";


const getInputTextValidation = (text: string): boolean => {
  return !!text;
};


export const NewBookModal: React.FC = () => {
  const dispatch = useDispatch();
  const status = useSelector(getBooksStatus);
  const error = useSelector(getBooksAddNewError);
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

  const handleErrorComponentClick = () => {
    dispatch(resetAddNewBookError());
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

      {status === FetchStatus.WAIT &&
        <div className="absolute">
          <Wait />
        </div>
      }

      {error && status !== FetchStatus.WAIT &&
        <div
          className="absolute absolute--clickable"
          onClick={handleErrorComponentClick}
        >
          <ErrorComponent />
        </div>
      }
    </React.Fragment>
  );
};
