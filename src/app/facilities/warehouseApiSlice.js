import { rootApiSlice } from "../root/rootApiSlice";

export const warehouseMaterialsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getWarehouseMaterials: builder.query({
      query: ({ keyword }) => ({
        url: "/warehousematerials", //TODO adjust endpoints after finishing with routes
        method: "GET",
        mode: "cors",
        params: { keyword },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Materials"],
    }),
    warehouseMaterialCordinates: builder.mutation({
      query(params) {
        return {
          url: `/warehousematerials/${params.id}`,
          method: "PUT",
          body: {
            cordinates: params.cordinates,
          },
        };
      },
        invalidatesTags: ["Materials"],
    }),
  }),
});

export const {
  useGetWarehouseMaterialsQuery,
  useWarehouseMaterialCordinatesMutation,
} = warehouseMaterialsApiSlice;
