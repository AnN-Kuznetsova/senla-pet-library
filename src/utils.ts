const createErrorValue = (error: unknown & {response?: object, request: XMLHttpRequest, message: string}) => {
  if (error.response) {
    return error.response;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};


export {
  createErrorValue,
};
