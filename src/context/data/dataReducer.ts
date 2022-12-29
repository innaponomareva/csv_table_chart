import {
  AddRecordAction,
  DataActionEnum,
  DataActions,
  DeleteRecordAction,
  SetDataAction,
  UpdateHeaders,
  UpdateRecordAction,
} from "./../types";

import { IState } from "../types";

const handlers: any = {
  [DataActionEnum.SET_DATA]: (state: IState, action: SetDataAction) => {
    return { ...state, data: action.payload };
  },
  [DataActionEnum.ADD_RECORD]: (state: IState, action: AddRecordAction) => {
    const data = [...state.data];
    if (action.payload.afterItemId) {
      const index = data.findIndex(
        (obj) => obj.id === action.payload.afterItemId
      );
      const newRecordIndex = index + 1;
      data.splice(newRecordIndex, 0, action.payload.newRecord);
    } else {
      data.unshift(action.payload.newRecord);
    }
    return { ...state, data: data };
  },
  [DataActionEnum.DELETE_RECORD]: (
    state: IState,
    action: DeleteRecordAction
  ) => {
    const data = [...state.data];
    const index = data.findIndex((obj) => obj.id === action.payload.id);
    data.splice(index, 1);
    return { ...state, data: data };
  },
  [DataActionEnum.UPDATE_RECORD]: (
    state: IState,
    action: UpdateRecordAction
  ) => {
    const data = [...state.data];
    const object = data.find((item) => item.id === action.payload.id);
    const index = data.findIndex((item) => item.id === action.payload.id);
    data[index] = { ...object, [action.payload.key]: action.payload.value };
    return { ...state, data: data };
  },
  [DataActionEnum.UPDATE_HEADERS]: (state: IState, action: UpdateHeaders) => {
    const data = [...state.data];
    const res = data.map((obj) =>
      Object.fromEntries(
        Object.entries(obj).map(([key, value]) => [
          action.payload[key] ?? key,
          value,
        ])
      )
    );
    return { ...state, data: res };
  },
  [DataActionEnum.DEFAULT]: (state: IState) => state,
};

export const dataReducer = (state: IState, action: DataActions) => {
  const handler = handlers[action.type] || handlers[DataActionEnum.DEFAULT];
  return handler(state, action);
};
