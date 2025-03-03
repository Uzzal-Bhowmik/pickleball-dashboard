import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const URL_PREFIX = "/notification";

const notificationApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getMyNotification: builder.query({
      query: (query) => ({
        url: URL_PREFIX,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.notification],
      transformResponse: (response) => {
        return {
          data: response?.data,
          meta: response?.meta,
        };
      },
    }),

    markAsRead: builder.mutation({
      query: () => ({
        url: URL_PREFIX,
        method: "PATCH",
      }),
      invalidatesTags: [tagTypes.notification],
    }),

    deleteNotification: builder.mutation({
      query: () => ({
        url: URL_PREFIX,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.notification],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetMyNotificationQuery,
  useMarkAsReadMutation,
  useDeleteNotificationMutation,
} = notificationApi;
