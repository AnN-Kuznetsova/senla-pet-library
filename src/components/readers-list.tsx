import * as React from "react";
import {List, ListItem, ListItemText} from "@mui/material";

import type {ReaderType} from "../types";


interface PropsType {
  readers: ReaderType[],
}


const renderReaderStatus = (readerStatus: boolean) => (
  <span style={{display: `block`, width: `15px`, height: `15px`, backgroundColor: readerStatus ? `green` : `red`, borderRadius: `50%`}}>
  </span>
);


export const ReadersList: React.FC<PropsType> = (props: PropsType) => {
  const {
    readers,
  } = props;

  return (
    <List>{
      readers.map((reader, index) => (
        <ListItem key={index + reader.id}>
          <ListItemText primary={reader.name} secondary={renderReaderStatus(!reader.booksIds.length)} />
        </ListItem>
      ))
    }</List>
  );
};
