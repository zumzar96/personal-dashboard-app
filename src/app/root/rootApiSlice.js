import { fetchBaseQuery, createApi } from '@reduxjs/toolkit/query/react';
const baseQuery = fetchBaseQuery({ baseUrl: process.env.baseUrl });

export const rootApiSlice = createApi({
  baseQuery,
  tagTypes: ['Material', 'User'],
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