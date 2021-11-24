import {useEffect, useRef, useState} from "react";

import {WAIT_SHOW_DELAY, FetchStatus} from "./const";


const createErrorValue = (error: unknown & {response?: object, request: XMLHttpRequest, message: string}) => {
  if (error.response) {
    return error.response;
  } else if (error.request) {
    return error.request;
  } else {
    return error.message;
  }
};

const useWaitShow = (status: string | null): boolean => {
  const [isWaitShow, setIsWaitShow] = useState(false);
  const waitTimerRef =  useRef(null);

  const createTimer = () => {
    waitTimerRef.current = setTimeout(() => {
      setIsWaitShow(true);
    }, WAIT_SHOW_DELAY);
  };

  const clearTimer = () => {
    if (waitTimerRef.current) {
      clearTimeout(waitTimerRef.current);
    }
  };

  useEffect(() => {
    if (status && status.includes(FetchStatus.LOADING)) {
      createTimer();
    } else {
      clearTimer();
      setIsWaitShow(false);
    }
    return clearTimer;
  }, [status]);

  return isWaitShow;
};


export {
  createErrorValue,
  useWaitShow,
};
