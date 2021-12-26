import * as moment from "moment";


type ErrorType = unknown & {status: string | number | null};

interface BookTakenStatusType {
  id: string,
  dateOfTaking: moment.Moment | null,
}

interface BookType {
  [key: string]: unknown,
  id: string,
  title: string,
  autor: string,
  coverImgUrl: string | ArrayBuffer | null,
}

interface ReaderType {
  [key: string]: unknown,
  id: string,
  name: string,
  age: string,
  books: BookTakenStatusType[],
}

interface FilterType {
  [key: string]: string,
}


export {
  BookType,
  ErrorType,
  FilterType,
  ReaderType,
  BookTakenStatusType,
};
