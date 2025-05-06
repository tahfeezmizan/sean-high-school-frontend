/* eslint-disable @typescript-eslint/no-explicit-any */
import { fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import type {
  BaseQueryFn,
  FetchArgs,
  FetchBaseQueryError,
} from "@reduxjs/toolkit/query";
import Cookies from "js-cookie";
import { logout } from "../slice/auth/authSlice";

const baseUrl = process.env.NEXT_PUBLIC_API_URL;
// const baseUrl = "http://localhost:5102/api/v1";

const rawBaseQuery = fetchBaseQuery({
  baseUrl,
  credentials: "include",
  prepareHeaders: (headers) => {
    const token = Cookies.get("token");
    if (token) {
      headers.set("authorization", token);
    }
    headers.set("accept", "application/json");
    return headers;
  },
});

export const baseQueryWithReauth: BaseQueryFn<
  string | FetchArgs,
  unknown,
  FetchBaseQueryError
> = async (args, api, extraOptions) => {
  let result = await rawBaseQuery(args, api, extraOptions);

  console.log(result.error, "ree ref");

  if (result.error && result.error.status === 401) {
    // Attempt to get a new access token
    const refreshResult = await rawBaseQuery(
      { url: "/auth/refresh-token", method: "POST" },
      api,
      extraOptions
    );
    console.log(refreshResult, "ll");
    if (refreshResult.data) {
      const newAccessToken = (refreshResult.data as any)?.data?.accessToken;
      // Save new access token in cookies
      Cookies.set("token", newAccessToken);

      // Retry the original query with new token
      result = await rawBaseQuery(args, api, extraOptions);
    } else {
      // Refresh token failed: log out or handle error
      Cookies.remove("refreshToken");
      Cookies.remove("token");

      // Optionally trigger logout in redux
      api.dispatch(logout());

      window.location.href = "/signin";
    }
  }

  return result;
};
