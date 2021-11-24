import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";
import {useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {FetchStatus} from "../api";
import {FormButtonControls, FormButtonControlsType} from "./form-button-controls";
import {addNewBook, resetBooksStatus, updateBook} from "../store/books/books";
import {getBooksStatus} from "../store/books/selectors";
import type {BookType} from "../types";
import type {ControlButtonType} from "./form-button-controls";
import { Info, InfoType } from "./info";


interface PropsType {
  book?: BookType,
  onCancelButtonClick?: () => void,
  onSubmit?: () => void,
}


const getInputTextValidation = (text: string): boolean => {
  return !!text;
};


export const BookInfoForm: React.FC<PropsType> = (props: PropsType) => {
  const {
    book,
    onCancelButtonClick,
    onSubmit,
  } = props;

  const dispatch = useDispatch();
  const status = useSelector(getBooksStatus);

  const [title, setTitle] = useState(book ? book.title : "");
  const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [autor, setAutor] = useState(book ? book.autor : "");
  const handleInputAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const isValidate = getInputTextValidation(title) && getInputTextValidation(autor);
  const isNewData = book ? (title !== book.title || autor !== book.autor) : true;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newBookData = {
      title,
      autor,
      coverImgUrl: book ? book.coverImgUrl : "",
    };

    if (book) {
      dispatch(updateBook({
        book: Object.assign({}, book, newBookData),
        onSubmit,
      }));
    } else {
      dispatch(addNewBook(newBookData));
    }
  };

  const handleErrorComponentClick = () => {
    dispatch(resetBooksStatus());
  };

  const controlButtons: ControlButtonType[] = [];
  controlButtons.push({
    type: FormButtonControlsType.SAVE,
    isDisabled: !(isValidate && isNewData),
    isSubmit: true,
    });

  if (onCancelButtonClick) {
    controlButtons.push({
      type: FormButtonControlsType.CANCEL,
      onClick: onCancelButtonClick,
    })
  }

  return (
    <React.Fragment>
      <form
        className="form"
        onSubmit={handleSubmit}
      >
        <FormControl
          className="form__field-control"
          error={!getInputTextValidation(title)}
        >
          <InputLabel htmlFor="book-title">Введите название</InputLabel>
          <Input id="book-title" name="book-title" type="text" value={title} onChange={handleInputTitleChange} autoFocus={true} />
        </FormControl>

        <FormControl
          className="form__field-control"
          error={!getInputTextValidation(autor)}
        >
          <InputLabel htmlFor="book-autor">Введите автора</InputLabel>
          <Input id="book-autor" name="book-autor" type="text" value={autor} onChange={handleInputAutorChange} />
        </FormControl>

        <FormButtonControls buttons={controlButtons} />
      </form>

      {status === FetchStatus.WAIT &&
        <div className="absolute">
          <Info type={InfoType.WAIT} />
        </div>
      }

      {status === FetchStatus.REJECTED &&
        <div
          className="absolute absolute--clickable"
          onClick={handleErrorComponentClick}
        >
          <Info type={InfoType.ERROR} />
        </div>
      }
  </React.Fragment>
  );
};
