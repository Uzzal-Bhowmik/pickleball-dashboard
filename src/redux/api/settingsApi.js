import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const URL_PREFIX = "/settings";

const contentApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getSettingsData: builder.query({
      query: (query) => ({
        url: URL_PREFIX,
        method: "GET",
        params: query,
      }),

      providesTags: [tagTypes.settings],
    }),

    updateSettingsData: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX,
        method: "PUT",
        body: data,
      }),
      invalidatesTags: [tagTypes.settings],
    }),
  }),

  overrideExisting: true,
});

export const { useGetSettingsDataQuery, useUpdateSettingsDataMutation } =
  contentApi;
