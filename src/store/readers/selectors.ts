import {RootStateType} from "../..";
import type {ErrorType, ReaderType} from "../../types";


interface ReadersInfoType {
  list: ReaderType[],
  status: string | null,
  error: ErrorType | null,
}


const getReadersInfo = (state: RootStateType): ReadersInfoType => ({
  list: state.readers.list,
  status: state.readers.status,
  error: state.readers.error,
});


export {
  getReadersInfo,
};
