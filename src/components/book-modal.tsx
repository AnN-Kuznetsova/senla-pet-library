import * as React from "react";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";

import {BookInfoForm} from "./book-info-form";
import {FormButtonControls, FormButtonControlsType} from "./form-button-controls";
import {getBookById} from "../store/books/selectors";
import type {BookType} from "../types";


interface PropsType {
  bookId: string,
}


export const BookModal: React.FC<PropsType> = (props: PropsType) => {
  const {bookId} = props;

  const book: BookType = useSelector(getBookById(bookId));

  const [isChange, setIsChange] = useState(false);

  const closeChange = () => {
    setIsChange(false);
  };

  const handleChangeButtonClick = () => {
    setIsChange(true);
  };

  return (
    <div className="book-modal">
      <div className="book-modal__img  img-wrapper">
        <img src={book.coverImgUrl ? `./assets/img/${book.coverImgUrl}` : `./assets/img/sass-logo.png`} />
      </div>

      <div className="book-modal__info">
        {isChange &&
          <BookInfoForm
            book={book}
            onCancelButtonClick={closeChange}
            onSubmit={closeChange}
          />
          ||
          <React.Fragment>
            <Typography variant="h5">{book.title}</Typography>
            <p>{book.autor}
              <span
                className="book-modal__is-taken"
                style={{color: book.isTaken ? `red` : `green`}}
              >{book.isTaken ? `Is taken` : `Free`}</span>
            </p>

            <FormButtonControls
              buttons={[{
                type: FormButtonControlsType.CHANGE,
                onClick: handleChangeButtonClick,
              }]}
            />
          </React.Fragment>
        }

      </div>
    </div>
  );
};
