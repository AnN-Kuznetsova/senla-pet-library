import * as React from "react";
import {ListItemText} from "@mui/material";
import {useDispatch} from "react-redux";
import {useSelector} from "react-redux";

import {BookModal} from "./book-modal";
import {ItemButton, ItemButtonMode} from "./item-button/item-button";
import {deleteBook} from "../store/books/books";
import {getTakenStatusById} from "../store/books/selectors";
import type {BookType} from "../types";
import type {RootStateType} from "..";


interface PropsType {
  book: BookType,
  openModal: (children: React.ReactElement) => void,
}


export const BooksListItem: React.FC<PropsType> = (props: PropsType) => {
  const {
    book,
    openModal,
  } = props;

  const dispatch = useDispatch();
  const bookStatus = useSelector((state: RootStateType) => getTakenStatusById(state, book.id));

  const handleDeleteBookButtonClick = (bookId: string) => {
    dispatch(deleteBook(bookId));
  };

  const handleMoreButtonClick = (book: BookType) => {
    openModal(<BookModal bookId={book.id} />);
  };

  return (
    <>
      <ListItemText
        primary={book.title}
        secondary={book.autor}
        style={{color: `${bookStatus ? `red` : `black`}`}}
      />
      <ItemButton
        onClick={handleMoreButtonClick.bind(null, book)}
        className={ItemButtonMode.MORE}
      />
      <ItemButton
        onClick={handleDeleteBookButtonClick.bind(null, book.id)}
        isDisabled={!!bookStatus}
        className={ItemButtonMode.DELETE}
      />
    </>
  );
};
