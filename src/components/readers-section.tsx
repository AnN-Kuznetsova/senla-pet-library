import * as React from "react";
import {Button, Stack} from "@mui/material";
import {useCallback, useState} from "react";
import {useDispatch, useSelector} from "react-redux";

import {FetchOperation, FetchStatus} from "../const";
import {ReadersList} from "./readers-list";
import {getReadersInfo} from "../store/readers/selectors";
import {resetReadersStatus} from "../store/readers/readers";
import {useModal} from "./modal";


export const ReadersSection: React.FC = (): JSX.Element => {
  const {
    readers,
    operation: readersOperation,
    status: readersStatus,
    error: readersError,
  } = useSelector(getReadersInfo);

  const dispatch = useDispatch();

  const onModalClose = useCallback(() => {
    dispatch(resetReadersStatus());
  }, [dispatch]);

  const {
    renderModal,
    openModal,
  } = useModal(onModalClose);

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

      {isReadersListShow && <ReadersList
        readers={readers}
        openModal={openModal}
      /> }

      {renderModal()}
    </Stack>
  );
};
