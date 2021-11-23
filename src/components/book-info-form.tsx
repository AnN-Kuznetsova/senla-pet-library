import * as React from "react";
import {FormControl, Input, InputLabel} from "@mui/material";
import {useState} from "react";
import {useDispatch} from "react-redux";

import {addNewBook} from "../store/books/books";
import {FormButtonControls, FormButtonControlsType} from "./form-button-controls";
import type {BookType} from "../types";
import type {ControlButtonType} from "./form-button-controls";


interface PropsType {
  book?: BookType,
  onCancelButtonClick?: () => void,
}


const getInputTextValidation = (text: string): boolean => {
  return !!text;
};


export const BookInfoForm: React.FC<PropsType> = (props: PropsType) => {
  const {
    book,
    onCancelButtonClick,
  } = props;

  const dispatch = useDispatch();
  let isValidate = false;

  const [title, setTitle] = useState(book ? book.title : "");
  const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const [autor, setAutor] = useState(book ? book.autor : "");
  const handleInputAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newBook = {
      title,
      autor,
      coverImgUrl: book ? book.coverImgUrl : "",
    };

    dispatch(addNewBook(newBook));
  };

  isValidate = getInputTextValidation(title) && getInputTextValidation(autor)
    && (title !== book.title || autor !== book.autor);

  const controlButtons: ControlButtonType[] = [];
  controlButtons.push({
    type: FormButtonControlsType.SAVE,
    isDisabled: !isValidate,
    isSubmit: true,
    });

  if (onCancelButtonClick) {
    controlButtons.push({
      type: FormButtonControlsType.CANCEL,
      onClick: onCancelButtonClick,
    })
  }


  return (
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
  );
};
