import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import Cookies from "js-cookie";

// Define a service using a base URL and expected endpoints
export const userApi = createApi({
  reducerPath: "User",
  tagTypes : ['User'],
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000",
    prepareHeaders: (headers) => {
      let token = Cookies.get("UserToken");
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getUser: builder.query({
      query: () => `/user/get/user`,
      providesTags : ['User']
    }),
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/user/register",
        method: "POST",
        body: data,
      }),
    }),

    loginUser: builder.mutation({
      query: (data) => ({
        url: "/user/login",
        method: "POST",
        body: data,
      }),
    }),

    uploadUserImages : builder.mutation({
      query : (data)=> ({
        url : "/user/upload",
        method : "POST",
        body : data
      })
    }),

    updateUserInfo : builder.mutation({
      query : (data) => ({
        url : "/user/update/user",
        method : "POST",
        body : data
      })
    })
  }),
});

export const {
  useGetUserQuery,
  useRegisterUserMutation,
  useLoginUserMutation,
  useUploadUserImagesMutation,
  useUpdateUserInfoMutation
} = userApi;
