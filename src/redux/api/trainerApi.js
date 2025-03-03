import { tagTypes } from "../tagtypes";
import { baseApi } from "./baseApi";

const URL_PREFIX = "/trainers";

const trainerApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllTrainers: builder.query({
      query: (query) => ({
        url: `/trainers`,
        method: "GET",
        params: query,
      }),
      providesTags: [tagTypes.trainers],
      transformResponse: (res) => ({
        data: res?.data,
        meta: res?.meta,
      }),
    }),

    createTrainer: builder.mutation({
      query: (data) => ({
        url: URL_PREFIX,
        method: "POST",
        body: data,
      }),
      invalidatesTags: [tagTypes.trainers],
    }),

    editTrainer: builder.mutation({
      query: (data) => ({
        url: `${URL_PREFIX}/${data?.id}`,
        method: "PUT",
        body: data?.data,
      }),
      invalidatesTags: [tagTypes.trainers],
    }),

    deleteTrainer: builder.mutation({
      query: (id) => ({
        url: `${URL_PREFIX}/${id}`,
        method: "DELETE",
      }),
      invalidatesTags: [tagTypes.trainers],
    }),
  }),

  overrideExisting: true,
});

export const {
  useGetAllTrainersQuery,
  useCreateTrainerMutation,
  useEditTrainerMutation,
  useDeleteTrainerMutation,
} = trainerApi;
