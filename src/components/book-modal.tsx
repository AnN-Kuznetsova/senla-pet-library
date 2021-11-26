import * as React from "react";
import {Typography} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";

import {BookCover} from "./book-cover";
import {BookInfoForm} from "./book-info-form";
import {FormButtonControlls, FormButtonControllsType} from "./form-button-controls";
import {getBookById} from "../store/books/selectors";
import {getTimeToRead} from "../utils";
import moment = require("moment");


interface PropsType {
  bookId: string,
}


const formatDate = (date: moment.Moment): string | null => {
  return date ? date.format(`Do MMMM YYYY`) : null;
};


export const BookModal: React.FC<PropsType> = (props: PropsType) => {
  const {bookId} = props;

  const book = useSelector(getBookById(bookId));
  const isBookTaken = book.options.isTaken;
  const dateOfTaking = book.options.dateOfTaking;
  const timeToRead = getTimeToRead();
  const willBeReturnedAfter = dateOfTaking ? dateOfTaking.clone().add(timeToRead).diff(moment(), `days`) : null;

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
                style={{color: isBookTaken ? `red` : `green`}}
              >{isBookTaken ? `Is taken` : `Free`}</span>

              {dateOfTaking && <span className="new-line">Date of taking: <b>{formatDate(dateOfTaking)}</b></span>}
              {willBeReturnedAfter >= 0
                && <span className="new-line">Will be returned after <b style={{color: `green`}}>{willBeReturnedAfter}</b> days</span>
                || <span className="new-line">Delay return for <b style={{color: `red`}}>{-willBeReturnedAfter}</b> days</span>
              }
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
