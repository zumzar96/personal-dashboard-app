import { rootApiSlice } from "../root/rootApiSlice";

export const materialsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/materials", //TODO adjust endpoints after finishing with routes
        method: "GET",
        mode:'cors',
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Materials"],
    }),
    createMaterial: builder.mutation({
      query(params) {
        return {
          url: `/materials`,
          method: "POST",
          body: {
            ...params,
          },
        };
      },
      invalidatesTags: ["Materials"],
    }),
    getMaterialById: builder.query({
      query: ({ materialId }) => ({
        url: `/materials/${materialId}`, //TODO adjust endpoints after finishing with routes
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Material"],
    }),
    editMaterial: builder.mutation({
      query(params) {
        return {
          url: `/materials/${params.id}`,
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
        url: `/materials/delete`,
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
} = materialsApiSlice;
