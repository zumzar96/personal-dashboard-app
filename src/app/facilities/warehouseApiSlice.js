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
      providesTags: ["Warehousematerials"],
      transformResponse: (response) => {
        const mapMaterials = [];
        const iconboxMaterials = [];

        response.materials.forEach((element) =>
          element.coordinates === null || !element.coordinates
            ? iconboxMaterials.push(element)
            : mapMaterials.push(element)
        );
        return {
          mapMaterials: mapMaterials,
          iconboxMaterials: iconboxMaterials,
        };
      },
    }),
    warehouseMaterialCordinates: builder.mutation({
      query(params) {
        return {
          url: `/warehousematerials/${params.id}`,
          method: "PUT",
          body: {
            coordinates: params.coordinates,
          },
        };
      },
      invalidatesTags: ["Warehousematerials"],
    }),
  }),
});

export const {
  useGetWarehouseMaterialsQuery,
  useWarehouseMaterialCordinatesMutation,
} = warehouseMaterialsApiSlice;
