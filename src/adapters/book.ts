import * as moment from "moment";

import type {BookType, NewBookType} from "../types";


interface NewBookDataType {
  title: string,
  autor: string,
  coverImgUrl: string | ArrayBuffer,
}

interface BookDataType extends NewBookDataType {
  id: string,
  dateOfTaking: string | null,
}


const createBook = (bookData: BookDataType): BookType => {
  return {
    id: bookData.id,
    title: bookData.title,
    autor: bookData.autor,
    coverImgUrl: bookData.coverImgUrl,
    dateOfTaking: bookData.dateOfTaking ? moment(bookData.dateOfTaking) : null,
  };
};

const createBooks = (booksData: BookDataType[]): BookType[] => {
  return booksData.map((bookData) => createBook(bookData));
};

const toRAWNewBook = (book: NewBookType): NewBookDataType => {
  return {
    "title": book.title,
    "autor": book.autor,
    "coverImgUrl": book.coverImgUrl,
  };
};

const toRAWBook = (book: BookType): BookDataType => {
  return Object.assign(toRAWNewBook(book), {
    "id": book.id,
    "dateOfTaking": book.dateOfTaking ? book.dateOfTaking.toString() : null,
  });
};


export {
  createBook,
  createBooks,
  toRAWNewBook,
  toRAWBook,
  BookDataType,
  NewBookDataType,
};
