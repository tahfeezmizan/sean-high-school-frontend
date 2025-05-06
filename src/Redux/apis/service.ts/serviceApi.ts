
import { baseApi } from "../baseApi";

export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
        createService: builder.mutation({
            query: (body) => ({
                url: "/service/create",
                method: "POST",
                body,
            }),
            invalidatesTags: ["Service"],
        }),
        getAllService: builder.query({
            query: () => "/service/get-all",
            providesTags: ["Service"],
        }),

        getServiceById: builder.query({
            query: (id) => `/service/get-single/${id}`,
            providesTags: ["Service"],
        }),

        updateService: builder.mutation({
            query: ({id, body}) => ({
                url: `/service/update/${id}`,
                method: "PUT",
                body,
            }),
            invalidatesTags: ["Service"],
        }),

        deleteService: builder.mutation({
            query: (id) => ({
                url: `/service/delete/${id}`,
                method: "DELETE",
            }),
            invalidatesTags: ["Service"],
        }),

    }),
});

export const {
    useCreateServiceMutation,
    useGetAllServiceQuery,
    useGetServiceByIdQuery,
    useUpdateServiceMutation,
    useDeleteServiceMutation
} = authApi;