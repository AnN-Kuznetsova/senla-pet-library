type ErrorType = unknown & {status: string | number | null};

interface BookType {
  id: string,
  title: string,
  autor: string,
  coverImgUrl: string,
  isTaken: boolean,
}

interface ReaderType {
  id: string,
  name: string,
  age: string,
  booksIds: string[],
}


export {
  BookType,
  ErrorType,
  ReaderType,
};
