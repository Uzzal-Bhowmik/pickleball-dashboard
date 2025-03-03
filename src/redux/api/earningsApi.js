import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: (query) => ({
        url: `/payments/dashboard-data`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.earnings],
      transformResponse: (res) => ({
        data: res?.data,
        meta: res?.meta,
      }),
    }),
  }),

  overrideExisting: true,
});

export const { useGetAllEarningsQuery } = earningsApi;
