import * as React from "react";
import {Button, List, ListItem, Stack, ListItemText} from "@mui/material";
import {useSelector} from "react-redux";
import {useState} from "react";

import {FetchOperation, FetchStatus} from "../const";
import {getReadersInfo} from "../store/readers/selectors";


const renderReaderStatus = (readerStatus: boolean) => (
  <span style={{display: `block`, width: `15px`, height: `15px`, backgroundColor: readerStatus ? `green` : `red`, borderRadius: `50%`}}>
  </span>
);


export const ReadersSection: React.FC = () => {
  const {
    readers,
    operation: readersOperation,
    status: readersStatus,
    error: readersError,
  } = useSelector(getReadersInfo);

  const isReadersNotLoad = readersOperation === FetchOperation.LOAD && readersStatus === FetchStatus.REJECTED;

  const [isReadersListShow, changeIsReadersListShow] = useState(false);

  const handleShowReadersButtonClick = () => {
    changeIsReadersListShow((isReadersListShow) => !isReadersListShow);
  };

  return (
    <Stack className="section">
      <Button
        variant="contained"
        disabled={isReadersNotLoad || !readers.length}
        onClick={handleShowReadersButtonClick}
      >
        {isReadersListShow && `Hide readers list` || `Show readers list`}
      </Button>

      {readersStatus === FetchStatus.LOADING && <h2>Loading...</h2>}

      {isReadersNotLoad && <h2>Sorry! Readers have not loaded!
        {readersError && readersError.status && <br/>}
        {readersError && readersError.status && readersError.status}
      </h2>}

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
