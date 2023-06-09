import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({ baseUrl: 'http://localhost:5000/api/' });

export const rootApiSlice = createApi({
  baseQuery,
  tagTypes: ['Product', 'Order', 'User'],//TODO adjust root api slice after finishing with routes
  endpoints: (builder) => ({}),
  prepareHeaders: (headers) => {
    const accessToken = localStorage.getItem("token");
    if (accessToken) {
        headers.set("authorization", `Bearer ${accessToken}`);
        headers.set("Content-Type", "application/json");
    }

    return headers;
},
});