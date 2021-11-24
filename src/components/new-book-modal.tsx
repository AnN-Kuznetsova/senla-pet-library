import * as React from "react";
import {Typography} from "@mui/material";
import {useDispatch, useSelector} from "react-redux";

import {BookInfoForm} from "./book-info-form";
import {ErrorComponent} from "./error-component";
import {FetchStatus} from "../api";
import {Wait} from "./wait";
//import {resetAddNewBookError} from "../store/books/books";
import {getBooksError, getBooksStatus} from "../store/books/selectors";


export const NewBookModal: React.FC = () => {
  /* const dispatch = useDispatch();
  const status = useSelector(getBooksStatus);
  const error = useSelector(getBooksError);

  const handleErrorComponentClick = () => {
    //dispatch(resetAddNewBookError());
  }; */

  return (
    <React.Fragment>
      <Typography variant="h4">Заполнение данных новой книги</Typography>

      <BookInfoForm />

      {/* {status === FetchStatus.WAIT &&
        <div className="absolute">
          <Wait />
        </div>
      }

      {error && status !== FetchStatus.WAIT &&
        <div
          className="absolute absolute--clickable"
          onClick={handleErrorComponentClick}
        >
          <ErrorComponent />
        </div>
      } */}
    </React.Fragment>
  );
};
