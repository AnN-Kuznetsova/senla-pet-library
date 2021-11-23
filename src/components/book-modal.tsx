import * as React from "react";
import {useState} from "react";
import {Typography} from "@mui/material";

import {BookInfoForm} from "./book-info-form";
import {FormButtonControls, FormButtonControlsType} from "./form-button-controls";
import type {BookType} from "../types";


interface PropsType {
  book: BookType,
}


export const BookModal: React.FC<PropsType> = (props: PropsType) => {
  const {book} = props;

  const [isChange, setIsChange] = useState(false);

  const handleChangeButtonClick = () => {
    setIsChange(true);
  };

  const handleCancelButtonClick = () => {
    setIsChange(false);
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
            onCancelButtonClick={handleCancelButtonClick}
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
