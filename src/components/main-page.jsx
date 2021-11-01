import React from "react";
import {Button, List, ListItem, ListItemText} from "@mui/material";
import { connect } from "react-redux";
import { getBooks } from "../store/books/selectors";


const MainPageComponent = (props) => {
  const {books} = props;

  return (
    <main>
      <Button variant="contained">show books list</Button>

      <List>
        {
          books.map((book, index) => (
            <ListItem key={index + book.id}>
              <ListItemText primary={book.title} secondary={book.autor} />
            </ListItem>
          ))
        }
      </List>
    </main>
  );
};


const mapStateToProps = (state) => ({
  books: getBooks(state),
});

const mapDispatchToProps = (dispatch) => ({

});

const MainPage = connect(mapStateToProps, mapDispatchToProps)(MainPageComponent);


export {
  MainPageComponent,
  MainPage,
};
