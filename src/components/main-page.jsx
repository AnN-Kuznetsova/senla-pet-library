import React from "react";
import {Button} from "@mui/material";
import {connect} from "react-redux";

import {BooksList} from "./books-list";
import {FetchStatus} from "../api";
import {changeBooksListShowed} from "../store/application/application";
import {getBooks, getBooksError, getBooksStatus} from "../store/books/selectors";
import {getIsBooksListShow} from "../store/application/selectors";


const MainPageComponent = (props) => {
  const {
    books,
    booksError,
    booksStatus,
    isBooksListShow,
    onShowBooksButtonClick,
  } = props;

  return (
    <main>
      <Button
        variant="contained"
        disabled={booksError && true}
        onClick={onShowBooksButtonClick}
      >
        {isBooksListShow && `Hide books list` || `Show books list`}
      </Button>

      {booksStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {booksError && <h2>Error: {booksError}</h2>}

      {isBooksListShow && <BooksList books={books} />}
    </main>
  );
};


const mapStateToProps = (state) => ({
  books: getBooks(state),
  booksStatus: getBooksStatus(state),
  booksError: getBooksError(state),
  isBooksListShow: getIsBooksListShow(state),
});

const mapDispatchToProps = (dispatch) => ({
  onShowBooksButtonClick() {
    dispatch(changeBooksListShowed());
  },
});

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);


export {
  MainPageComponent,
  MainPage,
};
