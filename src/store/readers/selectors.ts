import {ErrorType, ReaderType} from "../../types";
import {RootStateType} from "../..";


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
