import React from "react";
import {List, ListItem, ListItemText} from "@mui/material";


export const BooksList = (props) => {
  const {books} = props;

  return (
    <List>
      {
        books.map((book, index) => (
          <ListItem key={index + book.id}>
            <ListItemText primary={book.title} secondary={book.autor} />
          </ListItem>
        ))
      }
    </List>
  );
};
