import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const URL_PREFIX = "/users";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getProfile: builder.query({
      query: () => ({
        url: URL_PREFIX + "/my-profile",
        method: "GET",
      }),
      providesTags: [tagTypes.user],
    }),

    updateProfile: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX + "/update-my-profile",
        method: "PATCH",
        body: data,
      }),

      invalidatesTags: [tagTypes.user],
    }),

    getAllUser: builder.query({
      query: (query) => ({
        url: URL_PREFIX,
        method: "GET",
        params: query,
      }),
      transformResponse: (res) => res?.data,
      providesTags: [tagTypes.user, tagTypes.auth],
    }),

    getSingleUser: builder.query({
      query: (id) => ({
        url: URL_PREFIX + `/${id}`,
        method: "GET",
      }),
      providesTags: [tagTypes.user, tagTypes.auth],
    }),

    updateUser: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX + `/change-status`,
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),

    deleteUser: builder.mutation({
      query: (id) => ({
        url: URL_PREFIX + `/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.user, tagTypes.auth],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetProfileQuery,
  useUpdateProfileMutation,
  useGetAllUserQuery,
  useGetSingleUserQuery,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = userApi;
