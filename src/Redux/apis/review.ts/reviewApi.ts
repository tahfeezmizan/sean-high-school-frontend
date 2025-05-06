import { baseApi } from "../baseApi";

export const reviewApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    createReview: builder.mutation({
      query: (body) => ({
        url: "/testimonials/create",
        method: "POST",
        body,
      }),
      invalidatesTags: ["Review"],
    }),

    getAllReview: builder.query({
      query: ({page, limit}) => `/testimonials?page=${page}&limit=${limit}`,
      providesTags: ["Review"],
    }),

    getReviewForHome: builder.query({
      query: () => `/testimonials/home`,
      providesTags: ["Review"],
    }),

    getReviewById: builder.query({
      query: (id) => `/testimonials/${id}`,
      providesTags: ["Review"],
    }),

    addReviewOnHomepage: builder.mutation({
      query: ({ id }) => ({
        url: `/testimonials/add/${id}`,
        method: "PUT",
      }),
      invalidatesTags: ["Review"],
    }),

    updateReview: builder.mutation({
      query: ({ id, body }) => ({
        url: `/testimonials/${id}`,
        method: "PUT",
        body,
      }),
      invalidatesTags: ["Review"],
    }),

    deleteReview: builder.mutation({
      query: (id) => ({
        url: `/testimonials/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: ["Review"],
    }),
  }),
});

export const {
  useCreateReviewMutation,
  useGetAllReviewQuery,
  useGetReviewForHomeQuery,
  useGetReviewByIdQuery,
  useAddReviewOnHomepageMutation,
  useUpdateReviewMutation,
  useDeleteReviewMutation,
} = reviewApi;
