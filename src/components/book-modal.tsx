import * as React from "react";

import type {BookType} from "../types";


interface PropsType {
  book: BookType,
}


export const BookModal: React.FC<PropsType> = (props: PropsType) => {
  const {book} = props;

  return (
    <div className="book-modal">
      <div className="book-modal--img  img-wrapper">
        <img src={book.coverImgUrl ? `./assets/img/${book.coverImgUrl}` : `./assets/img/sass-logo.png`} />
      </div>

      <div className="book-modal--info">
        <h2>{book.title}</h2>
        <p>{book.autor}
          <span
            className="book-is-taken"
            style={{color: book.isTaken ? `red` : `green`}}
          >{book.isTaken ? `Is taken` : `Free`}</span>
        </p>
      </div>
    </div>
  );
};
