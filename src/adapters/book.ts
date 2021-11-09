import {BookType} from "../types";


interface BookDataType {
  id: string,
  title: string,
  autor: string,
  coverImgUrl: string,
  isTaken: boolean,
}


const createBook = (bookData: BookDataType): BookType => {
  return {
    id: bookData.id,
    title: bookData.title,
    autor: bookData.autor,
    coverImgUrl: bookData.coverImgUrl,
    isTaken: bookData.isTaken,
  };
};

const createBooks = (booksData: BookDataType[]): BookType[] => {
  return booksData.map((bookData) => createBook(bookData));
};


export {
  createBook,
  createBooks,
};