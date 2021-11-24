import axios, {AxiosInstance} from "axios";


export enum FetchStatus {
  LOADING = `LOADING`,
  WAIT = `WAIT`,
  REJECTED = `REJECTED`,
  FETCH_RESOLVED = `FETCH_RESOLVED`,
  FETCH_REJECTED = `FETCH_REJECTED`,
  ADD_NEW_RESOLVED = `ADD_NEW_RESOLVED`,
  //ADD_NEW_REJECTED = `ADD_NEW_REJECTED`,
  DELETE_RESOLVED = `DELETE_RESOLVED`,
  DELETE_REJECTED = `DELETE_REJECTED`,
  UPDATE_RESOLVED = `UPDATE_RESOLVED`,
  //UPDATE_REJECTED = `UPDATE_REJECTED`,
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
