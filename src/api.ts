import axios, {AxiosInstance} from "axios";


export enum FetchStatus {
  LOADING = `LOADING`,
  RESOLVED = `RESOLVED`,
  REJECTED = `REJECTED`,
}

export enum FetchOperation {
  LOAD = `LOAD`,
  ADD_NEW = `ADD_NEW`,
  UPDATE = `UPDATE`,
  DELETE = `DELETE`,
}


export const createAPI = (onFailRequest?: (error: Error) => void): AxiosInstance => {
  const api = axios.create({
    baseURL: location.origin,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = <T>(response: T ) => {
    return response;
  };

  const onFail = (error: Error): void => {
    onFailRequest && onFailRequest(error);

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
