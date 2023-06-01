import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const usersApi = createApi({
  reducerPath:'loginApi',
  baseQuery: fetchBaseQuery({ baseUrl: `https://identitytoolkit.googleapis.com/v1/` }),
  endpoints: (builder) => ({
    setLogin: builder.mutation({
        query(params) {
          return {
            url: `accounts:signInWithPassword?key=${process.env.REACT_APP_AUTH_API_KEY}`,
            method: "POST",
            body: {
              email:params.email,
              password:params.password
            },
          };
        },
      }),
  }),
});

export default usersApi

