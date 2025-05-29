import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IOrder } from "../../types/IOrder";
import { OrderStatusEnum } from "../../types/OrderStatus";

export type KitchenOrderStatusFilter = OrderStatusEnum | "all";
export type KitchenOrderByFilter = "table" | "time" | "status" | "priority";

type KitchenOrderFilter = {
  status: KitchenOrderStatusFilter;
  orderBy: KitchenOrderByFilter;
};

export interface KitchenState {
  orders: IOrder[];
  filteredOrders: IOrder[];
  filters: KitchenOrderFilter;
}

const initialState: KitchenState = {
  orders: [],
  filteredOrders: [],
  filters: {
    status: "all",
    orderBy: "time",
  },
};

export const kitchenSlice = createSlice({
  name: "kitchen",
  initialState,
  reducers: {
    setOrders: (state, action: PayloadAction<IOrder[]>) => {
      state.orders = action.payload;
      state.filteredOrders = action.payload;
    },
    setStatusFilter: (
      state,
      action: PayloadAction<OrderStatusEnum | "all">
    ) => {
      state.filters.status = action.payload;

      if (action.payload === "all") {
        state.filteredOrders = state.orders;

        return;
      }

      state.filteredOrders = state.orders.filter(
        (order) => order.status === action.payload
      );
    },
    setOrderByFilter: (state, action: PayloadAction<KitchenOrderByFilter>) => {
      state.filters.orderBy = action.payload;
    },
  },
});

export const { setOrders, setStatusFilter, setOrderByFilter } =
  kitchenSlice.actions;
export default kitchenSlice.reducer;
