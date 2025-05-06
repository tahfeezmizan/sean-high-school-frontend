
import {
    LoginRequest,
    LoginResponse,
    RegisterRequest,
    RegisterResponse,
  } from "../auth/authType";
  import { baseApi } from "../baseApi";
  
  export const authApi = baseApi.injectEndpoints({
    endpoints: (builder) => ({
      login: builder.mutation<LoginResponse, LoginRequest>({
        query: (body) => ({
          url: "/auth/login",
          method: "POST",
          body,
        }),
      }),

      logout: builder.mutation({
        query: () => ({
          url: "/auth/logout",
          method: "POST"
        }),
      }),

      register: builder.mutation<RegisterResponse, RegisterRequest>({
        query: (body) => ({
          url: "/user/register",
          method: "POST",
          body,
        }),
      }),

      verifyOtp: builder.mutation<
        { success: boolean; data: { accessToken: string } },
        { email: string; otp: string }
      >({
        query: (body) => ({
          url: "/auth/verify-otp",
          method: "POST",
          body,
        }),
      }),

      forgotPassword: builder.mutation<
        { success: boolean; message: string; data: { message: string } },
        { email: string }
      >({
        query: (body) => ({
          url: "/auth/forgot-password",
          method: "POST",
          body,
        }),
      }),

      resetPassword: builder.mutation<
        { success: boolean; message: string },
        { body: { userId: string; password: string }; token: string }
      >({
        query: ({ body, token }) => ({
          url: "/auth/reset-password",
          method: "POST",
          body,
          headers: {
            Authorization: token,
          },
        }),
      }),

      sendOtp: builder.mutation<
        { success: boolean; message: string; data: { message: string } },
        { email: string }
      >({
        query: (body) => ({
          url: "/auth/send-otp",
          method: "POST",
          body,
        }),
      }),
    }),
  });
  
  export const {
    useLoginMutation,
    useLogoutMutation,
    useRegisterMutation,
    useVerifyOtpMutation,
    useForgotPasswordMutation,
    useResetPasswordMutation,
    useSendOtpMutation,
  } = authApi;