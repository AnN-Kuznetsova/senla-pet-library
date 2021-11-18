import * as React from "react";
import {Button, Stack, List, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {BookModal} from "./book-modal";
import {BookType} from "../types";
import {ErrorComponent} from "./error-component";
import {FetchStatus} from "../api";
import {ItemButton} from "./item-button";
import {Modal, closeModal} from "./modal";
import {NewBookModal} from "./new-book-modal";
import {Wait} from "./wait";
import {deleteBook, resetBooksStatus} from "../store/books/books";
import {getBooks, getBooksAddNewError, getBooksDeleteError, getBooksLoadError, getBooksStatus} from "../store/books/selectors";


export const BooksSection: React.FC = () => {
  const dispatch = useDispatch();
  useEffect(() => {
    dispatch(resetBooksStatus());
  }, [dispatch]);

  const books = useSelector(getBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksLoadError = useSelector(getBooksLoadError);
  const booksDeleteError = useSelector(getBooksDeleteError);
  const booksAddNewError = useSelector(getBooksAddNewError);

  const [modalChildren, setModalChildren] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const [isBooksListShow, changeIsBooksListShow] = useState(false);
  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalClose = () => {
    closeModal();
    handleModalClose();
  };

  const handleDeleteBookButtonClick = (bookId: string) => {
    setModalChildren(<Wait />);
    setIsModalOpen(true);
    dispatch(deleteBook({
      bookId,
      cb: onModalClose,
    }));
  };

  const handleMoreButtonClick = (book: BookType) => {
    setModalChildren(<BookModal book={book} />);
    setIsModalOpen(true);
  };

  const handleAddNewBookButtonClick = () => {
    dispatch(resetBooksStatus());
    setModalChildren(<NewBookModal />);
    setIsModalOpen(true);
  };

  useEffect(() => {
    if (booksDeleteError) {
      setModalChildren(<ErrorComponent />);
      setIsModalOpen(true);
    }
  }, [booksDeleteError]);

  useEffect(() => {
    if (booksStatus === FetchStatus.RESOLVED && !booksAddNewError) {
      onModalClose();
      dispatch(resetBooksStatus());
    }
  });

  return (
    <Stack className="section">
      <Button
        variant="contained"
        disabled={booksLoadError && true || !books.length}
        onClick={handleShowBooksButtonClick}
      >
        {isBooksListShow && `Hide books list` || `Show books list`}
      </Button>
      <Button
        variant="contained"
        disabled={booksLoadError && true || !books.length}
        onClick={handleAddNewBookButtonClick}
      >+</Button>

      {booksStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {booksLoadError && <h2>Sorry! Books have not loaded!
        {booksLoadError.status && <br/>}
        {booksLoadError.status && booksLoadError.status}
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
