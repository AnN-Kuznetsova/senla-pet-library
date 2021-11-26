type ErrorType = unknown & {status: string | number | null};

interface NewBookType {
  [key: string]: unknown,
  title: string,
  autor: string,
  coverImgUrl: string | ArrayBuffer | null,
}

type BookType = NewBookType & {
  id: string,
  isTaken: boolean,
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
