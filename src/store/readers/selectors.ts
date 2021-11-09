import {ReaderType} from "../../types";
import {RootState} from "../store";


interface ReadersInfoType {
  list: ReaderType[],
  status: string | null,
  error: string | null,
}


const getReadersInfo = (state: RootState): ReadersInfoType => ({
  list: state.readers.list,
  status: state.readers.status,
  error: state.readers.error,
});


export {
  getReadersInfo,
};
