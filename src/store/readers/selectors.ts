import {readersSelectors} from "./readers";
import type {RootStateType} from "../..";
import type { ReaderType } from "../../types";


const getReadersInfo = (state: RootStateType) => ({
  readers: readersSelectors.selectAll(state) as ReaderType[],
  operation: state.readers.operation,
  status: state.readers.status,
  error: state.readers.error,
});

const getReaderById = (id: string | null) => (state: RootStateType): ReaderType | null =>
  readersSelectors.selectById(state, id) as ReaderType || null;


export {
  getReadersInfo,
  getReaderById,
};
