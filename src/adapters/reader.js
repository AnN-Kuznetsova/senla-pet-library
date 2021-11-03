const createReader = (readerData) => {
  return {
    id: readerData.id,
    name: readerData.name,
    age: readerData.age,
    booksIds: readerData.booksIds.map((bookId) => bookId),
  };
};

const createReaders = (readersData) => {
  return readersData.map((readerData) => createReader(readerData));
};


export {
  createReader,
  createReaders,
};
