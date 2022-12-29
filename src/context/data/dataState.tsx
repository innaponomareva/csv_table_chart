import { useReducer } from "react";
import { IDataItem } from "../../models/IDataItem";
import {
  DataActionEnum,
  IHeaderUpdate,
  INewRecord,
  IRecordUpdate,
  IState,
} from "../types";
import { DataContext } from "./dataContext";
import { dataReducer } from "./dataReducer";

export interface DataStateProps {
  children: React.ReactNode;
}

export const DataState: React.FC<DataStateProps> = ({ children }) => {
  const initialState: IState = {
    data: [],
  };
  const [state, dispatch] = useReducer(dataReducer, initialState);
  const { data } = state;

  // Actions:
  const setData = (data: IDataItem[] | []) =>
    dispatch({ type: DataActionEnum.SET_DATA, payload: data });
  const addRecord = (record: INewRecord) =>
    dispatch({ type: DataActionEnum.ADD_RECORD, payload: record });
  const deleteRecord = (id: string) =>
    dispatch({ type: DataActionEnum.DELETE_RECORD, payload: { id } });
  const updateRecord = (update: IRecordUpdate) =>
    dispatch({ type: DataActionEnum.UPDATE_RECORD, payload: update });
  const updateHeaders = (update: IHeaderUpdate) =>
    dispatch({ type: DataActionEnum.UPDATE_HEADERS, payload: update });

  return (
    <DataContext.Provider
      value={{
        data,
        setData,
        addRecord,
        deleteRecord,
        updateRecord,
        updateHeaders,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};
