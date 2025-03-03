import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const URL_PREFIX = "/sessions";

const sessionApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSessions: builder.query({
      query: (arg) => ({
        url: URL_PREFIX,
        method: "GET",
        params: arg,
      }),
      providesTags: [tagTypes.sessions],
      transformResponse: (res) => ({
        data: res?.data,
        meta: res?.meta,
      }),
    }),

    createSession: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.sessions],
    }),

    editSession: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.sessions],
    }),

    changeSessionStatus: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/${data?.id}`,
        method: "PATCH",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.sessions],
    }),

    deleteSession: builder.mutation({
      query: (id) => ({
        url: `${URL_PREFIX}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.sessions],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllSessionsQuery,
  useCreateSessionMutation,
  useEditSessionMutation,
  useChangeSessionStatusMutation,
  useDeleteSessionMutation,
} = sessionApi;
