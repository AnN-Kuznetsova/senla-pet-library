import * as React from "react";
import {List, ListItem, Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {BookCover} from "./book-cover";
import {BookInfoForm} from "./book-info-form";
import {FormButtonControlls, FormButtonControllsType} from "./form-button-controls";
import {getBookById, getBooksByIds} from "../store/books/selectors";
import {getTimeToRead} from "../utils";
import moment = require("moment");
import { getReaderById } from "../store/readers/selectors";
import { BookType } from "../types";
import { RootStateType } from "..";
import { ItemButton } from "./item-button/item-button";
import { updateReader } from "../store/readers/readers";


interface PropsType {
  readerId: string,
}


const formatDate = (date: moment.Moment | null): string | null => {
  return date ? date.format(`Do MMMM YYYY`) : null;
};


export const ReaderModal: React.FC<PropsType> = (props: PropsType) => {
  const {readerId} = props;

  const dispatch = useDispatch();

  const reader = useSelector(getReaderById(readerId));
  const takenBooksCount = reader.booksIds.length;
  const takenBooks: BookType[] | null = useSelector((state: RootStateType) => getBooksByIds(state, reader.booksIds));

  //const [isChange, setIsChange] = useState(false);

  const handleReturnBookButtonClick = (bookId: string) => {
    const newBooksIds = reader.booksIds.filter((id) => id !== bookId);

    dispatch(updateReader(Object.assign({}, reader, {booksIds: newBooksIds})));
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
            {takenBooks &&
              <List>
                {takenBooks.map((book, index) => (
                  <ListItem key={book.id + index}>
                    {book.title}

                    <ItemButton
                      textValue="Return"
                      onClick={handleReturnBookButtonClick.bind(null, book.id)}
                    />
                  </ListItem>
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
