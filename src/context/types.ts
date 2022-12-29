import { IDataItem } from "../models/IDataItem";

export enum DataActionEnum {
  SET_DATA = "SET_DATA",
  ADD_RECORD = "ADD_RECORD",
  UPDATE_RECORD = "UPDATE_RECORD",
  DELETE_RECORD = "DELETE_RECORD",
  UPDATE_HEADERS = "UPDATE_HEADERS",
  DEFAULT = "DEFAULT",
}

export interface SetDataAction {
  type: DataActionEnum.SET_DATA;
  payload: IDataItem[];
}

export interface AddRecordAction {
  type: DataActionEnum.ADD_RECORD;
  payload: INewRecord;
}

export interface DeleteRecordAction {
  type: DataActionEnum.DELETE_RECORD;
  payload: { id: string };
}

export interface UpdateRecordAction {
  type: DataActionEnum.UPDATE_RECORD;
  payload: IRecordUpdate;
}

export interface UpdateHeaders {
  type: DataActionEnum.UPDATE_HEADERS;
  payload: IHeaderUpdate;
}

export type DataActions =
  | SetDataAction
  | AddRecordAction
  | DeleteRecordAction
  | UpdateRecordAction
  | UpdateHeaders;

export interface IState {
  data: IDataItem[] | [];
}

export interface INewRecord {
  newRecord: IDataItem;
  afterItemId?: string;
}

export interface IRecordUpdate {
  id: string;
  key: string;
  value: string;
}

export interface IHeaderUpdate {
  [key: string]: string;
}
