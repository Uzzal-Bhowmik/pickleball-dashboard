import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const URL_PREFIX = "/packages";

const creditApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllCreditPackages: builder.query({
      query: (args) => ({
        url: URL_PREFIX,
        method: "GET",
        params: args,
      }),
      providesTags: [tagTypes.creditPackage],
      transformResponse: (res) => ({
        meta: res?.meta,
        data: res?.data,
      }),
    }),

    addCreditPackage: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.creditPackage],
    }),

    deleteCreditPackage: builder.mutation({
      query: (id) => ({
        url: `${URL_PREFIX}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.creditPackage],
    }),
  }),
  overrideExisting: true,
});

export const {
  useGetAllCreditPackagesQuery,
  useDeleteCreditPackageMutation,
  useAddCreditPackageMutation,
} = creditApi;
