import * as React from "react";
import {Button, FormControl, Input, InputLabel} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {BookCover} from "./book-cover";
import {DEFOULT_COVER_IMGURL, FetchStatus} from "../const";
import {FormButtonControlls, FormButtonControllsType} from "./form-button-controls";
import {Info, InfoType} from "./info";
import {addNewBook, resetBooksStatus, updateBook} from "../store/books/books";
import {getBooksError, getBooksStatus} from "../store/books/selectors";
import {useWaitShow} from "../utils";
import type {BookType} from "../types";
import type {ControllButtonType} from "./form-button-controls";


interface PropsType {
  book?: BookType,
  onCancelButtonClick?: () => void,
  onSubmit?: () => void,
}


const getInputTextValidation = (text: string): boolean => {
  return !!text;
};


export const BookInfoForm: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const {
    book,
    onCancelButtonClick,
    onSubmit,
  } = props;

  const dispatch = useDispatch();
  const status = useSelector(getBooksStatus);
  const error = useSelector(getBooksError);
  const isWaitShow = useWaitShow(status);

  const [title, setTitle] = useState(book ? book.title : "");
  const [autor, setAutor] = useState(book ? book.autor : "");
  const [coverImgUrl, setCoverImgUrl] = useState(book ? book.coverImgUrl : DEFOULT_COVER_IMGURL);

  const handleInputTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setTitle(event.target.value);
  };

  const handleInputAutorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setAutor(event.target.value);
  };

  const handleCoverImgUrlChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = event.target.files[0];
    const reader = new FileReader();

    reader.onloadend = () => {
      setCoverImgUrl(reader.result);
    };

    reader.readAsDataURL(imgFile);
  };

  const isValidate = getInputTextValidation(title) && getInputTextValidation(autor);
  const isNewData = book ? (title !== book.title || autor !== book.autor || coverImgUrl !== book.coverImgUrl) : true;

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();

    const newBookData = {
      id: book ? book.id : ``,
      title,
      autor,
      coverImgUrl,
    };

    if (book) {
      dispatch(updateBook({
        book: newBookData,
        onSubmit,
      }));
    } else {
      dispatch(addNewBook(newBookData));
    }
  };

  const handleErrorComponentClick = () => {
    dispatch(resetBooksStatus());
  };

  const controllButtons: ControllButtonType[] = [];
  controllButtons.push({
    type: FormButtonControllsType.SAVE,
    isDisabled: !(isValidate && isNewData),
    isSubmit: true,
    });

  if (onCancelButtonClick) {
    controllButtons.push({
      type: FormButtonControllsType.CANCEL,
      onClick: onCancelButtonClick,
    })
  }

  return (
    <React.Fragment>
      <form
        className="form  book-modal"
        onSubmit={handleSubmit}
      >
        <div className="form__field-control  form__field-control--img-loader" >
          <BookCover coverImgUrl={coverImgUrl} />

          <label htmlFor="book-cover-img-url" className="form__load-button">
            <input id="book-cover-img-url" type="file" accept="image/png, image/jpeg, image/jpg" onChange={handleCoverImgUrlChange} hidden />
            <Button variant="outlined" component="span">
              Загрузить...
            </Button>
          </label>
        </div>

        <div className="book-modal__info">
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

          <FormButtonControlls buttons={controllButtons} />
        </div>
      </form>

      {isWaitShow &&
        <div className="absolute">
          <Info type={InfoType.WAIT} />
        </div>
      }

      {status === FetchStatus.REJECTED &&
        <div
          className="absolute absolute--clickable"
          onClick={handleErrorComponentClick}
        >
          <Info type={InfoType.ERROR} error={error} />
        </div>
      }
  </React.Fragment>
  );
};
