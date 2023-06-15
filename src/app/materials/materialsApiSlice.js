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
  useCreateMaterialMutation,
  useUploadMaterialImageMutation
} = productsApiSlice;
