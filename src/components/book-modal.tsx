import * as React from "react";

import {BookType} from "../types";


interface PropsType {
  book: BookType,
}


export const BookModal: React.FC<PropsType> = (props: PropsType) => {
  const {book} = props;

  return (
    <h2>{book.title}</h2>
  );
};
