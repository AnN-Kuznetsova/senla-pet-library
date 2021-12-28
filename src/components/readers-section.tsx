import * as React from "react";
import {Button, Stack} from "@mui/material";
import {useEffect, useState} from "react";
import {useSelector} from "react-redux";

import {FetchOperation, FetchStatus} from "../const";
import {useModal} from "./modal";
import {ReadersList} from "./readers-list";
import {getReadersInfo} from "../store/readers/selectors";
import { useWaitShow } from "../utils";
import { Info, InfoType } from "./info";


export const ReadersSection: React.FC = () => {
  const {
    readers,
    operation: readersOperation,
    status: readersStatus,
    error: readersError,
  } = useSelector(getReadersInfo);

  const {
    renderModal,
    openModal,
    closeModal,
  } = useModal();

  const isWaitShow = useWaitShow(readersStatus);
  const isReadersNotLoad = readersOperation === FetchOperation.LOAD && readersStatus === FetchStatus.REJECTED;

  const [isReadersListShow, changeIsReadersListShow] = useState(false);

  const handleShowReadersButtonClick = () => {
    changeIsReadersListShow((isReadersListShow) => !isReadersListShow);
  };

  useEffect(() => {
    if (readersOperation === FetchOperation.UPDATE) {
      switch (readersStatus) {
        case FetchStatus.LOADING:
          if ( isWaitShow) {
            openModal(<Info type={InfoType.WAIT} />);
          }
          break;

        case FetchStatus.REJECTED:
          openModal(<Info type={InfoType.ERROR} />);
          break;

        case FetchStatus.RESOLVED:
          closeModal();
          break;
      }
    }
  }, [readersOperation, readersStatus, isWaitShow, closeModal, openModal]);

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
