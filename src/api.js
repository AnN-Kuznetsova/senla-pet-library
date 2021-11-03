import axios from "axios";


export const FetchStatus = {
  LOADING: `LOADING`,
  RESOLVED: `RESOLVED`,
  REJECTED: `REJECTED`,
};


export const createAPI = (onFailRequest=()=>{}) => {
  const api = axios.create({
    baseURL: location.origin,
    timeout: 1000 * 5,
    withCredentials: true,
  });

  const onSuccess = (response) => {
    return response;
  };

  const onFail = (error) => {
    onFailRequest(error);

    throw error;
  };

  api.interceptors.response.use(onSuccess, onFail);

  return api;
};
