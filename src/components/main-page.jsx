import React, {useState} from "react";
import {Button} from "@mui/material";
import {useSelector} from "react-redux";

import {BooksList} from "./books-list";
import {FetchStatus} from "../api";
import { getBooks, getBooksError, getBooksStatus } from "../store/books/selectors";


export const MainPage = () => {
  const books = useSelector(getBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);

  const [isBooksListShow, changeIsBooksListShow] = useState(false);

  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow(!isBooksListShow);
  };

  return (
    <main>
      <Button
        variant="contained"
        disabled={booksError && true}
        onClick={handleShowBooksButtonClick}
      >
        {isBooksListShow && `Hide books list` || `Show books list`}
      </Button>

      {booksStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {booksError && <h2>Error: {booksError}</h2>}

      {isBooksListShow && <BooksList books={books} />}
    </main>
  );
};
