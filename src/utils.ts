import * as moment from "moment";
import {debounce} from "lodash/fp";
import {useEffect, useRef, useState} from "react";

import {DEBOUNCE_DELAY, WAIT_DELAY, FetchStatus, TIME_TO_READ} from "./const";
import type {CreateFilterType} from "./types";


const debounced = (func: ()=>unknown) => debounce(DEBOUNCE_DELAY, func);

const getTimeToRead = (): moment.Duration => {
  return moment.duration(TIME_TO_READ, `days`);
};

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
    }, WAIT_DELAY);
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

const getFilteredEntities = <Type>(entities: Type[], filter: CreateFilterType<Type>): Type[] => {
  let filteredEntities = entities.slice();

  for (const filterKey in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, filterKey)) {
      const filterValue: string = filter[filterKey] as unknown as string;

      if (filterValue) {
        filteredEntities = filteredEntities.filter((entity): boolean => {
          const entityFilterValue: string = entity[filterKey] as unknown as string;
          return entityFilterValue.toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    }
  }

  return filteredEntities;
};

const formatDate = (date: moment.Moment | null): string | null => {
  return date ? date.format(`DD MMMM YYYY`) : null;
};


export {
  createErrorValue,
  debounced,
  formatDate,
  getFilteredEntities,
  getTimeToRead,
  useWaitShow,
};
