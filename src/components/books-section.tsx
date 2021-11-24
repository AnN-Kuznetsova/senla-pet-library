import * as React from "react";
import {Button, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState, useEffect} from "react";

import {BooksList} from "./books-list";
import {ErrorComponent} from "./error-component";
import {FetchStatus} from "../api";
import {Modal} from "./modal";
import {NewBookModal} from "./new-book-modal";
import {getBooks, getBooksError, getBooksStatus} from "../store/books/selectors";
import {resetBooksStatus} from "../store/books/books";


export const BooksSection: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector(getBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);

  const [modalChildren, setModalChildren] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooksListShow, changeIsBooksListShow] = useState(false);

  const onModalOpen = (children: React.ReactElement) => {
    setModalChildren(children);
    setIsModalOpen(true);
  };

  const onModalClose = () => {
    setIsModalOpen(false);
  };

  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  const handleAddNewBookButtonClick = () => {
    onModalOpen(<NewBookModal />);
  };

  const isBooksNotLoad = booksStatus === FetchStatus.FETCH_REJECTED;

  useEffect(() => {
    if (booksStatus === FetchStatus.DELETE_REJECTED) {
      onModalOpen(<ErrorComponent />);
    }
  }, [booksStatus]);

  useEffect(() => {
    if (booksStatus === FetchStatus.ADD_NEW_RESOLVED) {
      onModalClose();
      dispatch(resetBooksStatus());
    }
  }, [booksStatus, dispatch]);

  return (
    <Stack className="section">
      <Button
        variant="contained"
        disabled={isBooksNotLoad || !books.length}
        onClick={handleShowBooksButtonClick}
      >
        {isBooksListShow && `Hide books list` || `Show books list`}
      </Button>
      <Button
        variant="contained"
        disabled={isBooksNotLoad || booksStatus === FetchStatus.LOADING}
        onClick={handleAddNewBookButtonClick}
      >+</Button>

      {booksStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {isBooksNotLoad && <h2>Sorry! Books have not loaded!
        {booksError && booksError.status && <br/>}
        {booksError && booksError.status && booksError.status}
      </h2>}

      {isBooksListShow &&
        <BooksList
          books={books}
          openModal={onModalOpen}
          closeModal={onModalClose}
        />
      }

      {isModalOpen &&
        <Modal
          onClose={onModalClose}
        >
          {modalChildren}
        </Modal>
      }
    </Stack>
  );
};
