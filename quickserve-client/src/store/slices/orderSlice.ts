import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ITable } from "../../types/ITable";
import { OrderItem } from "../../types/OrderItem";
import { IMenuItem } from "../../types/IMenuItem";

export interface OrderState {
  selectedTable?: ITable;
  currentOrder: OrderItem[];
  isDialogOpen: boolean;
}

const initialState: OrderState = {
  currentOrder: [],
  selectedTable: undefined,
  isDialogOpen: false,
};

export const tablesSlice = createSlice({
  name: "tables",
  initialState,
  reducers: {
    addMenuItem: (state, payload: PayloadAction<IMenuItem>) => {
      const existingItem = state.currentOrder.find(
        (item) => item.id === payload.payload.id
      );

      if (existingItem) {
        state.currentOrder = state.currentOrder.map((item) =>
          item.id === existingItem.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
        return;
      }

      state.currentOrder = [
        ...state.currentOrder,
        {
          ...payload.payload,
          quantity: 1,
        },
      ];
    },
    removeMenuItem: (state, payload: PayloadAction<number>) => {
      state.currentOrder = state.currentOrder.filter(
        (item) => item.id !== payload.payload
      );
    },
    setIsDialogOpen: (state, action: PayloadAction<boolean>) => {
      state.isDialogOpen = action.payload;
    },
    setSelectedTable: (state, action: PayloadAction<ITable>) => {
      state.selectedTable = action.payload;
      state.currentOrder = action.payload.orders ?? [];
    },
  },
});

export const {
  addMenuItem,
  removeMenuItem,
  setIsDialogOpen,
  setSelectedTable,
} = tablesSlice.actions;

export default tablesSlice.reducer;
