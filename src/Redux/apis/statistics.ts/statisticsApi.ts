
import { baseApi } from "../baseApi";

export const statisticsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllStatistics: builder.query({
      query: () => "/statistics",
      providesTags: ["Subscription"],
    }),
  }),
});

export const { useGetAllStatisticsQuery } = statisticsApi;