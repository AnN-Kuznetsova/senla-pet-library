import * as React from "react";
import {ListItem} from "@mui/material";
import {useSelector} from "react-redux";

import {ItemButton, ItemButtonMode} from "./item-button/item-button";
import {getBookById} from "../store/books/selectors";
import type {BookTakenStatusType} from "../types";


interface PropsType {
  bookStatus: BookTakenStatusType,
  onReturnBookButtonClick: () => void,
}


export const ReaderModalBookItem: React.FC<PropsType> = (props: PropsType) => {
  const {
    bookStatus,
    onReturnBookButtonClick,
  } = props;

  const book = useSelector(getBookById(bookStatus.id));

  return (
    <ListItem>
      {book.title}

      <ItemButton
        className={`${ItemButtonMode.ON_RIGHT} ${ItemButtonMode.WARNING}`}
        textValue="Return"
        onClick={onReturnBookButtonClick}
      />
    </ListItem>
  );
};
