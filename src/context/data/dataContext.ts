import { createContext } from "react";
import { IDataItem } from "../../models/IDataItem";
import { IHeaderUpdate, INewRecord, IRecordUpdate } from "../types";

export interface DataContextInterface {
  data: IDataItem[];
  setData: (data: IDataItem[]) => void;
  addRecord: (record: INewRecord) => void;
  deleteRecord: (id: string) => void;
  updateRecord: (update: IRecordUpdate) => void;
  updateHeaders: (update: IHeaderUpdate) => void;
}

export const DataContext = createContext<DataContextInterface | null>(null);
