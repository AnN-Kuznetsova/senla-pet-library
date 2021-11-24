import * as React from "react";
import {Typography} from "@mui/material";


export enum InfoType {
  WAIT = `WAIT`,
  ERROR = `ERROR`,
}


interface PropsType {
  type: InfoType,
}


export const Info: React.FC<PropsType> = (props: PropsType) => {
  const {type} = props;

  let message = ``;

  switch (type) {
    case InfoType.WAIT:
      message = `Wait...`;
      break;
    case InfoType.ERROR:
      message = `Sorry, something went wrong :(`;
      break;
  }
  
  return (
    <Typography variant="h4">{message}</Typography>
  );
};
