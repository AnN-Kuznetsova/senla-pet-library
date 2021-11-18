import * as React from "react";
import {Button, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {ErrorComponent} from "./error-component";
import {FetchStatus} from "../api";
import {Modal, closeModal} from "./modal";
import {NewBookModal} from "./new-book-modal";
import {resetBooksStatus} from "../store/books/books";
import {getBooks, getBooksAddNewError, getBooksDeleteError, getBooksLoadError, getBooksStatus} from "../store/books/selectors";
import { BooksList } from "./books-list";


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

  const openModal = (children: React.ReactElement) => {
    setModalChildren(children);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const onModalClose = () => {
    closeModal();
    handleModalClose();
  };

  const handleAddNewBookButtonClick = () => {
    dispatch(resetBooksStatus());
    openModal(<NewBookModal />);
  };

  useEffect(() => {
    if (booksDeleteError) {
      openModal(<ErrorComponent />);
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
        <BooksList
          books={books}
          openModal={openModal}
          closeModal={onModalClose}
        />
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
