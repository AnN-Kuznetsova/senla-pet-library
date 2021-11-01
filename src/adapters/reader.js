const createReader = (readerData) => {
  return {
    id: readerDataId,
    name: readerData.name,
    age: readerData,age,
    booksIds: readerData.booksIds.map((booksId) => booksId),
  };
};

const createReaders = (readersData) => {
  return readersData.map((readerData) => createReader(readerData));
};


export {
  createReader,
  createReaders,
};
