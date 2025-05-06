import {
    RegisterRequest,
    RegisterResponse,
    UserProfile,
  } from "../auth/authType";
  import { baseApi } from "../baseApi";
  
  export const userApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      // Create admin (Super Admin only)
      createAdmin: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (adminData) => ({
          url: "/user/create-admin",
          method: "POST",
          body: adminData,
        }),
        invalidatesTags: ["User"],
      }),

      //get my profile

      getMe: builder.query<{ success: boolean; data: UserProfile }, void>({
        query: () => "/user/get-me",
        providesTags: ["User"],
      }),

      // Update my profile
      updateMe: builder.mutation<
        { success: boolean; message: string; data: UserProfile },
        FormData
      >({
        query: (formData) => ({
          url: "/user/me",
          method: "PUT",
          body: formData,
        }),
        invalidatesTags: ["User"],
      }),

      // Get all users (Admin only)
      getAllUsers: builder.query({
        query: ({page, limit}) => `/user?page=${page}&limit=${limit}`,
        providesTags: ["User"],
      }),

      // Get single user (Admin only)
      getSingleUser: builder.query({
        query: (userId) => `/user/${userId}`,
        providesTags: ["User"],
      }),

      // Update user status (Admin only)
      updateUserStatus: builder.mutation({
        query: ({ id, status }) => ({
          url: `/user/${id}/status`,
          method: "PUT",
          body: { status },
        }),
        invalidatesTags: ["User"],
      }),

      // Delete user (Super Admin only)
      deleteUser: builder.mutation<{ success: boolean; data: null }, string>({
        query: (userId) => ({
          url: `/user/${userId}`,
          method: "DELETE",
        }),
        invalidatesTags: ["User"],
      }),
    }),
  });
  
  export const {
      useGetMeQuery,
      useCreateAdminMutation,
      useGetAllUsersQuery,
      useGetSingleUserQuery,
      useUpdateUserStatusMutation,
      useDeleteUserMutation,
      useUpdateMeMutation
    
  } = userApi;