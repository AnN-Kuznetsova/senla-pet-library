const createBook = (bookData) => {
  return {
    id: bookData.id,
    title: bookData.title,
    autor: bookData.autor,
    coverImgUrl: bookData.coverImgUrl,
    isTaken: bookData.isTaken,
  };
};

const createBooks = (booksData) => {
  return booksData.map((bookData) => createBook(bookData));
};


export {
  createBook,
  createBooks,
};
