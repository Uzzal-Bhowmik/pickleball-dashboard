import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const incomesApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    allEarnings: builder.query({
      query: (query) => ({
        url: `/payments/earnings`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.income],
    }),
  }),
});

export const { useAllEarningsQuery } = incomesApi;
