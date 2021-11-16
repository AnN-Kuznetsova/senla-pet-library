import * as React from "react";
import {Button, Stack, List, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {BookType} from "../types";
import {ItemButton} from "./item-button";
import {FetchStatus} from "../api";
import {addNewBook, deleteBook} from "../store/books/books";
import {getBooks, getBooksError, getBooksStatus} from "../store/books/selectors";
import { BookModal } from "./book-modal";
import { Modal } from "./modal";


export const BooksSection: React.FC = () => {
  const books = useSelector(getBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);
  const dispatch = useDispatch();

  const [isBooksListShow, changeIsBooksListShow] = useState(false);
  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  const handleDeleteBookButtonClick = (bookId: string) => {
    dispatch(deleteBook(bookId));
  };

  const [activeBook, setActiveBook] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleMoreButtonClick = (book: BookType) => {
    setActiveBook(book);
    setIsModalOpen(true);
  };

  const handleAddNewBookButtonClick = () => {
    const newBook = {
      "title": "new Book",
      "autor": "new Autor",
      "coverImgUrl": "",
    };

    dispatch(addNewBook(newBook));
  };

  const handleModalClose = () => {
    setActiveBook(null);
    setIsModalOpen(false);
  };

  console.log(isModalOpen);

  return (
    <Stack className="section">
      <Button
        variant="contained"
        disabled={booksError && true || !books.length}
        onClick={handleShowBooksButtonClick}
      >
        {isBooksListShow && `Hide books list` || `Show books list`}
      </Button>
      <Button
        variant="contained"
        disabled={booksError && true || !books.length}
        onClick={handleAddNewBookButtonClick}
      >+</Button>

      {booksStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {booksError && <h2>Sorry! Books have not loaded!
        {booksError.status && <br/>}
        {booksError.status && booksError.status}
      </h2>}

      {isBooksListShow &&
        <List>{
          books.map((book, index) => (
            <ListItem key={index + book.id}>
              <ListItemText
                primary={book.title}
                secondary={book.autor}
                style={{color: `${book.isTaken ? `red` : `black`}`}}
              />
              <ItemButton
                textValue="..."
                onClick={handleMoreButtonClick.bind(null, book)}
              />
              <ItemButton
                textValue="-"
                onClick={handleDeleteBookButtonClick.bind(null, book.id)}
              />
            </ListItem>
          ))
        }</List>
      }

      {isModalOpen &&
        <Modal
          isOpen={isModalOpen}
          onClose={handleModalClose}
        >
          <BookModal book={activeBook} />
        </Modal>}
    </Stack>
  );
};
