import React from "react";
import {Button} from "@mui/material";
import {connect} from "react-redux";

import {BooksList} from "./books-list";
import {FetchStatus} from "../api";
import {getBooks, getBooksError, getBooksStatus} from "../store/books/selectors";


const MainPageComponent = (props) => {
  const {
    books,
    booksError,
    booksStatus,
  } = props;

  return (
    <main>
      <Button
        variant="contained"
        disabled={booksError && true}
        // onClick={renderBooksList}
      >
        Show books list
      </Button>

      {booksStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {booksError && <h2>Error: {booksError}</h2>}
    </main>
  );
};


const mapStateToProps = (state) => ({
  books: getBooks(state),
  booksStatus: getBooksStatus(state),
  booksError: getBooksError(state),
});

const mapDispatchToProps = (dispatch) => ({

});

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);


export {
  MainPageComponent,
  MainPage,
};
