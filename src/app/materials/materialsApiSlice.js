import { rootApiSlice } from "../root/rootApiSlice";

export const productsApiSlice = rootApiSlice.injectEndpoints({
  endpoints: (builder) => ({
    getProducts: builder.query({
      query: ({ keyword, pageNumber }) => ({
        url: "/products",//TODO adjust endpoints after finishing with routes
        params: { keyword, pageNumber },
      }),
      keepUnusedDataFor: 5,
      providesTags: ["Products"],
    }),
  }),
});

export const {
  useGetProductsQuery,
} = productsApiSlice;
