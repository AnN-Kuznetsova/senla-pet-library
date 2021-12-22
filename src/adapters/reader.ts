import * as moment from "moment";

import type {ReaderType} from "../types";


export const DATE_FORMAT = `YYYY-MM-DD`;


interface ReaderDataType {
  id: string,
  name: string,
  age: string,
  books: {
    id: string,
    dateOfTaking: string | null,
  }[],
}


const createReader = (readerData: ReaderDataType): ReaderType => {
  return {
    id: readerData.id,
    name: readerData.name,
    age: readerData.age,
    books: readerData.books.map((book) => ({
      id: book.id,
      dateOfTaking: book.dateOfTaking ? moment(book.dateOfTaking, DATE_FORMAT) : null,
    })),
  };
};

const createReaders = (readersData: ReaderDataType[]): ReaderType[] => {
  return readersData.map((readerData) => createReader(readerData));
};

const toRAWReader = (reader: ReaderType): ReaderDataType => {
  return {
    "id": reader.id,
    "name": reader.name,
    "age": reader.age,
    "books": reader.books.map((book) => ({
      "id": book.id,
      "dateOfTaking": book.dateOfTaking ? book.dateOfTaking.format(DATE_FORMAT) : null,
    })),
  };
};


export {
  createReader,
  createReaders,
  toRAWReader,
  ReaderDataType,
};
