import * as React from "react";
import {List, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {ReaderModalBookItem} from "./reader-modal-book-item";
import {getReaderById} from "../store/readers/selectors";
import {updateReader} from "../store/readers/readers";
import type {ReaderType} from "../types";


interface PropsType {
  readerId: string,
}


/* const formatDate = (date: moment.Moment | null): string | null => {
  return date ? date.format(`DD MMMM YYYY`) : null;
}; */


export const ReaderModal: React.FC<PropsType> = (props: PropsType) => {
  const {readerId} = props;

  const dispatch = useDispatch();

  const reader: ReaderType = useSelector(getReaderById(readerId));
  const takenBooksCount = reader.books.length;

  const handleReturnBookButtonClick = (bookId: string) => {
    const newBooks = reader.books.filter((book) => book.id !== bookId);

    dispatch(updateReader(Object.assign({}, reader, {books: newBooks})));
  };

  return (
    <>
      {/* isChange &&
        <BookInfoForm
          book={book}
          onCancelButtonClick={closeChangeWindow}
          onSubmit={closeChangeWindow}
        />
        || */
        <div className="reader-modal">
          <div className="reader-modal__info">
            <Typography variant="h5">{reader.name}</Typography>
            <p>age: {reader.age}</p>

            <Typography variant="h6">Taken Books: {takenBooksCount}</Typography>
            {!!takenBooksCount &&
              <List>
                {reader.books.map((book, index) => (
                  <ReaderModalBookItem
                    key={book.id + index}
                    bookStatus={book}
                    onReturnBookButtonClick={handleReturnBookButtonClick.bind(null, book.id)}
                  />
                ))}
              </List>
            }

            {/* <FormButtonControlls
              buttons={[{
                type: FormButtonControllsType.CHANGE,
                onClick: changeButtonClickHandler,
              }]}
            /> */}
          </div>
        </div>
      }
    </>
  );
};
