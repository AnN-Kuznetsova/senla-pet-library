import type {BookType} from "../types";


interface BookDataType {
  id: string;
  title: string;
  autor: string;
  coverImgUrl: string | ArrayBuffer;
}


const createBook = (bookData: BookDataType): BookType => {
  return {
    id: bookData.id,
    title: bookData.title,
    autor: bookData.autor,
    coverImgUrl: bookData.coverImgUrl,
  };
};

const createBooks = (booksData: BookDataType[]): BookType[] => {
  return booksData.map((bookData) => createBook(bookData));
};

const toRAWBook = (book: BookType): BookDataType => {
  return {
    "id": book.id ? book.id : ``,
    "title": book.title,
    "autor": book.autor,
    "coverImgUrl": book.coverImgUrl,
  };
};


export {
  createBook,
  createBooks,
  toRAWBook,
  BookDataType,
};
