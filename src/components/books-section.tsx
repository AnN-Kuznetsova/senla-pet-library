import * as React from "react";
import {Button, Stack} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useCallback, useState, useEffect} from "react";

import {BooksFilterForm} from "./books-filter-form";
import {BooksList} from "./books-list/books-list";
import {FetchOperation, FetchStatus} from "../const";
import {Info, InfoType} from "./info";
import {Modal} from "./modal";
import {NewBookModal} from "./new-book-modal";
import {getBooksError, getBooksOperation, getBooksStatus} from "../store/books/selectors";
import {getFilteredBooks} from "../store/application/selectors";
import {resetBooksStatus} from "../store/books/books";
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

  const [modalChildren, setModalChildren] = useState<JSX.Element>(<></>);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isBooksListShow, changeIsBooksListShow] = useState(false);

  const onModalOpen = (children: React.ReactElement<JSX.Element>) => {
    setModalChildren(children);
    setIsModalOpen(true);
  };

  const onModalClose = useCallback(() => {
    setIsModalOpen(false);
    dispatch(resetBooksStatus());
  }, [dispatch]);

  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  const handleAddNewBookButtonClick = () => {
    onModalOpen(<NewBookModal />);
  };

  useEffect(() => {
    if (booksOperation === FetchOperation.DELETE) {
      switch (booksStatus) {
        case FetchStatus.LOADING:
          if (isWaitShow) {
            onModalOpen(<Info type={InfoType.WAIT} />);
          }
          break;

        case FetchStatus.REJECTED:
          onModalOpen(<Info type={InfoType.ERROR} />);
          break;

        case FetchStatus.RESOLVED:
          onModalClose();
          break;
      }
    }
  }, [booksOperation, booksStatus, isWaitShow, onModalClose]);

  useEffect(() => {
    if (booksOperation === FetchOperation.ADD_NEW) {
      switch (booksStatus) {
        case FetchStatus.RESOLVED:
          onModalClose();
        break;
      }
    }
  }, [booksOperation, booksStatus, onModalClose]);

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
        <React.Fragment>
          <BooksFilterForm />
          <BooksList
            books={books}
            openModal={onModalOpen}
          />
        </React.Fragment>
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
