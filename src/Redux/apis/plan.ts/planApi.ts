
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
     
        getAllPlan: builder.query({
            query: () => "/plan",
            providesTags: ["Plan"],
        }),

        getPlanBySlug: builder.query({
            query: (slug) => `/plan/${slug}`,
            providesTags: ["Plan"],
        }),

        updatePlan: builder.mutation({
            query: ({id, body}) => ({
                url: `/plan/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Plan"],
        }),

        deletePlan: builder.mutation({
            query: (id) => ({
                url: `/plan/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Plan"],
        }),

    }),
});

export const {
    useGetAllPlanQuery,
    useGetPlanBySlugQuery,
    useUpdatePlanMutation,
    useDeletePlanMutation
} = authApi;