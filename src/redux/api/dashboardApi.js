import { baseApi } from "./baseApi";

const dashboardApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getDashboardData: builder.query({
      query: (arg) => ({
        url: "/meta",
        method: "GET",
        params: arg,
      }),
      transformResponse: (res) => {
        return res?.data;
      },
    }),
  }),
});

export const { useGetDashboardDataQuery } = dashboardApi;
