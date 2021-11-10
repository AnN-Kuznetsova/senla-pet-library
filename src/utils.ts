import { ErrorType } from "./types";


const createErrorValue = (error: {
  name: string,
  message: string,
  response?: {status: number}
}): ErrorType => {
  return {
    name: error.name,
    message: error.message,
    status: error.response ? error.response.status : `Timeout`,
  };
};


export {
  createErrorValue,
};
