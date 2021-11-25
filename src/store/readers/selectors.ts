import type {RootStateType} from "../..";
import type {ReadersStateType} from "./readers";


const getReadersInfo = (state: RootStateType): ReadersStateType => ({
  list: state.readers.list,
  operation: state.readers.operation,
  status: state.readers.status,
  error: state.readers.error,
});


export {
  getReadersInfo,
};
