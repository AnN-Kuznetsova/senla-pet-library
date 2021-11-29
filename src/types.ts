import * as moment from "moment";

type ErrorType = unknown & {status: string | number | null};

interface NewBookType {
  [key: string]: unknown,
  title: string,
  autor: string,
  coverImgUrl: string | ArrayBuffer | null,
}

type BookType = NewBookType & {
  id: string,
  dateOfTaking: moment.Moment | null,
}


interface ReaderType {
  [key: string]: unknown,
  id: string,
  name: string,
  age: string,
  booksIds: string[],
}


export {
  NewBookType,
  BookType,
  ErrorType,
  ReaderType,
};
