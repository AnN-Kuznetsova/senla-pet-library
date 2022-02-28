import * as moment from "moment";


type ErrorType = unknown & {status: string | number | null};

interface BookTakenStatusType {
  id: string;
  dateOfTaking: moment.Moment | null;
}

interface BookType {
  [key: string]: unknown;
  id: string;
  title: string;
  autor: string;
  coverImgUrl: string | ArrayBuffer | null;
}

interface ReaderType {
  [key: string]: unknown;
  id: string;
  name: string;
  age: string;
  books: BookTakenStatusType[];
}

type CreateFilterType<Type> = {
  [Property in keyof Type]?: Type[Property];
};

type BookFilterType = CreateFilterType<BookType>;

export {
  BookType,
  BookFilterType,
  CreateFilterType,
  ErrorType,
  ReaderType,
  BookTakenStatusType,
};
