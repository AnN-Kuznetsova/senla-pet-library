import * as React from "react";
import * as moment from "moment";
import {Button, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {DATE_FORMAT} from "../adapters/reader";
import {BooksList, BooksListMode} from "./books-list/books-list";
import {getReaderById} from "../store/readers/selectors";
import {updateReader} from "../store/readers/readers";
import {getBooksByIds, getFreeBooks} from "../store/books/selectors";
import type {BookTakenStatusType} from "../types";


interface PropsType {
  readerId: string,
}


/* const formatDate = (date: moment.Moment | null): string | null => {
  return date ? date.format(`DD MMMM YYYY`) : null;
}; */


export const ReaderModal: React.FC<PropsType> = (props: PropsType) => {
  const {readerId} = props;

  const dispatch = useDispatch();

  const reader = useSelector(getReaderById(readerId));
  const freeBooks = useSelector(getFreeBooks);
  const takedBooksCount = reader.books.length;
  const takedBooks = useSelector(getBooksByIds(reader.books.map((book) => book.id)));

  const [isBookChoice, setIsBookChoice] = useState(false);

  const takeButtonTitle = isBookChoice ? `Back` : `Take a book`;

  const handleReturnBookButtonClick = (bookId: string) => {
    const newBooks = reader.books.filter((book) => book.id !== bookId);
    dispatch(updateReader(Object.assign({}, reader, {books: newBooks})));
  };

  const handleTakeButtonClick = () => {
    setIsBookChoice((isBookChoice) => !isBookChoice);
  };

  const handleTakeBookButtonClick = (bookId: string) => {
    const newBook: BookTakenStatusType = {
      id: bookId,
      dateOfTaking: moment(moment().format(DATE_FORMAT), DATE_FORMAT),
    };

    const books = reader.books.slice();
    books.push(newBook);

    dispatch(updateReader(Object.assign({}, reader, {books})));
  };

  return (
    <>
      <div className="reader-modal">
        <div className="reader-modal__info">
          <Typography variant="h5">{reader.name}</Typography>
          <div style={{display: "flex"}}>
            <p style={{marginTop: "0"}}>age: {reader.age}</p>
            <Button
              variant="contained"
              style={{marginLeft: "auto"}}
              onClick={handleTakeButtonClick}
            >{takeButtonTitle}</Button>
          </div>

          <Typography variant="h6">Taken Books: {takedBooksCount}</Typography>

          {isBookChoice &&
            <BooksList
              books={freeBooks}
              mode={BooksListMode.BOOK_CHOICE}
              onBookButtonClick={handleTakeBookButtonClick}
          />}

          {!isBookChoice && !!takedBooksCount &&
            <BooksList
              books={takedBooks}
              mode={BooksListMode.TAKED_BOOKS}
              onBookButtonClick={handleReturnBookButtonClick}
          />}
        </div>
      </div>
    </>
  );
};
