import * as moment from "moment";

import type {BookType} from "../types";


export interface BookDataType {
  id: string,
  title: string,
  autor: string,
  coverImgUrl: string | ArrayBuffer,
  options: {
    isTaken: boolean,
    dateOfTaking: string | null,
  },
}


const createBook = (bookData: BookDataType): BookType => {
  return {
    id: bookData.id,
    title: bookData.title,
    autor: bookData.autor,
    coverImgUrl: bookData.coverImgUrl,
    options: {
      isTaken: bookData.options.isTaken,
      dateOfTaking: bookData.options.dateOfTaking ? moment(bookData.options.dateOfTaking) : null,
    },
  };
};

const createBooks = (booksData: BookDataType[]): BookType[] => {
  return booksData.map((bookData) => createBook(bookData));
};


export {
  createBook,
  createBooks,
};
