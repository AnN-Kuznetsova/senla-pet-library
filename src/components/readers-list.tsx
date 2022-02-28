import * as React from "react";
import {List, ListItem, ListItemText} from "@mui/material";

import {ItemButton, ItemButtonMode} from "./item-button/item-button";
import {ReaderModal} from "./reader-modal";
import type {ReaderType} from "../types";


interface PropsType {
  readers: ReaderType[];
  openModal: (children: React.ReactElement) => void;
}


const renderReaderStatus = (readerStatus: boolean) => (
  <span style={{display: `block`, width: `15px`, height: `15px`, backgroundColor: readerStatus ? `green` : `red`, borderRadius: `50%`}}>
  </span>
);


export const ReadersList: React.FC<PropsType> = (props: PropsType): JSX.Element => {
  const {
    readers,
    openModal,
  } = props;

  const handleMoreButtonClick = (reader: ReaderType) => {
    openModal(<ReaderModal readerId={reader.id} />);
  };

  return (
    <div className="list-wrapper">
      <List>{
        readers.map((reader, index) => (
          <ListItem key={index + reader.id}>
            <ListItemText primary={reader.name} secondary={renderReaderStatus(!reader.books.length)} />
            <ItemButton
              onClick={handleMoreButtonClick.bind(null, reader)}
              className={ItemButtonMode.MORE}
            />
          </ListItem>
        ))
      }</List>
    </div>
  );
};
