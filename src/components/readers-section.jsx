import React, {useState} from "react";
import {Button, List, ListItem, Stack, ListItemText} from "@mui/material";
import {useSelector} from "react-redux";

import {FetchStatus} from "../api";
import {getReadersInfo} from "../store/readers/selectors";


const renderReaderStatus = (readerStatus) => (
  <span style={{display: `block`, width: `15px`, height: `15px`, backgroundColor: readerStatus ? `green` : `red`, borderRadius: `50%`}}>
  </span>
);

export const ReadersSection = () => {
  const {list: readers, status: readresStatus, error: readersError} = useSelector(getReadersInfo);

  const [isReadersListShow, changeIsReadersListShow] = useState(false);

  const handleShowReadersButtonClick = () => {
    changeIsReadersListShow(!isReadersListShow);
  };

  return (
    <Stack>
      <Button
        variant="contained"
        disabled={readersError && true}
        onClick={handleShowReadersButtonClick}
      >
        {isReadersListShow && `Hide readers list` || `Show readers list`}
      </Button>

      {readresStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {readersError && <h2>Sorry! Readers have not loaded!</h2>}

      {isReadersListShow &&
        <List>{
          readers.map((reader, index) => (
            <ListItem key={index + reader.id}>
              <ListItemText primary={reader.name} secondary={renderReaderStatus(!reader.booksIds.length)} />
            </ListItem>
          ))
        }</List>
      }
    </Stack>
  );
};