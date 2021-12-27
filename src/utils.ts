import * as moment from "moment";
import {debounce} from "lodash/fp";
import {useEffect, useRef, useState} from "react";

import {DEBOUNCE_DELAY, WAIT_DELAY, FetchStatus, TIME_TO_READ} from "./const";
import type {BookFilterType, BookType} from "./types";


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

/*const getFilteredEntities = <Type extends FilterType>(entities: Type[], filters: FilterType): Type[]  => {
  let filteredEntities = entities.slice();

  /* for (const filter in filters) {
    if (Object.prototype.hasOwnProperty.call(filters, filter)) {
      const filterValue = filters[filter];

      if (filterValue) {
        filteredEntities = filteredEntities.filter((entity): boolean => {
          const entityFilterValue: string = <string>entity[filter];
          return entityFilterValue.toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    }
  } *//*

  return filteredEntities;
}; */

const getFilteredBooks = (books: BookType[], filter: BookFilterType): BookType[] => {
  let filteredBooks = books.slice();

  for (const filterKey in filter) {
    if (Object.prototype.hasOwnProperty.call(filter, filterKey)) {
      const filterValue: string = <string>filter[filterKey];

      if (filterValue) {
        filteredBooks = filteredBooks.filter((book): boolean => {
          const bookFilterValue: string = <string>book[filterKey];
          return bookFilterValue.toLowerCase().includes(filterValue.toLowerCase());
        });
      }
    }
  }

  return filteredBooks;
};


export {
  createErrorValue,
  debounced,
  getFilteredBooks,
  //getFilteredEntities,
  getTimeToRead,
  useWaitShow,
};
