import { rootApiSlice } from "../root/rootApiSlice";

export const productsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/products", //TODO adjust endpoints after finishing with routes
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Materials"],
    }),
    createMaterial: builder.mutation({
      query(params) {
        return {
          url: `/products`,
          method: "POST",
          body: {
            ...params,
          },
        };
      },
      invalidatesTags: ["Materials"],
    }),
    getMaterialById: builder.query({
      query: ({ productId }) => ({
        url: `/products/${productId}`, //TODO adjust endpoints after finishing with routes
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Material"],
    }),
    editMaterial: builder.mutation({
      query(params) {
        return {
          url: `/products/${params.id}`,
          method: "PUT",
          body: {
            ...params,
          },
        };
      },
      invalidatesTags: ["Materials"],
    }),
    deleteMaterials: builder.mutation({
      query: (params) => ({
        url: `/products/delete`,
        method: "DELETE",
        body: {
          id: params.id,
        },
      }),
      invalidatesTags: ["Materials"],
    }),
    uploadMaterialImage: builder.mutation({
      query: (data) => ({
        url: `/upload`,
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const {
  useGetMaterialsQuery,
  useLazyGetMaterialByIdQuery,
  useCreateMaterialMutation,
  useEditMaterialMutation,
  useDeleteMaterialsMutation,
  useUploadMaterialImageMutation,
} = productsApiSlice;
