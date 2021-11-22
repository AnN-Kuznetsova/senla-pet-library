import type {ReaderType} from "../types";


export interface ReaderDataType {
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


export {
  createReader,
  createReaders,
};
