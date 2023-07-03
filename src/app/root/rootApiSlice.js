import { fetchBaseQuery, createApi } from "@reduxjs/toolkit/query/react";

//TODO consider implementing as baseQuery
// const axiosBaseQuery =
//   ({ baseUrl } = { baseUrl: '' }) =>
//   async ({ url, method, data, params }) => {
//     try {
//       const result = await axios({ url: baseUrl + url, method, data, params })
//       return { data: result.data }
//     } catch (axiosError) {
//       let err = axiosError
//       return {
//         error: {
//           status: err.response?.status,
//           data: err.response?.data || err.message,
//         },
//       }
//     }
//   }

export const rootApiSlice = createApi({
  baseQuery: fetchBaseQuery({
    baseUrl: "http://localhost:5000/api/",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().login.user_info?.token;//TODO remove ? operator
      if (token) {
        headers.set("Authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: () => ({}),
});

export default rootApiSlice;
