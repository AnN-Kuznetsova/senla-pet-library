import * as React from "react";
import {Typography} from "@mui/material";

import {ErrorType} from "../types";
import {FetchError} from "../const";


export enum InfoType {
  WAIT = `WAIT`,
  ERROR = `ERROR`,
}

interface PropsType {
  type: InfoType,
  error?: ErrorType,
}


export const Info: React.FC<PropsType> = (props: PropsType) => {
  const {
    type,
    error,
  } = props;

  let message: JSX.Element;

  switch (type) {
    case InfoType.WAIT:
      message = <>Wait...</>;
      break;
    case InfoType.ERROR:
      message = <>Sorry, something went wrong :(</>;

      if (error) {
        switch (error.status) {
          case FetchError.PAYLOAD_TOO_LARGE:
            message = <>The file is too large to upload.<br/>Choose a smaller file.</>;
            break;
          case FetchError.NOT_FOUND:
            message = <>Sory, page not found...</>;
            break;
        }
      }
      break;
  }

  return (
    <Typography variant="h4">{message}</Typography>
  );
};
