import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { IMenuItem } from "../../types/IMenuItem";

export const menuItemsApi = createApi({
  reducerPath: "menuItemsApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/menu-items" }),
  endpoints: (builder) => ({
    getMenuItems: builder.query<IMenuItem[], unknown>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetMenuItemsQuery } = menuItemsApi;
