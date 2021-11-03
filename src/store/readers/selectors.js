const getReadersInfo = (state) => ({
  list: state.readers.list,
  status: state.readers.status,
  error: state.readers.error,
});


export {
  getReadersInfo,
};
