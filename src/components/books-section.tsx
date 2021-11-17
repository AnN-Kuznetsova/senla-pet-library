import * as React from "react";
import {Button, Stack, List, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {BookModal} from "./book-modal";
import {BookType} from "../types";
import {ItemButton} from "./item-button";
import {FetchStatus} from "../api";
import {Modal, closeModal} from "./modal";
import {NewBookModal} from "./new-book-modal";
import {Wait} from "./wait";
import {deleteBook} from "../store/books/books";
import {getBooks, getBooksError, getBooksStatus} from "../store/books/selectors";


export const BooksSection: React.FC = () => {
  const books = useSelector(getBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);
  const dispatch = useDispatch();

  const [modalChildren, setModalChildren] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBooksListShow, changeIsBooksListShow] = useState(false);
  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  const handleDeleteBookButtonClick = (bookId: string) => {
    setModalChildren(<Wait />);
    setIsModalOpen(true);
    dispatch(deleteBook({
      bookId,
      cb: closeModal,
    }));
  };

  const handleMoreButtonClick = (book: BookType) => {
    setModalChildren(<BookModal book={book} />);
    setIsModalOpen(true);
  };

  const handleAddNewBookButtonClick = () => {
    setModalChildren(<NewBookModal />);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

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
                onClick={handleMoreButtonClick.bind(null, book)}
                className="item-button--more"
              />
              <ItemButton
                onClick={handleDeleteBookButtonClick.bind(null, book.id)}
                className="item-button--delete"
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
          {modalChildren}
        </Modal>}
    </Stack>
  );
};
