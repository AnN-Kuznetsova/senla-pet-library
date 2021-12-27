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
  //[key: string]: unknown,
  id: string,
  name: string,
  age: string,
  books: BookTakenStatusType[],
}

type CreateFilter<Type> = {
  [Property in keyof Type]?: Type[Property]
}

type BookFilterType = CreateFilter<BookType>


export {
  BookType,
  BookFilterType,
  ErrorType,
  ReaderType,
  BookTakenStatusType,
};
