import * as React from "react";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";

import {BookCover} from "./book-cover";
import {BookInfoForm} from "./book-info-form";
import {FormButtonControlls, FormButtonControllsType} from "./form-button-controls";
import {getBookById} from "../store/books/selectors";


interface PropsType {
  bookId: string,
}


export const BookModal: React.FC<PropsType> = (props: PropsType) => {
  const {bookId} = props;

  const book = useSelector(getBookById(bookId));

  const [isChange, setIsChange] = useState(false);

  const closeChangeWindow = () => {
    setIsChange(false);
  };

  const handleChangeButtonClick = () => {
    setIsChange(true);
  };

  return (
    <>
      {isChange &&
        <BookInfoForm
          book={book}
          onCancelButtonClick={closeChangeWindow}
          onSubmit={closeChangeWindow}
        />
        ||
        <div className="book-modal">
          <BookCover coverImgUrl={book.coverImgUrl} />

          <div className="book-modal__info">
            <Typography variant="h5">{book.title}</Typography>
            <p>{book.autor}
              <span
                className="book-modal__is-taken"
                style={{color: book.isTaken ? `red` : `green`}}
              >{book.isTaken ? `Is taken` : `Free`}</span>
            </p>

            <FormButtonControlls
              buttons={[{
                type: FormButtonControllsType.CHANGE,
                onClick: handleChangeButtonClick,
              }]}
            />
          </div>
        </div>
      }
    </>
  );
};
