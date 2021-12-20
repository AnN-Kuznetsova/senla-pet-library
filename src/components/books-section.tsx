import * as React from "react";
import {Button,Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState, useEffect} from "react";

import {BooksList} from "./books-list/books-list";
import {FetchOperation, FetchStatus} from "../const";
import {Info, InfoType} from "./info";
import {NewBookModal} from "./new-book-modal";
import {getBooksError, getBooksOperation, getBooksStatus} from "../store/books/selectors";
import {getFilteredBooks} from "../store/application/selectors";
import {resetBooksStatus} from "../store/books/books";
import {useModal} from "./modal";
import {useWaitShow} from "../utils";


export const BooksSection: React.FC = () => {
  const dispatch = useDispatch();
  const books = useSelector(getFilteredBooks)
  const booksOperation = useSelector(getBooksOperation);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);
  const isWaitShow = useWaitShow(booksStatus);

  const isLoading = booksOperation === FetchOperation.LOAD && booksStatus === FetchStatus.LOADING
  const isBooksNotLoad = booksOperation === FetchOperation.LOAD && booksStatus === FetchStatus.REJECTED;

  const [isBooksListShow, changeIsBooksListShow] = useState(false);
  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  const onModalClose = useCallback(() => {
    dispatch(resetBooksStatus());
  }, [dispatch]);

  const {
    renderModal,
    openModal,
    closeModal,
  } = useModal(onModalClose);

  const handleAddNewBookButtonClick = () => {
    openModal(<NewBookModal />);
  };

  useEffect(() => {
    if (booksOperation === FetchOperation.DELETE) {
      switch (booksStatus) {
        case FetchStatus.LOADING:
          if (isWaitShow) {
            openModal(<Info type={InfoType.WAIT} />);
          }
          break;

        case FetchStatus.REJECTED:
          openModal(<Info type={InfoType.ERROR} />);
          break;

        case FetchStatus.RESOLVED:
          closeModal();
          break;
      }
    }
  }, [booksOperation, booksStatus, isWaitShow, closeModal, openModal]);

  useEffect(() => {
    if (booksOperation === FetchOperation.ADD_NEW) {
      switch (booksStatus) {
        case FetchStatus.RESOLVED:
          closeModal();
        break;
      }
    }
  }, [booksOperation, booksStatus, closeModal]);

  return (
    <Stack className="section">
      <Button
        variant="contained"
        disabled={isLoading || !books.length}
        onClick={handleShowBooksButtonClick}
      >
        {isBooksListShow && `Hide books list` || `Show books list`}
      </Button>
      <Button
        variant="contained"
        disabled={isLoading || isBooksNotLoad}
        onClick={handleAddNewBookButtonClick}
      >+</Button>

      {isLoading && <h2>Loading...</h2>}

      {isBooksNotLoad && <h2>Sorry! Books have not loaded!
        {booksError && booksError.status && <br/>}
        {booksError && booksError.status && booksError.status}
      </h2>}

      {isBooksListShow &&
        <BooksList
          books={books}
          openModal={openModal}
        />}

      {renderModal()}
    </Stack>
  );
};
