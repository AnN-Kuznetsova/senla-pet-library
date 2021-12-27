import * as React from "react";
import * as moment from "moment";
import {useSelector} from "react-redux";

import {formatDate, getTimeToRead} from "../utils";
import {getTakenStatusById} from "../store/books/selectors";
import type {RootStateType} from "..";


export enum BookTakenInfoMode {
  DEFAULT,
  TAKED,
}


interface PropsType {
  dateOfTaking: moment.Moment,
  mode: BookTakenInfoMode,
}


export const BookTakenInfo: React.FC<PropsType> = (props: PropsType) => {
  const {
    dateOfTaking,
    mode,
  } = props;

  const timeToRead = getTimeToRead();
  const willBeReturnedAfter: moment.Duration = dateOfTaking ? moment.duration(dateOfTaking.clone().add(timeToRead).diff(moment())) : null;

  const willBeReturnedStr = willBeReturnedAfter ?
    willBeReturnedAfter.days() >= 0 ? <>Will be returned after <b style={{color: "green"}}>{willBeReturnedAfter.humanize()}</b></>
    : <>Delay return for <b style={{color: "red"}}>{willBeReturnedAfter.humanize()}</b></>
    : null;

  return (
    <span style={{
      display: "block",
      marginRight: "100px",
      minWidth: "200px"
    }}>
      {mode === BookTakenInfoMode.DEFAULT &&
        <span
          className="book-modal__is-taken"
          style={{color: dateOfTaking ? `red` : `green`}}
        >{dateOfTaking ? `Is taken` : `Free`}</span>
      }

      {dateOfTaking && <span className="new-line">Date of taking: <b>{formatDate(dateOfTaking)}</b></span>}
      {willBeReturnedStr && <span className="new-line">{willBeReturnedStr}</span>}
    </span>
  );
};


export const useBookTakenInfo = (bookId: string) => {
  const bookStatus = useSelector((state: RootStateType) => getTakenStatusById(state, bookId));
  const dateOfTaking = bookStatus ? bookStatus.dateOfTaking : null;

  const getBookStatus = () => (bookStatus);

  const renderBookTakenInfo = (mode: BookTakenInfoMode) => (
    <BookTakenInfo
      dateOfTaking={dateOfTaking}
      mode={mode}
    />
  );

  return {
    getBookStatus,
    renderBookTakenInfo,
  };
};
