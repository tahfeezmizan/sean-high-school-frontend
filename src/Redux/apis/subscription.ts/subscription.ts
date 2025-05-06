
import { baseApi } from "../baseApi";

export const subscriptionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createSubscription: builder.mutation({
      query: (body) => ({
        url: "/subscription/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    
    getAllSubscription: builder.query({
      query: ({page, limit}) => `/subscription?page=${page}&limit=${limit}`,
      providesTags: ["Subscription"],
    }),

    getMySubscription: builder.query({
      query: () => `/subscription/my-subscription`,
      providesTags: ["Subscription"],
    }),

    getSubscriptionById: builder.query({
      query: (id) => `/subscription/get-single/${id}`,
      providesTags: ["Subscription"],
    }),

    updateSubscription: builder.mutation({
      query: ({ id, body }) => ({
        url: `/subscription/update/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Subscription"],
    }),

    deleteSubscription: builder.mutation({
      query: (id) => ({
        url: `/subscription/delete/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Subscription"],
    }),
  }),
});

export const {
    useCreateSubscriptionMutation,
    useGetAllSubscriptionQuery,
    useGetMySubscriptionQuery,
    useGetSubscriptionByIdQuery,
    useUpdateSubscriptionMutation,
    useDeleteSubscriptionMutation
} = subscriptionApi;