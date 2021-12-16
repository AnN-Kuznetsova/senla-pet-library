import type {ReaderType} from "../types";


interface ReaderDataType {
  id: string,
  name: string,
  age: string,
  booksIds: string[],
}


const createReader = (readerData: ReaderDataType): ReaderType => {
  return {
    id: readerData.id,
    name: readerData.name,
    age: readerData.age,
    booksIds: readerData.booksIds.map((bookId) => bookId),
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
    "booksIds": reader.booksIds.map((id) => id),
  };
};


export {
  createReader,
  createReaders,
  toRAWReader,
  ReaderDataType,
};
