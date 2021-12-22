import * as React from "react";
import {ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

import {BooksListMode} from "./books-list/books-list";
import {BookModal} from "./book-modal";
import {ItemButton, ItemButtonMode} from "./item-button/item-button";
import {deleteBook} from "../store/books/books";
import {getTakenStatusById} from "../store/books/selectors";
import type {BookType} from "../types";
import type {RootStateType} from "..";


interface PropsType {
  book: BookType,
  mode: BooksListMode,
  onBookButtonClick: (prop: unknown) => void,
}


export const BooksListItem: React.FC<PropsType> = (props: PropsType) => {
  const {
    book,
    mode,
    onBookButtonClick,
  } = props;

  const dispatch = useDispatch();
  const bookStatus = useSelector((state: RootStateType) => getTakenStatusById(state, book.id));
  const textColor = bookStatus && mode === BooksListMode.DEFAULT ? `red` : `black`;

  const handleDeleteBookButtonClick = (bookId: string) => {
    dispatch(deleteBook(bookId));
  };

  const handleBookButtonClick = (book: BookType) => {
    if (mode === BooksListMode.DEFAULT) {
      onBookButtonClick(<BookModal bookId={book.id} />);
    } else {
      onBookButtonClick(book.id);
    }
  };

  return (
    <>
      <ListItemText
        primary={book.title}
        secondary={book.autor}
        style={{color: `${textColor}`}}
      />

      {mode === BooksListMode.DEFAULT && <>
        <ItemButton
          className={ItemButtonMode.MORE}
          onClick={handleBookButtonClick.bind(null, book)}
        />
        <ItemButton
          className={ItemButtonMode.DELETE}
          isDisabled={!!bookStatus}
          onClick={handleDeleteBookButtonClick.bind(null, book.id)}
        />
      </>}

      {mode === BooksListMode.TAKED_BOOKS &&
        <ItemButton
          className={ItemButtonMode.WARNING}
          textValue="Return"
          onClick={handleBookButtonClick.bind(null, book)}
        />
      }

      {mode === BooksListMode.BOOK_CHOICE &&
        <ItemButton
         className={ItemButtonMode.ON_RIGHT}
         textValue="Take"
         onClick={handleBookButtonClick.bind(null, book)}
      / >
      }
    </>
  );
};
