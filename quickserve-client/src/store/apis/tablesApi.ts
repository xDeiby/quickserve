import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { ITable } from "../../types/ITable";

export const tablesApi = createApi({
  reducerPath: "tablesApi",
  baseQuery: fetchBaseQuery({ baseUrl: "/api/tables" }),
  endpoints: (builder) => ({
    getTables: builder.query<ITable[], unknown>({
      query: () => ({
        url: "/",
        method: "GET",
      }),
    }),
  }),
});

export const { useGetTablesQuery } = tablesApi;
