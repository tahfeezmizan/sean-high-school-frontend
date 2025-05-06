import { createApi } from "@reduxjs/toolkit/query/react";
import { baseQueryWithReauth } from "../utils/baseQueryWithReauth";

export const baseApi = createApi({
  reducerPath: "baseApi",
  baseQuery: baseQueryWithReauth,
  tagTypes: ["User", "Plan", "Subscription", "Review", "Service"],
  endpoints: () => ({}),
});
