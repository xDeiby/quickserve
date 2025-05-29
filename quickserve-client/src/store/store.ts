import { configureStore } from "@reduxjs/toolkit";

import tablesReducer from "./slices/orderSlice";
import appReducer from "./slices/appSlice";
import kitchenReducer from "./slices/kitchenSlice";
import { tablesApi } from "./apis/tablesApi";
import { setupListeners } from "@reduxjs/toolkit/query";
import { menuItemsApi } from "./apis/menuItemsApi";

export const store = configureStore({
  reducer: {
    [tablesApi.reducerPath]: tablesApi.reducer,
    [menuItemsApi.reducerPath]: menuItemsApi.reducer,
    tables: tablesReducer,
    kitchen: kitchenReducer,
    app: appReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(
      tablesApi.middleware,
      menuItemsApi.middleware
    ),
});

setupListeners(store.dispatch);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
