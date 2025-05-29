import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITable } from "../../types/ITable";

export interface AppState {
  isWsConnected: boolean;
  tables: ITable[];
}

const initialState: AppState = {
  isWsConnected: false,
  tables: [],
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setIsWsConnected: (state, action: PayloadAction<boolean>) => {
      state.isWsConnected = action.payload;
    },
    setTables: (state, action: PayloadAction<ITable[]>) => {
      state.tables = action.payload;
    },
  },
});

export const { setIsWsConnected, setTables } = appSlice.actions;

export default appSlice.reducer;
