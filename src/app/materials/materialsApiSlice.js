import { rootApiSlice } from "../root/rootApiSlice";



export const productsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getMaterials: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/products",//TODO adjust endpoints after finishing with routes
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
          headers: {
            Authorization: `Bearer ${params.token}`,//TODO place in interceptors 
          },
          body: {
            ...params
          },
        };
      },
      invalidatesTags: ["Materials"],
    }),
    getMaterialById: builder.query({
      query: ({productId}) => ({
        url: `/products/${productId}`,//TODO adjust endpoints after finishing with routes
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Materials"],
    }),
    editMaterial: builder.mutation({
      query(params) {
        return {
          url: `/products/${params.id}`,
          method: "PUT",
          headers: {
            Authorization: `Bearer ${params.token}`,//TODO place in interceptors 
          },
          body: {
            ...params
          },
        };
      },
      invalidatesTags: ["Materials"],
    }),
    uploadMaterialImage: builder.mutation({
      query: (data) => ({
        url: `/upload`,
        method: 'POST',
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
  useUploadMaterialImageMutation
} = productsApiSlice;
