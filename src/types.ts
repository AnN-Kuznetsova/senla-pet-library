type ErrorType = unknown & {status: string | number | null};

interface NewBookType {
  title: string,
  autor: string,
  coverImgUrl: string,
}

type BookType = NewBookType & {
  id: string,
  isTaken: boolean,
}


interface ReaderType {
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
