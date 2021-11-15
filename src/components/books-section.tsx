import * as React from "react";
import {Button, Stack, List, ListItem, ListItemText} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";
import {useState} from "react";

import {FetchStatus} from "../api";
import {addNewBook} from "../store/books/books";
import {getBooks, getBooksError, getBooksStatus} from "../store/books/selectors";


export const BooksSection: React.FC = () => {
  const books = useSelector(getBooks);
  const booksStatus = useSelector(getBooksStatus);
  const booksError = useSelector(getBooksError);

  const dispatch = useDispatch();
  const handleAddNewButtonClick = () => {
    const newBook = {
      "title": "new Book",
      "autor": "new Autor",
      "coverImgUrl": "",
    };

    dispatch(addNewBook(newBook));
  };

  const [isBooksListShow, changeIsBooksListShow] = useState(false);

  const handleShowBooksButtonClick = () => {
    changeIsBooksListShow((isBooksListShow) => !isBooksListShow);
  };

  return (
    <Stack>
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
        onClick={handleAddNewButtonClick}
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
              <ListItemText primary={book.title} style={{color: `${book.isTaken ? `red` : `black`}`}} secondary={book.autor} />
            </ListItem>
          ))
        }</List>
      }
    </Stack>
  );
};
