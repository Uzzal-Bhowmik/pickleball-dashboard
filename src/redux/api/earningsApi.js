import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const earningsApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllEarnings: builder.query({
      query: (query) => ({
        url: `/payments`,
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
});

export const { useGetAllEarningsQuery } = earningsApi;
